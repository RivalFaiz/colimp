import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
	const location = useLocation(); // Untuk mendeteksi halaman aktif

	// Helper untuk styling link aktif
	const getLinkClass = (path) => {
		const isActive = location.pathname === path;
		return `px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
			isActive
				? "bg-blue-50 text-blue-700"
				: "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
		}`;
	};

	return (
		<nav className="bg-[#f8fafc] py-4 border-b border-slate-200/60 w-full z-50">
			<div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
				{/* LOGO SECTION */}
				<Link to="/" className="flex items-center gap-3 group">
					<div className="w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white font-serif italic text-lg font-bold shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
						<span>∫</span>
					</div>
					<span className="text-xl font-extrabold text-slate-800 tracking-tight">
						COLIMP<span className="text-blue-600">.</span>
					</span>
				</Link>

				{/* MENU LINKS */}
				<div className="flex items-center space-x-1 sm:space-x-2">
					<Link to="/" className={getLinkClass("/")}>
						Beranda
					</Link>
					<Link
						to="/tentang"
						className={getLinkClass("/tentang")}>
						Tentang
					</Link>

					{/* Tombol Spesial Hall of Fame */}
					<div className="pl-2 ml-2 border-l border-slate-200 hidden sm:block">
						<Link
							to="/pemenang"
							className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 hover:shadow-sm border border-amber-200/60 transition-all duration-200">
							<span>🏆</span> Hall of Fame
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
