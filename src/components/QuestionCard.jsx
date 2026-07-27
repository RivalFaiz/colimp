import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// --- Helper Parse Solusi ---
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

// --- Komponen Individual Card Soal ---
const QuestionCard = ({ q }) => {
	const { hint, body, author } = parseSolutionData(q.solution);
	const [showHint, setShowHint] = useState(false);
	const [showSolution, setShowSolution] = useState(false);

	return (
		<div className="p-4 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300">
			{/* Header Soal */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-400 shadow-sm">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<span className="text-sm sm:text-base font-bold text-slate-700">
						{q.competitions?.name ||
							(q.source
								? `Sumber: ${q.source}`
								: "Arsip Soal")}
					</span>
				</div>

				<span className="w-fit inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100/50">
					<span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
					{q.topics?.name || "Tanpa Kategori"}
				</span>
			</div>

			{/* Teks Soal */}
			<div className="text-slate-800 leading-relaxed text-[13px] sm:text-base w-full overflow-x-auto overflow-y-hidden break-words pb-1 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-2 [&_.katex-display::-webkit-scrollbar]:h-1.5 [&_.katex-display::-webkit-scrollbar-thumb]:rounded-full [&_.katex-display::-webkit-scrollbar-thumb]:bg-slate-300 [&_.katex-display::-webkit-scrollbar-track]:bg-transparent">
				<ReactMarkdown
					remarkPlugins={[remarkMath]}
					rehypePlugins={[rehypeKatex]}>
					{q.content}
				</ReactMarkdown>
			</div>

			{/* Area Solusi & Hint */}
			{q.solution ? (
				<div className="mt-5 pt-4 border-t border-slate-100">
					<div className="flex flex-wrap items-center gap-2.5">
						{hint && (
							<button
								onClick={() => setShowHint(!showHint)}
								className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
									showHint
										? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
										: "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200/50"
								}`}>
								<span className="text-[14px]">💡</span>{" "}
								Hint
							</button>
						)}
						{body && (
							<button
								onClick={() =>
									setShowSolution(!showSolution)
								}
								className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
									showSolution
										? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
										: "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200/50"
								}`}>
								<span className="text-[14px]">▶</span>{" "}
								Solusi Penuh
							</button>
						)}
					</div>

					<div className="flex flex-col gap-3 mt-3">
						{showHint && hint && (
							<div className="p-3 sm:p-5 bg-amber-50/50 border border-amber-200/60 rounded-xl text-amber-900 text-[13px] sm:text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200 w-full overflow-x-auto overflow-y-hidden break-words pb-1 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-2 [&_.katex-display::-webkit-scrollbar]:h-1.5 [&_.katex-display::-webkit-scrollbar-thumb]:rounded-full [&_.katex-display::-webkit-scrollbar-thumb]:bg-amber-300 [&_.katex-display::-webkit-scrollbar-track]:bg-transparent">
								<ReactMarkdown
									remarkPlugins={[remarkMath]}
									rehypePlugins={[rehypeKatex]}>
									{hint}
								</ReactMarkdown>
							</div>
						)}

						{showSolution && body && (
							<div className="p-3 sm:p-5 bg-slate-50/50 border border-slate-200/60 rounded-xl text-slate-700 text-[13px] sm:text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200 w-full overflow-x-auto overflow-y-hidden break-words pb-1 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-2 [&_.katex-display::-webkit-scrollbar]:h-1.5 [&_.katex-display::-webkit-scrollbar-thumb]:rounded-full [&_.katex-display::-webkit-scrollbar-thumb]:bg-blue-300 [&_.katex-display::-webkit-scrollbar-track]:bg-transparent">
								{author && (
									<div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-slate-600 rounded-md text-[10px] sm:text-xs font-semibold border border-slate-200 shadow-sm">
										<svg
											className="w-3.5 h-3.5 text-slate-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
											/>
										</svg>
										Solusi oleh: {author}
									</div>
								)}
								<ReactMarkdown
									remarkPlugins={[remarkMath]}
									rehypePlugins={[rehypeKatex]}>
									{body}
								</ReactMarkdown>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
					<Link
						to={`/tambah-solusi/${q.id}`}
						className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200/60 transition-colors">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Tambahkan Solusi
					</Link>
				</div>
			)}
		</div>
	);
};

export default QuestionCard;