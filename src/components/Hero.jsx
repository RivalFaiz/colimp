export default function Hero() {
	return (
		<section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
			{/* Kolom Kiri: Teks */}
			<div className="flex-1 space-y-6">
				<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm text-sm text-slate-500">
					<span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
					@aduhmath present
				</div>

				<h1 className="text-5xl md:text-7xl font-light text-slate-800 leading-tight">
					Powered by <br />
					<span className="font-bold text-blue-600">
						@aduhmath
					</span>
				</h1>

				<p className="text-slate-500 max-w-lg leading-relaxed text-sm md:text-base">
					Beberapa soal belum memiliki solusi. Anda bisa
					berkontribusi dengan mengirimkan solusi melalui email
					ke{" "}
					<span className="text-slate-700 font-medium">
						aduhmath@gmail.com
					</span>{" "}
					beserta kode soal (dapat berupa file .tex, gambar, atau
					format lainnya yang jelas).
				</p>
			</div>

			{/* Kolom Kanan: Tempat Gambar (Disembunyikan di layar kecil) */}
			<div className="hidden md:flex flex-1 w-full">
				<div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 aspect-[4/3] w-full flex items-center justify-center overflow-hidden relative min-h-[300px]">
					{/* Nanti tag div ini bisa diganti dengan <img src="/nama-gambar.png" className="object-cover w-full h-full rounded-2xl" /> */}
					<div className="absolute inset-0 bg-slate-50 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 m-4 rounded-2xl">
						[ Masukkan Gambar Estetik Di Sini ]
					</div>
				</div>
			</div>
		</section>
	);
}
