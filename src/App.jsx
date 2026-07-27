import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Onmipa from "./pages/Onmipa";

// Jangan lupa import komponennya di bagian atas
import TambahSolusi from './pages/TambahSolusi'

// Di dalam konfigurasi Routes:

import SoalMenarik from "./pages/SoalMenarik";

// Di dalam <Routes>:


import SemuaSoal from "./pages/SemuaSoal";
import SoalKhusus from './pages/SoalKhusus';
import DetailSoalKhusus from './pages/DetailSoalKhusus';
import Pemenang from "./pages/Pemenang";

// Di dalam <Routes>:

// Di dalam <Routes> kamu, tambahkan:


// Di dalam <Routes> tambahkan:

// Komponen sementara untuk halaman yang belum kita buat file khususnya
const LombaPT = () => (
	<div className="py-10 text-center">
		<h2 className="text-2xl font-bold">Halaman Lomba PT</h2>
	</div>
);


const Tentang = () => (
	<div className="py-10 text-center">
		<h2 className="text-2xl font-bold">Tentang COLIMP</h2>
	</div>
);

function App() {
	return (
		<div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100">
			<Navbar />

			<main className="max-w-[1400px] mx-auto px-6 md:px-12">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/onmipa" element={<Onmipa />} />
					<Route path="/lomba-pt" element={<LombaPT />} />
					<Route
						path="/soal-menarik"
						element={<SoalMenarik />}
					/>
					<Route path="/semua-soal" element={<SemuaSoal />} />
					<Route path="/tentang" element={<Tentang />} />
					<Route
						path="/tambah-solusi/:id"
						element={<TambahSolusi />}
					/>
					<Route path="/semua-soal" element={<SemuaSoal />} />;
					<Route path="/IMC" element={<SoalKhusus />} />
					<Route
						path="/IMC/:id"
						element={<DetailSoalKhusus />}
					/>
					<Route path="/pemenang" element={<Pemenang />} />;
				</Routes>
			</main>
		</div>
	);
}

export default App;
