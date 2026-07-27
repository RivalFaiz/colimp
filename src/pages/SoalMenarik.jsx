import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import QuestionCard from "../components/QuestionCard";
const ITEMS_PER_PAGE = 20;

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
		<div className="relative flex-1 max-w-xs" ref={dropdownRef}>
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
// Dipisah agar state buka-tutup (Hint/Solusi) berlaku per-soal, tidak global
// --- Komponen Individual Card Soal (Universal untuk ONMIPA & Soal Menarik) ---
// --- Komponen Individual Card Soal (Universal & Sangat Estetik) ---


export default function SoalMenarik() {
	const [activeTopic, setActiveTopic] = useState("Semua Bidang");
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	// Cache: { "Bidang": { 1: { data, count }, 2: { data, count } } }
	const [cache, setCache] = useState({});

	const topics = [
		"Semua Bidang",
		"Aljabar Linear",
		"Struktur Aljabar",
		"Analisis Kompleks",
		"Kombinatorika",
		"Analisis Real",
	];

	const handleTopicChange = (newTopic) => {
		setActiveTopic(newTopic);
		setCurrentPage(1);
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		async function fetchQuestions() {
			if (cache[activeTopic] && cache[activeTopic][currentPage]) {
				return;
			}

			setIsLoading(true);

			const { data: categoryData } = await supabase
				.from("categories")
				.select("id")
				.eq("slug", "soal-menarik")
				.single();
			if (!categoryData) {
				setIsLoading(false);
				return;
			}

			let query = supabase
				.from("questions")
				.select(`*, topics ( name )`, { count: "exact" })
				.eq("category_id", categoryData.id);

			if (activeTopic !== "Semua Bidang") {
				const { data: topicData } = await supabase
					.from("topics")
					.select("id")
					.eq("name", activeTopic)
					.single();
				if (topicData) {
					query = query.eq("topic_id", topicData.id);
				} else {
					setCache((prev) => ({
						...prev,
						[activeTopic]: {
							[currentPage]: { data: [], count: 0 },
						},
					}));
					setIsLoading(false);
					return;
				}
			}

			const from = (currentPage - 1) * ITEMS_PER_PAGE;
			const to = from + ITEMS_PER_PAGE - 1;

			query = query
				.order("kode_soal", { ascending: true })
				.range(from, to);

			const { data, count, error } = await query;

			if (!error && data) {
				setCache((prev) => ({
					...prev,
					[activeTopic]: {
						...(prev[activeTopic] || {}),
						[currentPage]: { data, count },
					},
				}));
			}
			setIsLoading(false);
		}

		fetchQuestions();
	}, [activeTopic, currentPage]);

	const currentData = cache[activeTopic]?.[currentPage]?.data || [];
	const currentCount = cache[activeTopic]?.[currentPage]?.count || 0;
	const totalPages = Math.ceil(currentCount / ITEMS_PER_PAGE) || 1;

	const renderPagination = () => {
		if (totalPages <= 1) return null;

		const getVisiblePages = () => {
			const delta = 1;
			const range = [];
			const rangeWithDots = [];
			let l;

			for (let i = 1; i <= totalPages; i++) {
				if (
					i === 1 ||
					i === totalPages ||
					(i >= currentPage - delta && i <= currentPage + delta)
				) {
					range.push(i);
				}
			}

			for (let i of range) {
				if (l) {
					if (i - l === 2) {
						rangeWithDots.push(l + 1);
					} else if (i - l !== 1) {
						rangeWithDots.push("...");
					}
				}
				rangeWithDots.push(i);
				l = i;
			}
			return rangeWithDots;
		};

		const visiblePages = getVisiblePages();

		return (
			<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 mt-12 pt-8 border-t border-slate-200/70">
				<div className="flex items-center gap-2">
					<button
						disabled={currentPage === 1}
						onClick={() => handlePageChange(currentPage - 1)}
						className="p-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<span className="hidden sm:inline">
							Sebelumnya
						</span>
					</button>

					<div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
						{visiblePages.map((page, index) => {
							if (page === "...") {
								return (
									<span
										key={`dots-${index}`}
										className="w-6 sm:w-8 text-center text-slate-400 font-medium text-sm">
										...
									</span>
								);
							}
							return (
								<button
									key={page}
									onClick={() =>
										handlePageChange(page)
									}
									className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
										currentPage === page
											? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
											: "text-slate-600 hover:bg-slate-100"
									}`}>
									{page}
								</button>
							);
						})}
					</div>

					<button
						disabled={currentPage === totalPages}
						onClick={() => handlePageChange(currentPage + 1)}
						className="p-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
						<span className="hidden sm:inline">
							Selanjutnya
						</span>
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
					</button>
				</div>

				<div className="flex items-center gap-2 sm:ml-4 text-sm text-slate-500">
					<span>Ke:</span>
					<input
						type="number"
						min={1}
						max={totalPages}
						placeholder={currentPage}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const val = parseInt(e.target.value);
								if (val >= 1 && val <= totalPages) {
									handlePageChange(val);
									e.target.value = "";
								}
							}
						}}
						className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</div>
			</div>
		);
	};

	return (
		<div className="py-8 md:py-12 animate-in fade-in duration-500">
			<div className="mb-8">
				<Link
					to="/"
					className="text-sm font-medium text-slate-400 hover:text-blue-600 flex items-center gap-2 w-fit">
					<span>←</span> Kembali ke Beranda
				</Link>
			</div>

			<div className="mb-10">
				<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
					Soal Menarik
				</h1>
				<p className="text-slate-500 max-w-2xl leading-relaxed text-sm md:text-base">
					Koleksi problem solving unik dan menantang dari
					berbagai literatur.
				</p>
			</div>

			<div className="flex gap-4 mb-8">
				<CustomSelect
					label="Filter Bidang"
					options={topics}
					value={activeTopic}
					onChange={handleTopicChange}
				/>
			</div>

			<div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-8 min-h-[500px] flex flex-col">
				{isLoading ? (
					<div className="w-full flex-1 flex flex-col items-center justify-center space-y-4 py-20">
						<div className="w-8 h-8 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin"></div>
						<p className="text-slate-400 text-sm">
							Menarik data halaman {currentPage}...
						</p>
					</div>
				) : (
					<div className="flex flex-col flex-1">
						<div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-blue-50/50 border border-blue-100 text-slate-600 rounded-full text-xs sm:text-sm font-medium mb-6 w-fit">
							<span className="hidden sm:inline">
								Menampilkan Bidang:
							</span>
							<span className="text-blue-600 font-bold">
								{activeTopic}
							</span>

							<span className="text-slate-300 mx-0.5 sm:mx-1">
								|
							</span>

							<span className="hidden sm:inline">
								Halaman{" "}
								<span className="text-slate-800 font-bold">
									{currentPage}
								</span>{" "}
								dari {totalPages}
							</span>

							<span className="sm:hidden tracking-wide">
								Hal:{" "}
								<span className="text-slate-800 font-bold">
									{currentPage}
								</span>
								/{totalPages}
							</span>
						</div>

						{currentData.length === 0 ? (
							<div className="w-full flex-1 p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center">
								<span className="text-4xl mb-4">
									📭
								</span>
								<p className="text-slate-600 font-medium">
									Belum ada soal di bidang ini
								</p>
							</div>
						) : (
							<>
								<div className="space-y-4 sm:space-y-6 flex-1">
									{currentData.map((q) => (
										<QuestionCard
											key={q.id}
											q={q}
										/>
									))}
								</div>
								{renderPagination()}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
