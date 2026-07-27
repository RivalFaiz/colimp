import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

// --- Komponen Custom Dropdown ---
const CustomSelect = ({ label, options, value, onChange, disabled }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			)
				setIsOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className="relative flex-1 min-w-[130px] max-w-xs"
			ref={dropdownRef}>
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
				} text-slate-700 text-sm font-medium py-2.5 px-3 sm:px-4 rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50`}>
				<span className="truncate">
					{disabled ? "Memuat..." : value}
				</span>
				<svg
					className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`}
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

export default function Pemenang() {
	const [activeTab, setActiveTab] = useState("ONMIPA");
	const [years, setYears] = useState([]);
	const [activeYear, setActiveYear] = useState("");
	const [activeBidang, setActiveBidang] = useState("Semua Bidang");

	const [allWinners, setAllWinners] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const bidangOptions = [
		"Semua Bidang",
		"Matematika",
		"Fisika",
		"Kimia",
		"Biologi",
	];
	const bidangIcons = {
		Matematika: "📐",
		Fisika: "⚛️",
		Kimia: "🧪",
		Biologi: "🧬",
	};

	useEffect(() => {
		async function fetchAllData() {
			setIsLoading(true);
			const { data, error } = await supabase
				.from("winners")
				.select("*")
				.order("year", { ascending: false })
				.limit(10000);

			if (!error && data) {
				setAllWinners(data);
				const uniqueYears = [
					...new Set(data.map((item) => item.year)),
				];
				setYears(uniqueYears);
				if (uniqueYears.length > 0) setActiveYear(uniqueYears[0]);
			}
			setIsLoading(false);
		}
		fetchAllData();
	}, []);
	const [tahunAwal, setTahunAwal] = useState(2006);

	useEffect(() => {
		const fetchTahunPalingAwal = async () => {
			const { data, error } = await supabase
				.from("winners")
				.select("year")
				.order("year", { ascending: true })
				.limit(1)
				.single();

			if (!error && data) {
				setTahunAwal(data.year);
			}
		};

		fetchTahunPalingAwal();
	}, []);

	const calculateTally = (dataList) => {
		const tally = {};
		dataList.forEach((w) => {
			const uni = w.university || "Tidak Diketahui";
			if (!tally[uni])
				tally[uni] = {
					name: uni,
					emas: 0,
					perak: 0,
					perunggu: 0,
					hm: 0,
					total: 0,
				};

			const medal = (w.medal || "").toLowerCase();
			if (medal.includes("emas")) tally[uni].emas += 1;
			else if (medal.includes("perak")) tally[uni].perak += 1;
			else if (medal.includes("perunggu")) tally[uni].perunggu += 1;
			else if (
				medal.includes("honorable") ||
				medal.includes("hm") ||
				medal.includes("afirmasi")
			)
				tally[uni].hm += 1;

			tally[uni].total += 1;
		});

		return Object.values(tally).sort((a, b) => {
			if (b.emas !== a.emas) return b.emas - a.emas;
			if (b.perak !== a.perak) return b.perak - a.perak;
			if (b.perunggu !== a.perunggu) return b.perunggu - a.perunggu;
			return b.hm - a.hm;
		});
	};

	// 1. Filter Pemenang per Tahun & Bidang
	const currentWinners = useMemo(() => {
		return allWinners.filter((w) => {
			if (activeTab === "ONMIPA") {
				const matchYear =
					w.year.toString() === activeYear?.toString();
				const matchBidang =
					activeBidang === "Semua Bidang" ||
					(w.category_name || "").toLowerCase() ===
						activeBidang.toLowerCase();
				return (
					w.competition_type === "ONMIPA" &&
					matchYear &&
					matchBidang
				);
			}
			return w.competition_type === activeTab;
		});
	}, [allWinners, activeTab, activeYear, activeBidang]);

	// 2. Klasemen Tahunan (Berdasarkan currentWinners)
	const yearlyRanking = useMemo(() => {
		if (activeTab !== "ONMIPA") return [];
		return calculateTally(currentWinners);
	}, [currentWinners, activeTab]);

	// 3. Klasemen Sepanjang Masa (Sudah cerdas: ikut filter Bidang, tapi mencakup SEMUA TAHUN)
	const allTimeRanking = useMemo(() => {
		if (activeTab !== "ONMIPA") return [];
		const allTimeFiltered = allWinners.filter((w) => {
			const matchTab = w.competition_type === "ONMIPA";
			const matchBidang =
				activeBidang === "Semua Bidang" ||
				(w.category_name || "").toLowerCase() ===
					activeBidang.toLowerCase();
			return matchTab && matchBidang;
		});
		return calculateTally(allTimeFiltered);
	}, [allWinners, activeTab, activeBidang]);

	const scrollToSection = (id) => {
		const el = document.getElementById(id);
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 80;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	const renderMedalGroup = (title, icon, colorClass, data) => {
		if (!data || data.length === 0) return null;
		const shortMedalName = title.includes("Emas")
			? "Emas"
			: title.includes("Perak")
				? "Perak"
				: title.includes("Perunggu")
					? "Perunggu"
					: "HM";

		return (
			<div className="mb-6 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
				<div className="flex items-center gap-2 mb-3 px-1">
					<span className="text-xl drop-shadow-sm">{icon}</span>
					<h3 className="text-[15px] font-semibold text-slate-700 tracking-wide">
						{title}
					</h3>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
					{data.map((winner, idx) => (
						<div
							key={idx}
							className={`p-3 sm:p-4 rounded-xl border ${colorClass} flex flex-col transition-all hover:shadow-md`}>
							<div className="flex justify-between items-start mb-2">
								<span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
									{shortMedalName} {idx + 1}
								</span>
								{title === "Medali Emas" &&
									idx === 0 && (
										<span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm">
											⭐ Absolute Winner
										</span>
									)}
							</div>
							<span className="font-semibold text-[14px] sm:text-[14.5px] tracking-tight leading-tight text-slate-800 mb-2">
								{winner.student_name}
							</span>
							<div className="flex items-start gap-1.5 opacity-80 text-[10.5px] sm:text-[11px] font-medium mt-auto pt-2 border-t border-black/5">
								<svg
									className="w-3.5 h-3.5 shrink-0 mt-[1px]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
								<span className="leading-snug">
									{winner.university}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		/* PERHATIKAN BARIS INI: px-1.5 adalah kunci jarak luarnya! */
		<div className="py-4 md:py-12 animate-in fade-in duration-500 max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
			<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 px-1 sm:px-0">
				<div>
					<Link
						to="/"
						className="text-xs sm:text-sm font-medium text-slate-400 hover:text-blue-600 flex items-center gap-2 w-fit mb-3 sm:mb-6 transition-colors">
						<span>←</span> Kembali ke Beranda
					</Link>
					<h1 className="text-[26px] sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">
						Database Prestasi
					</h1>
					<p className="text-slate-500 max-w-2xl leading-relaxed text-[13px] sm:text-base">
						Sistem informasi lengkap perolehan medali, daftar
						pemenang per bidang, dan klasemen universitas.
					</p>
				</div>
				<div className="hidden sm:flex shrink-0 items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-sm shadow-slate-900/20 text-white">
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

			<div className="flex gap-2 mb-6 sm:mb-8 border-b border-slate-200 pb-3 sm:pb-4 px-1.5 sm:px-0">
				{["ONMIPA", "Seleksi IMC"].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[13px] sm:text-sm font-bold transition-all ${
							activeTab === tab
								? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
								: "bg-slate-100 text-slate-600 hover:bg-slate-200"
						}`}>
						{tab}
					</button>
				))}
			</div>

			{/* PERHATIKAN BARIS INI JUGA: Kotak putihnya pakai rounded-xl untuk HP */}
			<div className="bg-white border border-slate-200 rounded-xl sm:rounded-3xl p-3 sm:p-8 min-h-[400px]">
				{isLoading ? (
					<div className="w-full h-full flex flex-col items-center justify-center space-y-4 py-20">
						<div className="w-8 h-8 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
						<p className="text-slate-400 text-sm">
							Menarik data dari database...
						</p>
					</div>
				) : allWinners.length === 0 ? (
					<div className="w-full p-6 sm:p-8 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center min-h-[200px] text-center">
						<span className="text-4xl mb-4">📭</span>
						<p className="text-slate-600 font-medium text-sm sm:text-base">
							Database masih kosong.
						</p>
					</div>
				) : (
					<div className="space-y-8 sm:space-y-10">
						<div className="flex flex-col gap-4 sm:gap-5 pb-4 sm:pb-5 border-b border-slate-100">
							{years.length > 0 && (
								<div className="flex gap-2 sm:gap-4 w-full">
									<CustomSelect
										label="Tahun Lomba"
										options={years}
										value={activeYear}
										onChange={setActiveYear}
									/>
									{activeTab === "ONMIPA" && (
										<CustomSelect
											label="Bidang Lomba"
											options={bidangOptions}
											value={activeBidang}
											onChange={
												setActiveBidang
											}
										/>
									)}
								</div>
							)}

							{activeTab === "ONMIPA" && (
								<div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-0">
									<span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mr-1 sm:mr-2 w-full sm:w-auto mb-1 sm:mb-0">
										Loncat Ke:
									</span>
									<button
										onClick={() =>
											scrollToSection(
												"daftar-pemenang",
											)
										}
										className="px-2.5 sm:px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] sm:text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-100/50">
										Daftar Pemenang
									</button>
									<button
										onClick={() =>
											scrollToSection(
												"klasemen-tahun",
											)
										}
										className="px-2.5 sm:px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[11px] sm:text-xs font-bold hover:bg-slate-200 transition-colors border border-slate-200/60">
										Klasemen {activeYear}
									</button>
									<button
										onClick={() =>
											scrollToSection(
												"klasemen-alltime",
											)
										}
										className="px-2.5 sm:px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-[11px] sm:text-xs font-bold hover:bg-amber-100 transition-colors border border-amber-200/50 flex items-center gap-1.5">
										<span className="text-[13px] sm:text-[14px]">
											👑
										</span>{" "}
										All-Time
									</button>
								</div>
							)}
						</div>

						{/* ======================================= */}
						{/* 1. DAFTAR PEMENANG PER BIDANG */}
						{/* ======================================= */}
						<div
							id="daftar-pemenang"
							className="scroll-mt-24 pt-2 sm:pt-4">
							{activeTab === "ONMIPA" ? (
								<div className="space-y-10 sm:space-y-12">
									{currentWinners.length === 0 ? (
										<p className="text-center text-slate-500 py-10 text-sm sm:text-base">
											Data tidak ditemukan
											untuk filter ini.
										</p>
									) : (
										bidangOptions
											.filter(
												(b) =>
													b !==
													"Semua Bidang",
											)
											.map((bidang) => {
												if (
													activeBidang !==
														"Semua Bidang" &&
													activeBidang !==
														bidang
												)
													return null;

												const winnersInBidang =
													currentWinners.filter(
														(w) =>
															(
																w.category_name ||
																""
															).toLowerCase() ===
															bidang.toLowerCase(),
													);
												if (
													winnersInBidang.length ===
													0
												)
													return null;

												const emas =
													winnersInBidang.filter(
														(w) =>
															(
																w.medal ||
																""
															)
																.toLowerCase()
																.includes(
																	"emas",
																),
													);
												const perak =
													winnersInBidang.filter(
														(w) =>
															(
																w.medal ||
																""
															)
																.toLowerCase()
																.includes(
																	"perak",
																),
													);
												const perunggu =
													winnersInBidang.filter(
														(w) =>
															(
																w.medal ||
																""
															)
																.toLowerCase()
																.includes(
																	"perunggu",
																),
													);
												const hm =
													winnersInBidang.filter(
														(w) =>
															(
																w.medal ||
																""
															)
																.toLowerCase()
																.includes(
																	"hm",
																) ||
															(
																w.medal ||
																""
															)
																.toLowerCase()
																.includes(
																	"honorable",
																) ||
															(
																w.medal ||
																""
															)
																.toLowerCase()
																.includes(
																	"afirmasi",
																),
													);

												return (
													<div
														key={
															bidang
														}
														className="relative">
														<div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-2.5 sm:pb-3 border-b border-slate-100">
															<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center text-base sm:text-lg border border-slate-200/60 shadow-sm">
																{bidangIcons[
																	bidang
																] ||
																	"📘"}
															</div>
															<h2 className="text-[17px] sm:text-[19px] font-medium text-slate-600 tracking-wide">
																Bidang{" "}
																<span className="font-bold text-slate-800">
																	{
																		bidang
																	}
																</span>
															</h2>
														</div>

														<div className="pl-1 sm:pl-4 border-l-2 sm:border-l-[3px] border-slate-50 space-y-6 sm:space-y-7">
															{renderMedalGroup(
																"Medali Emas",
																"🥇",
																"bg-amber-50/50 border-amber-200/60 shadow-amber-100/20",
																emas,
															)}
															{renderMedalGroup(
																"Medali Perak",
																"🥈",
																"bg-slate-50 border-slate-200/60 shadow-slate-100/20",
																perak,
															)}
															{renderMedalGroup(
																"Medali Perunggu",
																"🥉",
																"bg-orange-50/50 border-orange-200/50 shadow-orange-100/20",
																perunggu,
															)}
															{renderMedalGroup(
																"Honorable Mention",
																"🎖️",
																"bg-blue-50/50 border-blue-200/60 shadow-blue-100/20",
																hm,
															)}
														</div>
													</div>
												);
											})
									)}
								</div>
							) : (
								<div className="overflow-hidden rounded-xl border border-slate-200">
									<div className="overflow-x-auto">
										<table className="w-full text-left border-collapse min-w-[500px]">
											<thead className="bg-slate-50/80">
												<tr className="border-b border-slate-200 text-slate-500 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
													<th className="py-3 sm:py-4 px-2 sm:px-5">
														No
													</th>
													<th className="py-3 sm:py-4 px-2 sm:px-5">
														Nama
														Mahasiswa
													</th>
													<th className="py-3 sm:py-4 px-2 sm:px-5">
														Asal
														Universitas
													</th>
													<th className="py-3 sm:py-4 px-2 sm:px-5">
														Status
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-slate-100 text-[11.5px] sm:text-sm text-slate-700">
												{currentWinners.map(
													(w, index) => (
														<tr
															key={
																index
															}
															className="hover:bg-slate-50 transition-colors">
															<td className="py-3 sm:py-4 px-2 sm:px-5 font-semibold text-slate-400">
																{index +
																	1}
															</td>
															<td className="py-3 sm:py-4 px-2 sm:px-5 font-bold text-slate-800">
																{
																	w.student_name
																}
															</td>
															<td className="py-3 sm:py-4 px-2 sm:px-5 text-slate-500 font-medium">
																{
																	w.university
																}
															</td>
															<td className="py-3 sm:py-4 px-2 sm:px-5">
																<span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 font-bold rounded-md text-[10px] sm:text-[11px] border border-blue-100 uppercase tracking-wider whitespace-nowrap">
																	{
																		w.medal
																	}
																</span>
															</td>
														</tr>
													),
												)}
											</tbody>
										</table>
									</div>
								</div>
							)}
						</div>

						{/* ======================================= */}
						{/* 2. KLASEMEN UNIVERSITAS TAHUNAN */}
						{/* ======================================= */}
						{activeTab === "ONMIPA" &&
							yearlyRanking.length > 0 && (
								<div
									id="klasemen-tahun"
									className="scroll-mt-24 mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200/60">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
										<div>
											<h2 className="text-[17px] sm:text-xl font-semibold text-slate-700 tracking-wide flex flex-wrap items-center gap-1.5 sm:gap-2.5">
												<span className="text-xl sm:text-2xl">
													🏛️
												</span>{" "}
												Klasemen{" "}
												<span className="font-bold text-slate-900">
													Tahun{" "}
													{activeYear}
												</span>
												<span className="text-[9px] sm:text-[11px] font-bold bg-slate-100 text-slate-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider ml-1 border border-slate-200">
													{activeBidang ===
													"Semua Bidang"
														? "Semua Bidang"
														: `Bidang ${activeBidang}`}
												</span>
											</h2>
										</div>
									</div>

									<div className="overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
										<div className="overflow-x-auto">
											<table className="w-full text-left border-collapse min-w-[600px]">
												<thead className="bg-slate-800 text-white">
													<tr className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
														<th className="py-2.5 sm:py-4 px-2 sm:px-5 w-10 sm:w-16 text-center border-r border-slate-700">
															Rank
														</th>
														<th className="py-2.5 sm:py-4 px-2.5 sm:px-5 border-r border-slate-700">
															Nama
															Universitas
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-slate-700 text-amber-300">
															Emas
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-slate-700 text-slate-300">
															Perak
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-slate-700 text-orange-300">
															Prg
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-slate-700 text-blue-300">
															HM
														</th>
														<th className="py-2.5 sm:py-4 px-2 sm:px-5 text-center font-extrabold">
															Total
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-slate-200 text-[11px] sm:text-sm font-medium">
													{yearlyRanking.map(
														(
															uni,
															idx,
														) => (
															<tr
																key={
																	idx
																}
																className={`transition-colors ${idx === 0 ? "bg-amber-50" : idx === 1 ? "bg-slate-50" : idx === 2 ? "bg-orange-50/30" : "hover:bg-slate-50"}`}>
																<td className="py-2 sm:py-3 px-1.5 sm:px-5 text-center border-r border-slate-100">
																	{idx ===
																	0 ? (
																		<span className="text-base sm:text-xl">
																			🏆
																		</span>
																	) : idx ===
																	  1 ? (
																		<span className="text-base sm:text-xl text-slate-400">
																			🥈
																		</span>
																	) : idx ===
																	  2 ? (
																		<span className="text-base sm:text-xl text-orange-600/80">
																			🥉
																		</span>
																	) : (
																		<span className="text-slate-400 font-bold">
																			{idx +
																				1}
																		</span>
																	)}
																</td>
																<td
																	className={`py-2 sm:py-3 px-2.5 sm:px-5 border-r border-slate-100 ${idx < 3 ? "font-bold text-slate-900" : "text-slate-700"}`}>
																	{
																		uni.name
																	}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center font-bold text-slate-800 border-r border-slate-100 bg-amber-50/30">
																	{uni.emas >
																	0
																		? uni.emas
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center font-semibold text-slate-600 border-r border-slate-100 bg-slate-50/50">
																	{uni.perak >
																	0
																		? uni.perak
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center font-semibold text-orange-700/80 border-r border-slate-100 bg-orange-50/10">
																	{uni.perunggu >
																	0
																		? uni.perunggu
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center text-blue-700/80 border-r border-slate-100 bg-blue-50/30">
																	{uni.hm >
																	0
																		? uni.hm
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-2 sm:px-5 text-center font-extrabold text-slate-900 bg-slate-50/80">
																	{
																		uni.total
																	}
																</td>
															</tr>
														),
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}

						{/* ======================================= */}
						{/* 3. KLASEMEN SEPANJANG MASA (ALL-TIME) */}
						{/* ======================================= */}
						{activeTab === "ONMIPA" &&
							allTimeRanking.length > 0 && (
								<div
									id="klasemen-alltime"
									className="scroll-mt-24 mt-10 sm:mt-16 pt-8 sm:pt-10 border-t-[3px] border-amber-100">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
										<div>
											<h2 className="text-[17px] sm:text-xl font-semibold text-amber-800 tracking-wide flex flex-wrap items-center gap-1.5 sm:gap-2.5">
												<span className="text-xl sm:text-2xl">
													👑
												</span>{" "}
												Klasemen{" "}
												<span className="font-extrabold text-amber-900">
													Sepanjang Masa
												</span>
												<span className="text-[9px] sm:text-[11px] font-bold bg-amber-200/50 text-amber-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider ml-1 border border-amber-300/30">
													{activeBidang ===
													"Semua Bidang"
														? "Semua Bidang"
														: `Bidang ${activeBidang}`}
												</span>
											</h2>
											<p className="text-slate-500 text-xs sm:text-sm mt-2">
												Akumulasi total
												medali ONMIPA dari
												seluruh tahun
												kompetisi yang
												tercatat sejak{" "}
												{tahunAwal}
											</p>
										</div>
									</div>

									<div className="overflow-hidden rounded-xl sm:rounded-2xl border border-amber-200/60 shadow-md shadow-amber-500/10">
										<div className="overflow-x-auto">
											<table className="w-full text-left border-collapse min-w-[600px]">
												<thead className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
													<tr className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
														<th className="py-2.5 sm:py-4 px-2 sm:px-5 w-10 sm:w-16 text-center border-r border-amber-800/30">
															Rank
														</th>
														<th className="py-2.5 sm:py-4 px-2.5 sm:px-5 border-r border-amber-800/30">
															Nama
															Universitas
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-amber-800/30 text-amber-200">
															Emas
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-amber-800/30 text-slate-200">
															Perak
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-amber-800/30 text-orange-200">
															Prg
														</th>
														<th className="py-2.5 sm:py-4 px-1.5 sm:px-4 text-center border-r border-amber-800/30 text-blue-200">
															HM
														</th>
														<th className="py-2.5 sm:py-4 px-2 sm:px-5 text-center font-extrabold">
															Total
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-amber-100/50 text-[11px] sm:text-sm font-medium">
													{allTimeRanking.map(
														(
															uni,
															idx,
														) => (
															<tr
																key={
																	idx
																}
																className={`transition-colors ${idx === 0 ? "bg-amber-100/40" : idx === 1 ? "bg-slate-50" : idx === 2 ? "bg-orange-50/30" : "bg-white hover:bg-slate-50"}`}>
																<td className="py-2 sm:py-3 px-1.5 sm:px-5 text-center border-r border-amber-100/50">
																	{idx ===
																	0 ? (
																		<span className="text-base sm:text-xl">
																			🏆
																		</span>
																	) : idx ===
																	  1 ? (
																		<span className="text-base sm:text-xl text-slate-400">
																			🥈
																		</span>
																	) : idx ===
																	  2 ? (
																		<span className="text-base sm:text-xl text-orange-600/80">
																			🥉
																		</span>
																	) : (
																		<span className="text-slate-500 font-bold">
																			{idx +
																				1}
																		</span>
																	)}
																</td>
																<td
																	className={`py-2 sm:py-3 px-2.5 sm:px-5 border-r border-amber-100/50 ${idx < 3 ? "font-bold text-slate-900" : "text-slate-700"}`}>
																	{
																		uni.name
																	}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center font-extrabold text-amber-700 border-r border-amber-100/50 bg-amber-50/50">
																	{uni.emas >
																	0
																		? uni.emas
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center font-bold text-slate-600 border-r border-amber-100/50 bg-slate-50/50">
																	{uni.perak >
																	0
																		? uni.perak
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center font-bold text-orange-700 border-r border-amber-100/50 bg-orange-50/30">
																	{uni.perunggu >
																	0
																		? uni.perunggu
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-1.5 sm:px-4 text-center font-bold text-blue-700 border-r border-amber-100/50 bg-blue-50/30">
																	{uni.hm >
																	0
																		? uni.hm
																		: "-"}
																</td>
																<td className="py-2 sm:py-3 px-2 sm:px-5 text-center font-black text-slate-900 bg-amber-50/30">
																	{
																		uni.total
																	}
																</td>
															</tr>
														),
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
					</div>
				)}
			</div>
		</div>
	);
}
