import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = "https://gexbownhpxmjkxzudbnk.supabase.co";
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdleGJvd25ocHhtamt4enVkYm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNTg5NDgsImV4cCI6MjA5OTgzNDk0OH0.y8PxUwPehRl1utGToaarrL2_8ufUll0KzXfpjnI0zTQ";

global.WebSocket = WebSocket;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: { persistSession: false, autoRefreshToken: false },
});

// ==========================================
// DAFTAR FILE YANG AKAN DI-UPLOAD
// Silakan ubah/tambah path file di bawah ini
// ==========================================
const DAFTAR_FILE_SOAL = [
	// "./onmipa/2025/wilayah.txt",
	"./onmipa/2024/nasional.txt",
	// "./onmipa/2015/wilayah.txt",
	// "./onmipa/2014/wilayah.txt",
	// "./onmipa/2013/wilayah.txt",
	// "./onmipa/2012/wilayah.txt",
	// "./onmipa/2011/wilayah.txt",
    // "./bank_soal/IMC/simulasi/2026_3.txt"
	// Tambahkan file soal seleksi, pelatnas, simulasi di sini
];

const DAFTAR_FILE_SOLUSI = ["./onmipa/2024/sol_nasional.txt"];

// --- FUNGSI PARSING SOAL ---
function parseSoal(filePath) {
	if (!fs.existsSync(filePath)) {
		console.warn(
			`⚠️ [Peringatan] File soal tidak ditemukan: ${filePath}`,
		);
		return [];
	}
	const text = fs.readFileSync(filePath, "utf-8");
	const blocks = text.split("@ID:").filter((b) => b.trim() !== "");

	const hasil = [];
	blocks.forEach((block) => {
		const lines = block.split("\n");
		const kode_soal = lines[0].trim();
		let bidang = "";
		let sumber = "";
		let contentLines = [];

		for (let i = 1; i < lines.length; i++) {
			const line = lines[i];
			if (line.startsWith("@BIDANG:")) {
				bidang = line.replace("@BIDANG:", "").trim();
			} else if (line.startsWith("@SUMBER:")) {
				sumber = line.replace("@SUMBER:", "").trim();
			} else {
				contentLines.push(line);
			}
		}

		const content = contentLines.join("\n").trim();
		if (!kode_soal || !content) {
			console.warn(
				`⚠️ [Format Salah] Soal di ${filePath} memiliki ID atau konten kosong. Dilewati.`,
			);
			return;
		}

		hasil.push({ kode_soal, bidang, sumber, content });
	});
	return hasil;
}

// --- FUNGSI PARSING SOLUSI ---
function parseSolusi(filePath) {
	if (!fs.existsSync(filePath)) {
		console.warn(
			`⚠️ [Peringatan] File solusi tidak ditemukan: ${filePath}`,
		);
		return [];
	}
	const text = fs.readFileSync(filePath, "utf-8");
	const blocks = text.split("@ID:").filter((b) => b.trim() !== "");

	const hasil = [];
	blocks.forEach((block) => {
		const lines = block.split("\n");
		const kode_soal = lines[0].trim();

		let by = "";
		let hint = "";
		let solutionLines = [];

		for (let i = 1; i < lines.length; i++) {
			const line = lines[i];
			if (line.startsWith("@BY:")) {
				by = line.replace("@BY:", "").trim();
			} else if (line.startsWith("@HINT")) {
				hint = line.substring(line.indexOf(":") + 1).trim();
			} else {
				solutionLines.push(line);
			}
		}

		const contentSolusi = solutionLines.join("\n").trim();
		if (!kode_soal || !contentSolusi) {
			console.warn(
				`⚠️ [Format Salah] Solusi di ${filePath} memiliki ID atau konten kosong. Dilewati.`,
			);
			return;
		}

		let finalSolution = [];
		if (by) finalSolution.push(`**Solusi oleh:** ${by}\n`);
		if (hint) finalSolution.push(`**Hint:** *${hint}*\n\n---\n`);
		finalSolution.push(contentSolusi);

		hasil.push({ kode_soal, solution: finalSolution.join("\n").trim() });
	});
	return hasil;
}

