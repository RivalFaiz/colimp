import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = "https://gexbownhpxmjkxzudbnk.supabase.co";
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdleGJvd25ocHhtamt4enVkYm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNTg5NDgsImV4cCI6MjA5OTgzNDk0OH0.y8PxUwPehRl1utGToaarrL2_8ufUll0KzXfpjnI0zTQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- KONFIGURASI FOLDER ---
// Ini akan otomatis mendeteksi lokasi folder tempat script ini berada
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOAL_DIR = path.join(__dirname, "soal");
const SOLUSI_DIR = path.join(__dirname, "solusi");
// ------------------------

function parseSoal(filePath) {
	const text = fs.readFileSync(filePath, "utf-8");
	// Memisahkan berdasarkan @ID: (berjaga-jaga jika 1 file ada lebih dari 1 soal)
	const blocks = text.split("@ID:").filter((b) => b.trim() !== "");

	return blocks.map((block) => {
		const lines = block.split("\n");
		const kode_soal = lines[0].trim(); // SM1, SM2, dst

		let bidang = "";
		let sumber = "";
		let contentLines = [];

		for (let i = 1; i < lines.length; i++) {
			if (lines[i].startsWith("@BIDANG:")) {
				bidang = lines[i].replace("@BIDANG:", "").trim();
			} else if (lines[i].startsWith("@SUMBER:")) {
				sumber = lines[i].replace("@SUMBER:", "").trim();
			} else {
				contentLines.push(lines[i]);
			}
		}

		return {
			kode_soal,
			bidang,
			sumber,
			content: contentLines.join("\n").trim(),
		};
	});
}

function parseSolusi(filePath) {
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

async function runMigration() {
	console.log("⏳ Mulai membaca folder Soal Menarik...\n");

	let soalData = [];
	let solusiData = [];

	// 1. Baca semua file di folder 'soal'
	if (fs.existsSync(SOAL_DIR)) {
		const files = fs.readdirSync(SOAL_DIR);
		for (const file of files) {
			// Abaikan file tersembunyi
			if (!file.startsWith(".")) {
				const filePath = path.join(SOAL_DIR, file);
				soalData.push(...parseSoal(filePath));
			}
		}
		console.log(
			`✅ Berhasil membaca ${soalData.length} data soal dari folder 'soal'.`,
		);
	} else {
		console.log(`❌ Folder ${SOAL_DIR} tidak ditemukan.`);
		return;
	}

	// 2. Baca semua file di folder 'solusi'
	if (fs.existsSync(SOLUSI_DIR)) {
		const files = fs.readdirSync(SOLUSI_DIR);
		for (const file of files) {
			if (!file.startsWith(".")) {
				const filePath = path.join(SOLUSI_DIR, file);
				solusiData.push(...parseSolusi(filePath));
			}
		}
		console.log(
			`✅ Berhasil membaca data solusi dari folder 'solusi'.\n`,
		);
	}

	if (soalData.length === 0) {
		console.log("❌ Tidak ada soal yang diproses.");
		return;
	}

	// Pastikan kategori 'soal-menarik' ada
	const { data: category } = await supabase
		.from("categories")
		.select("id")
		.eq("slug", "soal-menarik")
		.single();
	if (!category)
		throw new Error(
			"Kategori 'soal-menarik' belum ada di database. Silakan jalankan SQL Editor dulu.",
		);

	// Gabungkan Data
	const mergedData = soalData.map((soal) => {
		const matchedSolusi = solusiData.find(
			(s) => s.kode_soal === soal.kode_soal,
		);
		return {
			...soal,
			solution: matchedSolusi ? matchedSolusi.solution : null,
		};
	});

	console.log(
		`🚀 Mengunggah ${mergedData.length} Soal Menarik ke Supabase...\n`,
	);

	for (const item of mergedData) {
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

		const { error } = await supabase.from("questions").upsert(
			{
				kode_soal: item.kode_soal,
				category_id: category.id,
				competition_id: null, // Kosongkan karena bukan soal ONMIPA
				topic_id: topicId,
				source: item.sumber, // Kolom sumber baru
				content: item.content,
				solution: item.solution,
			},
			{ onConflict: "kode_soal" },
		);

		if (error) {
			console.error(`❌ Gagal: ${item.kode_soal} - ${error.message}`);
		} else {
			console.log(
				`[OK] ${item.kode_soal} | Sumber: ${item.sumber || "-"} | Bidang: ${item.bidang}`,
			);
		}
	}

	console.log("\n🎉 Migrasi Soal Menarik Selesai!");
}

runMigration();
