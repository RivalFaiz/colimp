import { Link } from "react-router-dom";

const CategoryCard = ({ title, description, to, icon }) => (
	<Link
		to={to}
		className="group block p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
		<div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
			<span className="text-xl">{icon}</span>
		</div>

		<h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
			{title}
		</h3>

		<p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
			{description}
		</p>

		<div className="text-sm font-semibold flex items-center gap-2 text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
			Buka koleksi{" "}
			<span className="text-lg group-hover:translate-x-1 transition-transform">
				→
			</span>
		</div>
	</Link>
);

export default function Categories() {
	const data = [
		{
			title: "ONMIPA",
			description:
				"Kumpulan soal ONMIPA yang bisa dijelajahi berdasarkan tahun, bidang, dan tahap.",
			to: "/onmipa",
			icon: "🏆",
		},
		{
			title: "Per IMC-an",
			description: "Eksplorasi soal seleksi internal, pelatnas IMC, dan kompetisi eksklusif lainnya.",
			icon: "🏛️", // Atau gunakan SVG jika kamu sudah menggunakan SVG di komponenmu
			to: "/IMC",
		},
		{
			title: "Soal Menarik",
			description:
				"Kumpulan soal pilihan dari pembinaan, IMC, dan sumber lain yang layak dipelajari.",
			to: "/soal-menarik",
			icon: "✨",
		},
		{
			title: "Semua Soal",
			description:
				"Jelajahi seluruh database soal matematika tanpa batasan kategori spesifik.",
			to: "/semua-soal",
			icon: "📚",
		},
	];

	return (
		<section id="kategori" className="py-12 md:py-20">
			{/* Banner Hall of Fame (Elegan Blue) */}
			<div className="mb-10 relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-8 sm:p-10 text-white shadow-lg shadow-blue-900/20 group border border-slate-800">
				{/* Efek Cahaya Halus */}
				<div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
				<div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-2xl"></div>

				<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div className="flex-1">
						<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md border border-white/10 shadow-sm">
							<span className="text-sm">🏛️</span> Pusat
							Data Prestasi
						</div>
						<h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-white">
							Hall of Fame & Klasemen
						</h2>
						<p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
							Jelajahi *database* lengkap peraih medali
							ONMIPA (Matematika, Fisika, Kimia, Biologi),
							pantau klasemen universitas, dan lihat daftar
							kontingen resmi Indonesia.
						</p>
					</div>

					<Link
						to="/pemenang"
						className="shrink-0 group/btn bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-blue-500/25 flex items-center justify-center gap-2 w-full md:w-auto">
						Buka Database
						<svg
							className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
			<div className="mb-10">
				<h4 className="text-blue-600 font-semibold tracking-widest text-xs uppercase mb-2">
					Koleksi Utama
				</h4>
				<h2 className="text-3xl font-bold text-slate-900">
					Mulai jelajahi dari kategori besar
				</h2>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{data.map((item, index) => (
					<CategoryCard key={index} {...item} />
				))}
			</div>
		</section>
	);
}