// --- FUNGSI EKSTRAK INFO ID (DIPERBARUI) ---
function extractInfoFromID(kode_soal) {
	let categorySlug = null;
	let competitionName = null;
	let year = null;
	let isSM = false;

	// 1. Soal Menarik (SM)
	if (kode_soal.startsWith("SM")) {
		isSM = true;
		categorySlug = "soal-menarik";
	}
	// 2. ONMIPA (O...)
	else if (kode_soal.startsWith("O")) {
		categorySlug = "onmipa";
		const regionCode = kode_soal.charAt(1);
		const regionName =
			regionCode === "N"
				? "Nasional"
				: regionCode === "W"
					? "Wilayah"
					: "Lainnya";
		const yearCode = kode_soal.substring(2, 4);
		year = 2000 + parseInt(yearCode, 10);
		competitionName = `ONMIPA ${year} (${regionName})`;
	}
	// 3. Seleksi IMC (SIMC26D1P1...)
	else if (kode_soal.startsWith("SIMC")) {
		categorySlug = "seleksi-imc";
		const yearCode = kode_soal.substring(4, 6); // Ambil '26'
		year = 2000 + parseInt(yearCode, 10);
		competitionName = `Seleksi IMC ${year}`;
	}
	// 4. Pelatnas IMC (PIMC261...)
	else if (kode_soal.startsWith("PIMC")) {
		categorySlug = "pelatnas-imc";
		const yearCode = kode_soal.substring(4, 6); // Ambil '26'
		year = 2000 + parseInt(yearCode, 10);
		competitionName = `Pelatnas IMC ${year}`;
	}
	// 5. Simulasi IMC (SL1IMC26P1...)
	else if (kode_soal.startsWith("SL")) {
		categorySlug = "simulasi-imc";
		// Ekstrak angka Simulasi (misal: SL1 -> 1)
		const simMatch = kode_soal.match(/SL(\d+)/);
		const simNum = simMatch ? simMatch[1] : "";
		// Ekstrak Tahun (misal: IMC26 -> 2026)
		const yearMatch = kode_soal.match(/IMC(\d{2})/);
		if (yearMatch) year = 2000 + parseInt(yearMatch[1], 10);
		competitionName = `Simulasi ${simNum} IMC ${year}`;
	}
	// 6. Koala ITB (Misal format: KOALA26P1) - Opsional jika kamu butuh
	else if (kode_soal.startsWith("KOALA")) {
		categorySlug = "koala-itb";
		const yearCode = kode_soal.substring(5, 7);
		year = 2000 + parseInt(yearCode, 10);
		competitionName = `Koala ITB ${year}`;
	}

	return { categorySlug, competitionName, year, isSM };
}

// --- FUNGSI UTAMA (MIGRASI) ---
async function runMigration() {
	console.log("==================================================");
	console.log("🚀 MEMULAI UPLOAD MASTER (SOAL & SOLUSI)");
	console.log("==================================================\n");

	// 1. Tarik Semua Kategori dari Supabase ke dalam Map
	const { data: categoriesData, error: catError } = await supabase
		.from("categories")
		.select("id, slug");
	if (catError || !categoriesData) {
		console.error(
			"❌ ERROR: Gagal mengambil data kategori dari database.",
		);
		return;
	}

	// Buat dictionary/map untuk pencarian kategori lebih cepat
	const categoryMap = {};
	categoriesData.forEach((c) => (categoryMap[c.slug] = c.id));

	// 2. Baca Semua Data
	let soalData = [];
	let solusiData = [];

	DAFTAR_FILE_SOAL.forEach((file) => soalData.push(...parseSoal(file)));
	DAFTAR_FILE_SOLUSI.forEach((file) =>
		solusiData.push(...parseSolusi(file)),
	);

	if (soalData.length === 0) {
		console.log("❌ Tidak ada data soal valid yang bisa diproses.");
		return;
	}

	// 3. Gabungkan Data (Merge)
	const mergedData = soalData.map((soal) => {
		const matchedSolusi = solusiData.find(
			(s) => s.kode_soal === soal.kode_soal,
		);
		return {
			...soal,
			solution: matchedSolusi ? matchedSolusi.solution : null,
		};
	});

	console.log(`\n📦 Total soal siap diupload: ${mergedData.length} soal.`);
	console.log("Mulai sinkronisasi ke database...\n");

	// 4. Proses Tiap Soal
	for (const item of mergedData) {
		const { categorySlug, competitionName, year, isSM } =
			extractInfoFromID(item.kode_soal);

		// Abaikan jika ID tidak dikenali
		if (!categorySlug) {
			console.warn(
				`⚠️ [ID Tidak Dikenal] Kode ${item.kode_soal} tidak sesuai format yang ada. Dilewati.`,
			);
			continue;
		}

		const targetCategoryId = categoryMap[categorySlug];
		if (!targetCategoryId) {
			console.warn(
				`⚠️ Kategori '${categorySlug}' belum ada di tabel categories! Harap tambahkan lewat SQL Editor.`,
			);
			continue;
		}

		let compId = null;

		// A. Logika Kompetisi (Buat kompetisi jika belum ada)
		if (!isSM && competitionName) {
			let { data: existingComp } = await supabase
				.from("competitions")
				.select("id")
				.eq("name", competitionName)
				.eq("category_id", targetCategoryId)
				.single();

			if (!existingComp) {
				const { data: newComp } = await supabase
					.from("competitions")
					.insert({
						category_id: targetCategoryId,
						name: competitionName,
						year: year,
						organizer: categorySlug.includes("imc")
							? "BPTI / Pusat Prestasi Nasional"
							: "Internal", // Dinamis
					})
					.select("id")
					.single();
				compId = newComp.id;
			} else {
				compId = existingComp.id;
			}
		}

		// B. Logika Topik (Bidang)
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

		// C. Upsert ke tabel Questions
		const { error } = await supabase.from("questions").upsert(
			{
				kode_soal: item.kode_soal,
				category_id: targetCategoryId,
				competition_id: compId,
				topic_id: topicId,
				source: item.sumber,
				content: item.content,
				solution: item.solution,
			},
			{ onConflict: "kode_soal" },
		);

		if (error) {
			console.error(`❌ Gagal: ${item.kode_soal} - ${error.message}`);
		} else {
			const statusSolusi = item.solution
				? "✅ Dengan Solusi"
				: "⚠️ Tanpa Solusi";
			console.log(
				`[OK] ${item.kode_soal} (${competitionName || "Soal Menarik"}) -> ${statusSolusi}`,
			);
		}
	}

	console.log("\n🎉 SELURUH PROSES UPLOAD SELESAI!");
}

runMigration();
