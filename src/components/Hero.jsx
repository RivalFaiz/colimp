export default function Hero() {
	return (
		<section className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center text-center px-4">
			{/* --- Background Pattern Estetik (Titik-titik halus ala buku matematika) --- */}
			<div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

			{/* --- Efek Glow Lembut di Latar Belakang --- */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[400px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

			<div className="relative z-10 max-w-4xl flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
				{/* --- Badge Premium --- */}
				<div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-md cursor-default">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
					</span>
					<span className="text-xs font-semibold text-slate-600 tracking-widest uppercase">
						@aduhmath present
					</span>
				</div>

				{/* --- Main Title (Tipis, Elegan, dan Modern) --- */}
				<h1 className="text-6xl md:text-8xl lg:text-[100px] font-light tracking-tight text-slate-800 pb-2">
					Colimp
					<span className="text-blue-600 font-medium">.</span>
				</h1>

				{/* --- Deskripsi --- */}
				<p className="text-slate-500 leading-relaxed text-base md:text-xl max-w-2xl mx-auto font-normal">
					Kumpulan soal terlengkap untuk Olimpiade Matematika
					Indonesia. Wadah untuk belajar, berlatih, dan
					berkontribusi.
				</p>

				{/* --- Tombol Aksi (Membuatnya tidak terlalu simple) --- */}
				

				{/* --- Mini Highlight Features --- */}
				<div className="pt-10 flex flex-wrap justify-center gap-6 md:gap-12 text-slate-400 text-xs sm:text-sm font-medium">
					<div className="flex items-center gap-2">
						<svg
							className="w-5 h-5 text-blue-500/70"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						ONMIPA
					</div>
					<div className="flex items-center gap-2">
						<svg
							className="w-5 h-5 text-blue-500/70"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						Seleksi IMC IDN
					</div>
					<div className="flex items-center gap-2">
						<svg
							className="w-5 h-5 text-blue-500/70"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						Database Medalis
					</div>
				</div>
			</div>
		</section>
	);
}
