import { Link } from "react-router-dom";

export default function SoalKhusus() {
	// Array Data: Sangat mudah ditambah atau diedit
	const listKategori = [
		{
			id: "seleksi-imc",
			title: "Seleksi IMC Indonesia",
			desc: "Arsip eksklusif soal seleksi tingkat nasional untuk pembentukan tim International Mathematics Competition.",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
					/>
				</svg>
			),
			theme: "text-blue-600 bg-blue-50/50 border-blue-100 hover:border-blue-300 hover:shadow-blue-500/10 hover:bg-blue-50",
		},
		{
			id: "pelatnas-imc",
			title: "Pelatnas IMC",
			desc: "Kumpulan soal latihan intensif dan ujian evaluasi selama masa Pemusatan Latihan Nasional IMC.",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M12 14l9-5-9-5-9 5 9 5z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M12 14v6"
					/>
				</svg>
			),
			theme: "text-emerald-600 bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-500/10 hover:bg-emerald-50",
		},
		{
			id: "simulasi-imc",
			title: "Simulasi IMC",
			desc: "Arsip soal-soal tryout dan simulasi komprehensif yang dirancang khusus untuk adaptasi format IMC.",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
			),
			theme: "text-amber-600 bg-amber-50/50 border-amber-100 hover:border-amber-300 hover:shadow-amber-500/10 hover:bg-amber-50",
		},
		{
			id: "koala-itb",
			title: "Koala ITB",
			desc: "Arsip soal Kompetisi Aljabar dan Analisis (Koala) bergengsi yang diselenggarakan oleh Institut Teknologi Bandung.",
			icon: (
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
					/>
				</svg>
			),
			theme: "text-purple-600 bg-purple-50/50 border-purple-100 hover:border-purple-300 hover:shadow-purple-500/10 hover:bg-purple-50",
		},
	];

	return (
		<div className="py-12 md:py-16 animate-in fade-in duration-700 min-h-screen relative overflow-hidden">
			{/* Latar Belakang Dekoratif Elegan */}
			<div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-50 to-white -z-10"></div>
			<div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Navigasi Kembali */}
				{/* Header Section dengan Logo di Kanan */}
				<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-12">
					<div>
						<Link
							to="/"
							className="text-sm font-medium text-slate-400 hover:text-blue-600 flex items-center gap-2 w-fit mb-6 transition-colors">
							<span>←</span> Kembali ke Beranda
						</Link>
						<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
							Koleksi Soal Khusus
						</h1>
						<p className="text-slate-500 max-w-2xl leading-relaxed text-sm md:text-base">
							Jelajahi berbagai arsip problem solving
							tingkat tinggi mulai dari seleksi internal,
							pelatnas, hingga kompetisi prestisius.
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
							<path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
						</svg>
					</div>
				</div>



				{/* Grid List Menu - Desain Kartu Premium */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{listKategori.map((item) => (
						<Link
							key={item.id}
							to={`/soal-khusus/${item.id}`}
							className={`group relative flex flex-col p-8 bg-white border border-slate-200/80 rounded-[2rem] transition-all duration-300 hover:-translate-y-1 ${item.theme
								.split(" ")
								.filter(
									(c) =>
										c.startsWith(
											"hover:shadow",
										) ||
										c.startsWith("hover:border"),
								)
								.join(" ")} shadow-sm`}>
							<div className="relative z-10 flex flex-col h-full">
								{/* Baris Header Kartu */}
								<div className="flex items-start justify-between mb-6">
									<div
										className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${item.theme
											.split(" ")
											.filter(
												(c) =>
													!c.startsWith(
														"hover:",
													),
											)
											.join(" ")}`}>
										{item.icon}
									</div>
									<div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300 shadow-sm">
										<svg
											className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2.5"
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/>
										</svg>
									</div>
								</div>

								{/* Teks Konten */}
								<h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
									{item.title}
								</h2>
								<p className="text-slate-500 text-sm md:text-base leading-relaxed flex-1">
									{item.desc}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
