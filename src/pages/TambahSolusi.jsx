import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const TEMPLATE_SOLUSI = `**Hint:** *Tulis petunjuk singkat di sini (opsional)*\n\n---\n\nTulis langkah-langkah solusi lengkap di sini. Gunakan $ untuk inline math, atau $$ untuk blok math:\n\n$$\n\\int_0^1 x^2 \\, dx\n$$\n`;

// Batas maksimal karakter untuk solusi
const MAX_CHARS = 4000;

export default function TambahSolusi() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [question, setQuestion] = useState(null);
	const [solutionInput, setSolutionInput] = useState("");
	const [authorInput, setAuthorInput] = useState(""); // State baru untuk nama kontributor

	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		async function fetchQuestion() {
			setIsLoading(true);
			const { data, error } = await supabase
				.from("questions")
				.select("*, competitions(name), topics(name)")
				.eq("id", id)
				.single();

			if (!error && data) {
				setQuestion(data);

				// Jika sebelumnya sudah ada solusi di tabel questions (misal sedang mode edit)
				if (data.solution) {
					// Coba pisahkan nama author dari data solusi lama jika ada
					const byRegex = /\*\*Solusi oleh:\*\*\s*(.*)/;
					const match = data.solution.match(byRegex);
					if (match) {
						setAuthorInput(match[1].trim());
						setSolutionInput(
							data.solution.replace(match[0], "").trim(),
						);
					} else {
						setSolutionInput(data.solution);
					}
				} else {
					setSolutionInput(TEMPLATE_SOLUSI);
				}
			}
			setIsLoading(false);
		}
		fetchQuestion();
	}, [id]);

	const handleSave = async () => {
		if (!solutionInput.trim()) return;
		setIsSubmitting(true);

		// Gabungkan nama author dengan solusi agar formatnya sesuai dengan pembaca di Onmipa.jsx
		let finalSolution = solutionInput.trim();
		if (authorInput.trim()) {
			finalSolution = `**Solusi oleh:** ${authorInput.trim()}\n\n${finalSolution}`;
		}

		// Simpan ke tabel pending_solutions
		const { error } = await supabase.from("pending_solutions").insert({
			question_id: id,
			solution: finalSolution,
			status: "pending",
		});

		setIsSubmitting(false);

		if (!error) {
			alert("Solusi berhasil dikirim dan menunggu persetujuan admin.");
			navigate(-1);
		} else {
			alert("Gagal mengirim solusi: " + error.message);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
			</div>
		);
	}

	if (!question)
		return (
			<div className="py-12 text-center text-slate-500">
				Soal tidak ditemukan.
			</div>
		);

	// Teks gabungan murni untuk keperluan Live Preview di sebelah kanan
	const previewText = authorInput.trim()
		? `**Solusi oleh:** ${authorInput.trim()}\n\n${solutionInput}`
		: solutionInput;

	return (
		<div className="py-6 md:py-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500 flex flex-col h-screen">
			{/* Header & Tombol Navigasi */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
				<div>
					<button
						onClick={() => navigate(-1)}
						className="text-sm font-medium text-slate-400 hover:text-blue-600 flex items-center gap-2 mb-2 w-fit">
						<span>←</span> Batal & Kembali
					</button>
					<h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
						Kontribusi Solusi
						<span className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg tracking-wider">
							{question.kode_soal || "SOAL"}
						</span>
					</h1>
				</div>

				<button
					onClick={handleSave}
					disabled={isSubmitting || !solutionInput.trim()}
					className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2">
					{isSubmitting
						? "Mengirim..."
						: "Kirim untuk Persetujuan"}
				</button>
			</div>

			{/* Kotak Teks Soal (Context) */}
			<div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 shrink-0 shadow-sm overflow-x-auto">
				<div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
					Teks Soal ({question.competitions?.name} •{" "}
					{question.topics?.name})
				</div>
				<div className="text-slate-800 text-sm">
					<ReactMarkdown
						remarkPlugins={[remarkMath]}
						rehypePlugins={[rehypeKatex]}>
						{question.content}
					</ReactMarkdown>
				</div>
			</div>

			{/* Split View Editor & Preview */}
			<div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[450px]">
				{/* Panel Kiri: Editor */}
				<div className="flex flex-col border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
					<div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
						<span className="text-sm font-bold text-slate-700">
							Editor Solusi
						</span>

						{/* Input Nama Kontributor */}
						<div className="flex items-center gap-2">
							<label className="text-xs font-medium text-slate-500">
								By:
							</label>
							<input
								type="text"
								value={authorInput}
								onChange={(e) =>
									setAuthorInput(e.target.value)
								}
								placeholder="Nama / Username (Opsional)"
								className="text-sm border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full sm:w-48"
								maxLength={50}
							/>
						</div>
					</div>

					{/* Textarea Markdown */}
					<div className="flex-1 flex flex-col relative">
						<textarea
							value={solutionInput}
							onChange={(e) =>
								setSolutionInput(e.target.value)
							}
							maxLength={MAX_CHARS}
							className="flex-1 w-full p-5 pb-8 resize-none focus:outline-none text-slate-700 font-mono text-sm leading-relaxed"
							spellCheck="false"
						/>
						{/* Indikator Karakter */}
						<div
							className={`absolute bottom-2 right-4 text-xs font-medium ${
								solutionInput.length >= MAX_CHARS
									? "text-red-500"
									: "text-slate-400"
							}`}>
							{solutionInput.length} / {MAX_CHARS} karakter
						</div>
					</div>
				</div>

				{/* Panel Kanan: Live Preview */}
				<div className="flex flex-col border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
					<div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
						<span className="text-sm font-bold text-slate-700">
							Live Preview
						</span>
					</div>
					<div className="flex-1 p-5 overflow-y-auto bg-[#fafafa]">
						{solutionInput ? (
							<div className="text-slate-800 text-sm leading-relaxed">
								<ReactMarkdown
									remarkPlugins={[remarkMath]}
									rehypePlugins={[rehypeKatex]}>
									{previewText}
								</ReactMarkdown>
							</div>
						) : (
							<div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
								Preview akan muncul di sini...
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
