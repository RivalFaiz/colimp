import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
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

// Helper Parse Solusi
const parseSolutionData = (rawText) => {
	if (!rawText) return { hint: null, body: null, author: null };
	let text = rawText;
	let author = null;
	let hint = null;
	const byMatch = text.match(/\*\*Solusi oleh:\*\*\s*(.*)/);
	if (byMatch) {
		author = byMatch[1].trim();
		text = text.replace(byMatch[0], "").trim();
	}
	const hintMatch = text.match(/\*\*Hint:\*\*\s\*([\s\S]*?)\*\n\n---\n/);
	if (hintMatch) {
		hint = hintMatch[1].trim();
		text = text.replace(hintMatch[0], "").trim();
	}
	return { hint, body: text, author };
};



export default function DetailSoalKhusus() {
	const { id } = useParams();
	const [years, setYears] = useState([]);
	const [activeYear, setActiveYear] = useState("");
	const [activeTopic, setActiveTopic] = useState("Semua Bidang");

	const [questions, setQuestions] = useState([]);
	const [isLoadingYears, setIsLoadingYears] = useState(true);
	const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

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

	const formatTitle = (slug) => {
		return slug
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	// 1. Tarik Tahun (Years)
	useEffect(() => {
		async function fetchYears() {
			setIsLoadingYears(true);
			const { data: categoryData } = await supabase
				.from("categories")
				.select("id")
				.eq("slug", id)
				.single();

			if (categoryData) {
				// Tarik data tahun dari kompetisi yang berelasi dengan kategori ini
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
				} else {
					// Jika tidak ada data kompetisi, kosongkan dropdown tahun
					setYears([]);
					setActiveYear("");
				}
			}
			setIsLoadingYears(false);
		}
		fetchYears();
	}, [id]);

	// 2. Tarik Soal berdasarkan Tahun & Bidang
	useEffect(() => {
		async function fetchQuestions() {
			// Jika tidak ada activeYear (karena datanya memang kosong), stop.
			if (!activeYear && !isLoadingYears && years.length === 0) {
				setQuestions([]);
				return;
			}
			if (!activeYear) return;

			// Cek apakah data sudah ada di Cache
			const cacheKey = `${id}-${activeYear}-${activeTopic}`;
			if (cache[cacheKey]) {
				setQuestions(cache[cacheKey]);
				return; // Berhenti di sini, memori sudah menyimpannya!
			}

			setIsLoadingQuestions(true);
			setQuestions([]);

			const { data: categoryData } = await supabase
				.from("categories")
				.select("id")
				.eq("slug", id)
				.single();
			if (!categoryData) {
				setIsLoadingQuestions(false);
				return;
			}

			// Ambil ID Kompetisi yang sesuai dengan tahun
			const { data: competitions } = await supabase
				.from("competitions")
				.select("id")
				.eq("category_id", categoryData.id)
				.eq("year", activeYear);

			let query = supabase
				.from("questions")
				.select(`*, competitions ( name ), topics ( name )`)
				.eq("category_id", categoryData.id);

			// Jika ada kompetisi di tahun tersebut, filter berdasarkan kompetisi itu
			if (competitions && competitions.length > 0) {
				const compIds = competitions.map((c) => c.id);
				query = query.in("competition_id", compIds);
			}

			// Filter Topik/Bidang
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

			const { data: questionsData, error } = await query.order(
				"kode_soal",
				{ ascending: true },
			);

			if (!error && questionsData) {
				setQuestions(questionsData);
				// Simpan ke Cache
				setCache((prev) => ({
					...prev,
					[cacheKey]: questionsData,
				}));
			}
			setIsLoadingQuestions(false);
		}
		fetchQuestions();
	}, [id, activeYear, activeTopic, isLoadingYears, years.length]);

	return (
		<div className="py-8 md:py-12 animate-in fade-in duration-500">
			{/* Header Section dengan Logo di Kanan */}
			<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
				<div>
					<Link
						to="/soal-khusus"
						className="text-sm font-medium text-slate-400 hover:text-blue-600 flex items-center gap-2 w-fit mb-6 transition-colors">
						<span>←</span> Kembali ke Menu Soal Khusus
					</Link>
					<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
						Soal {formatTitle(id)}
					</h1>
					<p className="text-slate-500 max-w-2xl leading-relaxed text-sm md:text-base">
						Arsip soal khusus untuk kategori ini.
					</p>
				</div>

				<div className="hidden sm:flex shrink-0 items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl shadow-sm shadow-blue-500/20 text-white">
					<svg
						className="w-7 h-7"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
				</div>
			</div>

			{/* Filter Navigasi */}
			{years.length > 0 && (
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
			)}

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
						{/* BANNER EKSKLUSIF: Hanya muncul jika ID = seleksi-imc dan ada soal */}
						{id === "seleksi-imc" && questions.length > 0 && (
							<div className="mb-6 p-5 sm:p-6 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg shadow-red-500/20 text-white flex flex-col gap-2 relative overflow-hidden">
								<div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
								<div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-yellow-400 opacity-10 rounded-full blur-2xl"></div>

								<div className="flex items-center gap-2 text-red-100 text-xs sm:text-sm font-bold mb-1 uppercase tracking-wider">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2.5"
											d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Informasi Kontingen Indonesia
								</div>
								<p className="text-sm sm:text-base leading-relaxed relative z-10 font-medium">
									Seleksi Nasional IMC tahun{" "}
									<span className="font-extrabold text-white">
										{activeYear}
									</span>{" "}
									telah selesai dilaksanakan.
									Perwakilan mahasiswa Indonesia
									untuk berlaga di ajang
									International Mathematics
									Competition telah resmi terpilih!
								</p>
								<div className="mt-3 relative z-10">
									<Link
										to={`/pemenang`}
										className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow-300 hover:text-yellow-100 transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10">
										Lihat Halaman Pemenang /
										Kontingen
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2.5"
												d="M17 8l4 4m0 0l-4 4m4-4H3"
											/>
										</svg>
									</Link>
								</div>
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
									Coba ubah filter tahun atau bidang
									yang lain.
								</p>
							</div>
						) : (
							<div className="space-y-4 sm:space-y-6">
								{questions.map((q) => (
									<QuestionCard key={q.id} q={q} />
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
