import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";
const SUPABASE_URL = "https://gexbownhpxmjkxzudbnk.supabase.co";
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdleGJvd25ocHhtamt4enVkYm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNTg5NDgsImV4cCI6MjA5OTgzNDk0OH0.y8PxUwPehRl1utGToaarrL2_8ufUll0KzXfpjnI0zTQ";

global.WebSocket = WebSocket;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: {
		persistSession: false,
		autoRefreshToken: false,
	},
});

// Variabel langsung




// Folder utama tempat penyimpanan arsip soalmu
const BASE_DIR = "./ONMIPA";

function parseSoal(filePath) {
	if (!fs.existsSync(filePath)) return [];
	const text = fs.readFileSync(filePath, "utf-8");
	const blocks = text.split("@ID:").filter((b) => b.trim() !== "");

	return blocks.map((block) => {
		const lines = block.split("\n");
		const kode_soal = lines[0].trim();
		let bidang = "";
		let contentLines = [];

		for (let i = 1; i < lines.length; i++) {
			if (lines[i].startsWith("@BIDANG:")) {
				bidang = lines[i].replace("@BIDANG:", "").trim();
			} else {
				contentLines.push(lines[i]);
			}
		}
		return { kode_soal, bidang, content: contentLines.join("\n").trim() };
	});
}

function parseSolusi(filePath) {
	if (!fs.existsSync(filePath)) return [];
	const text = fs.readFileSync(filePath, "utf-8");
	const blocks = text.split("@ID:").filter((b) => b.trim() !== "");

	return blocks.map((block) => {
		const lines = block.split("\n");
		const kode_soal = lines[0].trim();

		let by = "";
		let hint = "";
		let solutionLines = [];

		for (let i = 1; i < lines.length; i++) {
			if (lines[i].startsWith("@BY:")) {
				by = lines[i].replace("@BY:", "").trim();
			} else if (lines[i].startsWith("@HINT:")) {
				hint = lines[i].replace("@HINT:", "").trim();
			} else {
				solutionLines.push(lines[i]);
			}
		}

		let finalSolution = [];
		if (by) finalSolution.push(`**Solusi oleh:** ${by}\n`);
		if (hint) finalSolution.push(`**Hint:** *${hint}*\n\n---\n`);
		finalSolution.push(solutionLines.join("\n").trim());

		return { kode_soal, solution: finalSolution.join("\n").trim() };
	});
}

function extractInfoFromID(kode_soal) {
	const regionCode = kode_soal.charAt(1);
	const regionName =
		regionCode === "N"
			? "Nasional"
			: regionCode === "W"
				? "Wilayah"
				: "Lainnya";
	const yearCode = kode_soal.substring(2, 4);
	const year = 2000 + parseInt(yearCode, 10);
	return { competitionName: `ONMIPA ${year} (${regionName})`, year };
}

// Fungsi untuk memproses satu pasang file (Soal & Solusi)
async function processFilePair(soalPath, solusiPath, categoryId) {
	const soalData = parseSoal(soalPath);
	const solusiData = parseSolusi(solusiPath);

	if (soalData.length === 0) return; // Lewati jika tidak ada soal

	const mergedData = soalData.map((soal) => {
		const matchedSolusi = solusiData.find(
			(s) => s.kode_soal === soal.kode_soal,
		);
		return {
			...soal,
			// Jika solusi tidak ditemukan, isikan null dengan aman
			solution: matchedSolusi ? matchedSolusi.solution : null,
		};
	});

	for (const item of mergedData) {
		const { competitionName, year } = extractInfoFromID(item.kode_soal);

		// Cari/Buat Kompetisi
		let compId = null;
		let { data: existingComp } = await supabase
			.from("competitions")
			.select("id")
			.eq("name", competitionName)
			.single();
		if (!existingComp) {
			const { data: newComp } = await supabase
				.from("competitions")
				.insert({
					category_id: categoryId,
					name: competitionName,
					year: year,
					organizer: "Puspresnas",
				})
				.select("id")
				.single();
			compId = newComp.id;
		} else {
			compId = existingComp.id;
		}

		// Cari/Buat Topik
		let topicId = null;
		if (item.bidang) {
			const slug = item.bidang.toLowerCase().replace(/\s+/g, "-");
			let { data: topic } = await supabase
				.from("topics")
				.select("id")
				.eq("slug", slug)
				.single();
			if (!topic) {
				const { data: newTopic } = await supabase
					.from("topics")
					.insert({ slug, name: item.bidang })
					.select("id")
					.single();
				topicId = newTopic.id;
			} else {
				topicId = topic.id;
			}
		}

		// Masukkan ke Database
		const { error } = await supabase.from("questions").upsert(
			{
				kode_soal: item.kode_soal,
				category_id: categoryId,
				competition_id: compId,
				topic_id: topicId,
				content: item.content,
				solution: item.solution,
			},
			{ onConflict: "kode_soal" },
		);

		if (error) {
			console.error(`❌ Gagal: ${item.kode_soal} - ${error.message}`);
		} else {
			const statusSolusi = item.solution
				? "✅ Solusi Tersedia"
				: "⚠️ Tanpa Solusi";
			console.log(
				`[OK] ${item.kode_soal} | ${item.bidang} -> ${statusSolusi}`,
			);
		}
	}
}

async function runMigration() {
	console.log("⏳ Memulai auto-scan folder ONMIPA...\n");

	// Pastikan kategori ONMIPA ada
	const { data: category } = await supabase
		.from("categories")
		.select("id")
		.eq("slug", "onmipa")
		.single();
	if (!category)
		throw new Error(
			"Kategori ONMIPA belum ada di database. Silakan jalankan SQL insert kategori dulu.",
		);

	// Baca semua folder di dalam direktori ONMIPA (contoh: 2011, 2012, ..., 2026)
	if (!fs.existsSync(BASE_DIR)) {
		console.error(
			`❌ Folder ${BASE_DIR} tidak ditemukan! Pastikan posisi foldernya benar.`,
		);
		return;
	}

	const folders = fs.readdirSync(BASE_DIR).filter((f) => !isNaN(f)); // Hanya ambil folder dengan nama angka

	for (const year of folders) {
		console.log(`\n📂 Memeriksa folder tahun: ${year}...`);
		const yearDir = path.join(BASE_DIR, year);

		// Proses berkas Wilayah
		const soalWilayah = path.join(yearDir, "wilayah.tex");
		const solWilayah = path.join(yearDir, "sol_wilayah.tex");
		await processFilePair(soalWilayah, solWilayah, category.id);

		// Proses berkas Nasional
		const soalNasional = path.join(yearDir, "nasional.tex");
		const solNasional = path.join(yearDir, "sol_nasional.tex");
		await processFilePair(soalNasional, solNasional, category.id);
	}

	console.log("\n🎉 Auto-Migrasi Selesai Semua!");
}

runMigration();
