import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import QuestionCard from "../components/QuestionCard";

// --- Komponen Custom Dropdown ---
const CustomSelect = ({ label, options, value, onChange, disabled }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative flex-1" ref={dropdownRef}>
			<label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
				{label}
			</label>
			<button
				type="button"
				disabled={disabled}
				onClick={() => setIsOpen(!isOpen)}
				className={`w-full flex items-center justify-between bg-white border ${
					isOpen
						? "border-blue-500 ring-4 ring-blue-500/10"
						: "border-slate-200 hover:border-blue-300"
				} text-slate-700 text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}>
				<span className="truncate">
					{disabled ? "Memuat..." : value}
				</span>
				<svg
					className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{isOpen && !disabled && (
				<div className="absolute z-20 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
					<ul className="max-h-60 overflow-y-auto">
						{options.map((opt) => (
							<li key={opt}>
								<button
									type="button"
									onClick={() => {
										onChange(opt);
										setIsOpen(false);
									}}
									className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
										value === opt
											? "bg-blue-50 text-blue-700 font-semibold"
											: "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
									}`}>
									{opt}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

// --- Helper Parse Solusi ---
const parseSolutionData = (rawText) => {
	if (!rawText) return { hint: null, body: null, author: null };
	let text = rawText;
	let author = null;
	let hint = null;

	const byRegex = /\*\*Solusi oleh:\*\*\s*(.*)/;
	const byMatch = text.match(byRegex);
	if (byMatch) {
		author = byMatch[1].trim();
		text = text.replace(byMatch[0], "").trim();
	}

	const hintRegex = /\*\*Hint:\*\*\s\*([\s\S]*?)\*\n\n---\n/;
	const hintMatch = text.match(hintRegex);
	if (hintMatch) {
		hint = hintMatch[1].trim();
		text = text.replace(hintMatch[0], "").trim();
	}
	return { hint, body: text, author };
};

// --- Komponen Individual Card Soal ---
// --- Komponen Individual Card Soal (Universal & Sangat Estetik) ---


export default function Onmipa() {
	const [years, setYears] = useState([]);
	const [activeYear, setActiveYear] = useState("");
	const [activeTopic, setActiveTopic] = useState("Semua Bidang");

	const [hostUniversity, setHostUniversity] = useState("");
	const [overallChampion, setOverallChampion] = useState("");

	const [isLoadingYears, setIsLoadingYears] = useState(true);
	const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
	const [questions, setQuestions] = useState([]);

	// STATE CACHE BARU
	const [cache, setCache] = useState({});

	const topics = [
		"Semua Bidang",
		"Aljabar Linear",
		"Struktur Aljabar",
		"Analisis Kompleks",
		"Kombinatorika",
		"Analisis Real",
	];

	useEffect(() => {
		async function fetchYears() {
			setIsLoadingYears(true);
			const { data: categoryData } = await supabase
				.from("categories")
				.select("id")
				.eq("slug", "onmipa")
				.single();

			if (categoryData) {
				const { data } = await supabase
					.from("competitions")
					.select("year")
					.eq("category_id", categoryData.id)
					.order("year", { ascending: false });
				if (data && data.length > 0) {
					const uniqueYears = [
						...new Set(data.map((item) => item.year)),
					];
					setYears(uniqueYears);
					setActiveYear(uniqueYears[0]);
				}
			}
			setIsLoadingYears(false);
		}
		fetchYears();
	}, []);

	useEffect(() => {
		async function fetchQuestions() {
			if (!activeYear) return;

			// Cek apakah data sudah ada di Cache
			const cacheKey = `${activeYear}-${activeTopic}`;
			if (cache[cacheKey]) {
				setQuestions(cache[cacheKey].data);
				setHostUniversity(cache[cacheKey].host);
				setOverallChampion(cache[cacheKey].champion);
				return; // Berhenti di sini, tidak perlu fetch ke database lagi!
			}

			setIsLoadingQuestions(true);
			setQuestions([]);
			setHostUniversity("");
			setOverallChampion("");

			const { data: categoryData } = await supabase
				.from("categories")
				.select("id")
				.eq("slug", "onmipa")
				.single();
			if (!categoryData) {
				setIsLoadingQuestions(false);
				return;
			}

			const { data: competitions } = await supabase
				.from("competitions")
				.select("id, host_university, overall_champion")
				.eq("category_id", categoryData.id)
				.eq("year", activeYear);

			if (!competitions || competitions.length === 0) {
				setIsLoadingQuestions(false);
				return;
			}

			const foundHost =
				competitions.find((c) => c.host_university)
					?.host_university || "Universitas Belum Ditentukan";
			const foundChampion =
				competitions.find((c) => c.overall_champion)
					?.overall_champion || "Belum Ditentukan";

			setHostUniversity(foundHost);
			setOverallChampion(foundChampion);

			const compIds = competitions.map((c) => c.id);
			let query = supabase
				.from("questions")
				.select(`*, competitions ( name ), topics ( name )`)
				.in("competition_id", compIds);

			if (activeTopic !== "Semua Bidang") {
				const { data: topicData } = await supabase
					.from("topics")
					.select("id")
					.eq("name", activeTopic)
					.single();
				if (topicData) query = query.eq("topic_id", topicData.id);
				else {
					setQuestions([]);
					setIsLoadingQuestions(false);
					return;
				}
			}

			const { data: questionsData, error } = await query;
			if (!error && questionsData) {
				const sortedData = questionsData.sort((a, b) =>
					(a.kode_soal || "").localeCompare(b.kode_soal || ""),
				);
				setQuestions(sortedData);

				// Simpan data hasil tarikan ke dalam Cache Memory
				setCache((prev) => ({
					...prev,
					[cacheKey]: {
						data: sortedData,
						host: foundHost,
						champion: foundChampion,
					},
				}));
			}
			setIsLoadingQuestions(false);
		}
		fetchQuestions();
	}, [activeYear, activeTopic]);

	// Menghitung jumlah soal Wilayah dan Nasional
	const countWilayah = questions.filter(
		(q) => (q.kode_soal || "").charAt(1) === "W",
	).length;
	const countNasional = questions.filter(
		(q) => (q.kode_soal || "").charAt(1) === "N",
	).length;

	// Fungsi untuk Smooth Scroll (Loncat Cepat)
	const scrollToSection = (id) => {
		const el = document.getElementById(id);
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 30;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	const groupedQuestions = [
		{
			title: "Tingkat Wilayah • Hari Pertama (Isian Singkat)",
			items: [],
		},
		{ title: "Tingkat Wilayah • Hari Pertama (Uraian)", items: [] },
		{ title: "Tingkat Wilayah • Hari Kedua (Isian Singkat)", items: [] },
		{ title: "Tingkat Wilayah • Hari Kedua (Uraian)", items: [] },
		{
			title: "Tingkat Nasional • Hari Pertama (Isian Singkat)",
			items: [],
		},
		{ title: "Tingkat Nasional • Hari Pertama (Uraian)", items: [] },
		{ title: "Tingkat Nasional • Hari Kedua (Isian Singkat)", items: [] },
		{ title: "Tingkat Nasional • Hari Kedua (Uraian)", items: [] },
		{ title: "Lainnya", items: [] },
	];

	questions.forEach((q) => {
		const kode = (q.kode_soal || "").trim();
		const region = kode.charAt(1);
		const day = kode.substring(4, 6);
		const type = kode.slice(-1);

		if (region === "W" && day === "D1" && type === "I")
			groupedQuestions[0].items.push(q);
		else if (region === "W" && day === "D1" && type === "U")
			groupedQuestions[1].items.push(q);
		else if (region === "W" && day === "D2" && type === "I")
			groupedQuestions[2].items.push(q);
		else if (region === "W" && day === "D2" && type === "U")
			groupedQuestions[3].items.push(q);
		else if (region === "N" && day === "D1" && type === "I")
			groupedQuestions[4].items.push(q);
		else if (region === "N" && day === "D1" && type === "U")
			groupedQuestions[5].items.push(q);
		else if (region === "N" && day === "D2" && type === "I")
			groupedQuestions[6].items.push(q);
		else if (region === "N" && day === "D2" && type === "U")
			groupedQuestions[7].items.push(q);
		else groupedQuestions[8].items.push(q);
	});

	let wilayahFound = false;
	let nasionalFound = false;

	return (
		<div className="py-8 md:py-12 animate-in fade-in duration-500">
			{/* Header Section dengan Logo di Kanan */}
			<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
				<div>
					<Link
						to="/"
						className="text-sm font-medium text-slate-400 hover:text-blue-600 flex items-center gap-2 w-fit mb-6 transition-colors">
						<span>←</span> Kembali ke Beranda
					</Link>
					<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
						Arsip Soal ONMIPA
					</h1>
					<p className="text-slate-500 max-w-2xl leading-relaxed text-sm md:text-base">
						Pilih tahun dan bidang untuk mulai berlatih.
					</p>
				</div>

				{/* Ikon/Logo Kanan Atas */}
				<div className="hidden sm:flex shrink-0 items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl shadow-sm shadow-blue-500/20 text-white">
					<svg
						className="w-7 h-7"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M4 14l8-10v8h8l-8 10v-8H4z" />
					</svg>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 mb-8">
				<CustomSelect
					label="Tahun"
					options={years}
					value={activeYear}
					onChange={setActiveYear}
					disabled={isLoadingYears}
				/>
				<CustomSelect
					label="Bidang"
					options={topics}
					value={activeTopic}
					onChange={setActiveTopic}
					disabled={isLoadingYears}
				/>
				<div className="hidden sm:block flex-[2]"></div>
			</div>

			<div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-8 min-h-[400px]">
				{isLoadingYears || isLoadingQuestions ? (
					<div className="w-full h-full flex flex-col items-center justify-center space-y-4 py-20">
						<div className="w-8 h-8 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin"></div>
						<p className="text-slate-400 text-sm">
							Menarik data soal...
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{/* Banner Informasi Estetik */}
						{questions.length > 0 && (
							<div className="mb-6 p-5 sm:p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white flex flex-col gap-2 relative overflow-hidden">
								<div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>

								<div className="flex items-center gap-2 text-blue-100 text-xs sm:text-sm font-semibold mb-1 uppercase tracking-wider">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Informasi Penyelenggaraan
								</div>
								<p className="text-sm sm:text-base leading-relaxed relative z-10">
									ONMIPA tahun{" "}
									<span className="font-bold">
										{activeYear}
									</span>{" "}
									diselenggarakan di{" "}
									<span className="font-bold underline decoration-blue-300 underline-offset-4">
										{hostUniversity}
									</span>{" "}
									sebagai tuan rumah, dan juara
									umumnya adalah{" "}
									<span className="font-bold">
										{overallChampion}
									</span>
									. Untuk{" "}
									{activeTopic === "Semua Bidang" ? (
										"semua bidang"
									) : (
										<span className="font-bold">
											bidang {activeTopic}
										</span>
									)}
									, saat ini terdapat{" "}
									<span className="font-bold bg-white/20 px-2 py-0.5 rounded-md mx-1">
										{countWilayah} soal
									</span>{" "}
									tingkat Wilayah dan{" "}
									<span className="font-bold bg-white/20 px-2 py-0.5 rounded-md mx-1">
										{countNasional} soal
									</span>{" "}
									tingkat Nasional.
								</p>
								<div className="mt-3 relative z-10">
									<Link
										to={`/pemenang`}
										className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow-300 hover:text-yellow-400 transition-colors">
										Silakan kunjungi Halaman
										Pemenang untuk informasi lebih
										lanjut
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
								</div>
							</div>
						)}

						{/* Tombol Loncat Cepat (Jump to Section) */}
						{(countWilayah > 0 || countNasional > 0) && (
							<div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 pb-4 border-b border-slate-100">
								<span className="text-sm font-semibold text-slate-500 mr-2 w-full sm:w-auto mb-2 sm:mb-0">
									Loncat ke:
								</span>
								{countWilayah > 0 && (
									<button
										onClick={() =>
											scrollToSection(
												"section-wilayah",
											)
										}
										className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs sm:text-sm font-bold hover:bg-slate-200 hover:text-blue-600 transition-colors flex items-center gap-2">
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											/>
										</svg>
										Tingkat Wilayah
									</button>
								)}
								{countNasional > 0 && (
									<button
										onClick={() =>
											scrollToSection(
												"section-nasional",
											)
										}
										className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs sm:text-sm font-bold hover:bg-slate-200 hover:text-blue-600 transition-colors flex items-center gap-2">
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											/>
										</svg>
										Tingkat Nasional
									</button>
								)}
							</div>
						)}

						{questions.length === 0 ? (
							<div className="w-full p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center min-h-[200px] text-center">
								<span className="text-4xl mb-4">
									📭
								</span>
								<p className="text-slate-600 font-medium">
									Belum ada soal tersedia
								</p>
								<p className="text-slate-400 text-sm mt-1">
									Coba pilih tahun atau bidang yang
									lain.
								</p>
							</div>
						) : (
							<div className="space-y-12">
								{groupedQuestions.map((group) => {
									if (group.items.length === 0)
										return null;

									let sectionId = "";
									if (
										group.title.includes(
											"Wilayah",
										) &&
										!wilayahFound
									) {
										sectionId = "section-wilayah";
										wilayahFound = true;
									} else if (
										group.title.includes(
											"Nasional",
										) &&
										!nasionalFound
									) {
										sectionId =
											"section-nasional";
										nasionalFound = true;
									}

									return (
										<div
											key={group.title}
											id={
												sectionId ||
												undefined
											}
											className="space-y-6 pt-2">
											<div className="flex items-center gap-4">
												<h2 className="text-lg font-bold text-slate-800 tracking-tight">
													{group.title}
												</h2>
												<div className="h-px flex-1 bg-slate-200"></div>
											</div>

											<div className="space-y-4 sm:space-y-6">
												{group.items.map(
													(q) => (
														<QuestionCard
															key={
																q.id
															}
															q={q}
														/>
													),
												)}
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
