const n="Masalah Milenium",i="US$1.000.000 dari Clay Mathematics Institute",m=[{slug:"hipotesis-riemann",nama:"Hipotesis Riemann",namaEn:"Riemann Hypothesis",label:[n,"Teori Bilangan"],tahun:1859,penggagas:"Bernhard Riemann",hadiah:i,ringkas:"Semua nol taktrivial fungsi zeta Riemann terletak pada satu garis lurus. Kalau benar, sebaran bilangan prima jadi jauh lebih terkendali.",pernyataan:String.raw`Fungsi zeta Riemann didefinisikan untuk $\operatorname{Re}(s) > 1$ sebagai

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^{s}} = \frac{1}{1^{s}} + \frac{1}{2^{s}} + \frac{1}{3^{s}} + \cdots
$$

lalu diperluas ke hampir seluruh bidang kompleks lewat kelanjutan analitik. Fungsi ini nol di $s = -2, -4, -6, \ldots$ — disebut **nol trivial**. Sisanya, **nol taktrivial**, semuanya terletak di jalur $0 < \operatorname{Re}(s) < 1$ yang disebut jalur kritis.

**Hipotesis Riemann:** setiap nol taktrivial $\zeta(s)$ memenuhi

$$
\operatorname{Re}(s) = \tfrac{1}{2}.
$$

Dengan kata lain, semua nol itu berbaris rapi pada satu garis vertikal.`,latar:String.raw`Riemann menuliskannya pada 1859 dalam satu-satunya makalahnya tentang teori bilangan, *Über die Anzahl der Primzahlen unter einer gegebenen Grösse*. Ia menyebutnya sekadar dugaan yang sangat mungkin benar, lalu melanjutkan ke topik lain karena tujuan utamanya adalah menghitung banyaknya bilangan prima.

Kaitannya dengan bilangan prima datang dari identitas Euler:

$$
\zeta(s) = \prod_{p \text{ prima}} \frac{1}{1 - p^{-s}},
$$

yang mengubah penjumlahan atas semua bilangan asli menjadi perkalian atas semua bilangan prima. Lewat rumus ini, letak nol $\zeta$ mengendalikan seberapa jauh banyaknya prima menyimpang dari perkiraannya.

Hipotesis ini masuk daftar 23 masalah Hilbert pada 1900, dan seratus tahun kemudian masuk lagi ke daftar tujuh Masalah Milenium.`,contoh:String.raw`Misalkan $\pi(x)$ adalah banyaknya bilangan prima yang tidak melebihi $x$. Teorema bilangan prima mengatakan $\pi(x)$ dekat dengan integral logaritmik $\operatorname{Li}(x)$. Pertanyaannya: sedekat apa?

Hipotesis Riemann setara dengan pernyataan

$$
\pi(x) = \operatorname{Li}(x) + O\!\left(\sqrt{x}\,\log x\right).
$$

Sebagai gambaran, untuk $x = 10^{16}$:

- $\pi(x) = 279\,238\,341\,033\,925$
- $\operatorname{Li}(x) \approx 279\,238\,344\,248\,557$

Selisihnya sekitar $3{,}2$ juta — terdengar besar, padahal itu hanya sekitar sepersejuta persen dari nilainya, dan masih jauh lebih kecil daripada $\sqrt{x}\log x \approx 3{,}7 \times 10^{9}$. Pola sekecil inilah yang ingin dijamin oleh Hipotesis Riemann untuk **semua** $x$, bukan cuma untuk yang sudah sempat dihitung.

Empat nol taktrivial pertama berada di

$$
s = \tfrac12 \pm 14{,}134725i, \qquad s = \tfrac12 \pm 21{,}022040i,
$$

dan seterusnya. Bagian realnya selalu $\tfrac12$ sejauh yang pernah diperiksa.`,kemajuan:String.raw`- **1896** — Hadamard dan de la Vallée Poussin membuktikan tidak ada nol dengan $\operatorname{Re}(s) = 1$. Dari sini lahir teorema bilangan prima.
- **1914** — Hardy membuktikan ada tak hingga banyak nol yang memang terletak pada garis $\operatorname{Re}(s) = \tfrac12$. Sayangnya "tak hingga" belum berarti "semua".
- **1989** — Conrey membuktikan sedikitnya $2/5$ bagian dari nol taktrivial ada di garis itu.
- **2004** — Gourdon memeriksa $10^{13}$ nol pertama dengan komputer. Semuanya di garis kritis.

Jadi yang sudah diketahui: sangat banyak nol ada di garis itu, dan tidak ada satu pun tandingan yang pernah ditemukan. Yang belum ada: alasan kenapa tidak boleh ada nol yang menyimpang, walau hanya satu.`,kenapaSulit:String.raw`Memeriksa satu per satu tidak akan pernah cukup, karena nolnya tak hingga banyak. Yang dibutuhkan adalah argumen yang berlaku untuk semuanya sekaligus, dan sampai sekarang belum ada kerangka yang cukup kuat untuk itu.

Sebagian matematikawan menduga jawabannya ada di tempat yang tak terduga: pola jarak antarnol ternyata mirip pola nilai eigen matriks acak dalam fisika kuantum. Kalau ada operator yang nilai eigennya persis nol-nol tersebut, hipotesis ini bisa jadi selesai dengan sendirinya. Operator itu belum ditemukan.`,bacaan:[{judul:"Clay Mathematics Institute — Riemann Hypothesis",url:"https://www.claymath.org/millennium/riemann-hypothesis/"},{judul:"Wikipedia — Riemann hypothesis",url:"https://en.wikipedia.org/wiki/Riemann_hypothesis"}]},{slug:"p-versus-np",nama:"P versus NP",namaEn:"P versus NP",label:[n,"Ilmu Komputer Teoretis"],tahun:1971,penggagas:"Stephen Cook dan Leonid Levin",hadiah:i,ringkas:"Kalau jawaban sebuah masalah bisa diperiksa dengan cepat, apakah jawabannya juga bisa dicari dengan cepat?",pernyataan:String.raw`**P** adalah kumpulan masalah yang bisa **diselesaikan** komputer dalam waktu polinomial terhadap ukuran masukannya. **NP** adalah kumpulan masalah yang jawabannya bisa **diperiksa** dalam waktu polinomial.

Jelas $P \subseteq NP$: kalau bisa dikerjakan cepat, memeriksanya juga cepat. Pertanyaannya:

$$
P \overset{?}{=} NP
$$

Kalau $P = NP$, setiap masalah yang jawabannya mudah diperiksa juga mudah dicari. Kalau $P \neq NP$, ada masalah yang jawabannya gampang dicek tapi mustahil dicari dengan cepat.`,latar:String.raw`Stephen Cook (1971) dan Leonid Levin (1973) bekerja terpisah dan sampai pada gagasan yang sama: ada masalah di NP yang paling sulit sedunia, dalam arti semua masalah NP lain bisa diterjemahkan ke sana. Masalah itu disebut **NP-complete**, dan contoh pertamanya adalah SAT, masalah kepuasan rumus logika.

Setahun kemudian Richard Karp menunjukkan 21 masalah terkenal lain juga NP-complete, mulai dari pewarnaan graf sampai masalah ransel. Sekarang daftarnya ribuan. Konsekuensinya menarik: **cukup satu saja** dari ribuan masalah itu diselesaikan dalam waktu polinomial, maka seluruhnya ikut selesai, dan $P = NP$.

Kurt Gödel sebenarnya sudah menyinggung pertanyaan ini dalam suratnya kepada John von Neumann pada 1956, jauh sebelum istilah P dan NP ada.`,contoh:String.raw`**Sudoku.** Mengecek apakah sebuah Sudoku yang sudah terisi itu benar sangat cepat: periksa tiap baris, kolom, dan kotak. Tapi *mengisi* Sudoku berukuran $n^2 \times n^2$ dari nol jauh lebih berat, dan versi umumnya NP-complete.

**Faktorisasi.** Anda diberi

$$
N = 2\,047.
$$

Mencari faktornya butuh usaha. Tapi kalau saya bilang $N = 23 \times 89$, Anda bisa memeriksanya dalam hitungan detik. Untuk $N$ sepanjang 600 digit, selisih usaha inilah yang menjaga keamanan RSA.

**Masalah pedagang keliling.** Mencari rute terpendek melewati 100 kota: jumlah rutenya sekitar $99!/2$, angka dengan lebih dari 150 digit. Tapi kalau seseorang menyodorkan satu rute dan mengaku panjangnya di bawah 5.000 km, memeriksanya cukup dengan menjumlahkan 100 bilangan.`,kemajuan:String.raw`- **1971–1972** — Cook, Levin, dan Karp membangun teori NP-complete.
- **1975** — Ladner membuktikan: kalau $P \neq NP$, ada masalah NP yang bukan P dan bukan NP-complete juga.
- **1975** — Baker, Gill, dan Solovay menunjukkan teknik relativisasi tidak akan pernah bisa menyelesaikan masalah ini.
- **1994** — Razborov dan Rudich menunjukkan hampir semua pendekatan kombinatorial yang dikenal (yang mereka sebut bukti alami) juga buntu.
- **2002 dan 2019** — survei William Gasarch kepada para peneliti: sekitar 88% menduga $P \neq NP$.

Jadi bukan hanya jawabannya yang belum ketemu; beberapa jalan besar menuju jawaban malah sudah terbukti buntu.`,kenapaSulit:String.raw`Untuk membuktikan $P \neq NP$, seseorang harus menunjukkan bahwa **tidak ada** algoritma cepat untuk suatu masalah — termasuk algoritma yang belum pernah terpikirkan siapa pun. Membuktikan ketiadaan jauh lebih sulit daripada menemukan satu contoh.

Taruhannya juga besar. Kalau $P = NP$ dengan algoritma yang benar-benar praktis, hampir semua kriptografi modern runtuh: RSA, tanda tangan digital, sampai keamanan transaksi bank. Menariknya, mencari bukti matematika pun ikut menjadi pekerjaan otomatis, karena memeriksa bukti itu mudah.`,bacaan:[{judul:"Clay Mathematics Institute — P vs NP",url:"https://www.claymath.org/millennium/p-vs-np/"},{judul:"Wikipedia — P versus NP problem",url:"https://en.wikipedia.org/wiki/P_versus_NP_problem"}]},{slug:"navier-stokes",nama:"Persamaan Navier–Stokes",namaEn:"Navier–Stokes Existence and Smoothness",label:[n,"Persamaan Diferensial"],tahun:2e3,penggagas:"Dirumuskan Clay Mathematics Institute (persamaannya dari abad ke-19)",hadiah:i,ringkas:"Persamaan yang dipakai memodelkan air dan udara setiap hari, tapi belum ada jaminan matematis solusinya selalu ada dan tidak meledak.",pernyataan:String.raw`Untuk fluida tak mampat di $\mathbb{R}^3$, persamaan Navier–Stokes berbunyi

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} = -\nabla p + \nu \Delta \mathbf{u} + \mathbf{f},
\qquad \nabla \cdot \mathbf{u} = 0,
$$

dengan $\mathbf{u}$ medan kecepatan, $p$ tekanan, dan $\nu$ viskositas.

**Masalahnya:** diberikan keadaan awal yang mulus dan berenergi hingga, buktikan bahwa selalu ada solusi mulus yang berlaku untuk **semua** waktu $t > 0$ — atau tunjukkan satu contoh keadaan awal yang solusinya meledak dalam waktu berhingga.`,latar:String.raw`Persamaan ini disusun Claude-Louis Navier (1822) dan George Gabriel Stokes (1845) dari hukum Newton yang diterapkan pada fluida. Sejak itu persamaan ini dipakai di mana-mana: ramalan cuaca, desain sayap pesawat, aliran darah, sampai simulasi asap di film.

Anehnya, semua pemakaian itu berjalan tanpa jaminan matematis. Yang dipakai adalah solusi numerik dan pendekatan, bukan bukti bahwa solusi eksaknya ada dan berperilaku wajar.

Pada 1934, Jean Leray membuktikan adanya solusi lemah yang berlaku selamanya. Masalahnya, solusi lemah itu belum tentu tunggal dan belum tentu mulus — jadi bukan jaminan yang dicari.`,contoh:String.raw`Istilah meledak berarti ada besaran yang menuju tak hingga dalam waktu berhingga, misalnya

$$
\lim_{t \to T^{-}} \; \sup_{\mathbf{x}} |\mathbf{u}(\mathbf{x}, t)| = \infty
$$

untuk suatu waktu $T$. Secara fisis itu artinya energi terkumpul ke satu titik yang makin lama makin kecil, dan kecepatannya menuju tak terbatas. Belum pernah ada yang mengamati kejadian seperti itu pada air sungguhan, tapi belum ada juga yang membuktikan itu mustahil.

Sumber kesulitannya ada pada suku $(\mathbf{u} \cdot \nabla)\mathbf{u}$ yang kuadratik. Suku ini memperbesar pusaran kecil; suku viskositas $\nu \Delta \mathbf{u}$ meredamnya. Di dua dimensi, redaman selalu menang dan masalahnya sudah selesai sejak lama. Di tiga dimensi, keduanya berimbang persis, dan tidak ada yang tahu siapa yang menang.`,kemajuan:String.raw`- **1934** — Leray membuktikan adanya solusi lemah global, dan solusi mulus yang berlaku setidaknya untuk waktu singkat.
- **1962** — Ladyzhenskaya menyelesaikan kasus dua dimensi sepenuhnya: di sana solusinya ada, tunggal, dan mulus.
- **2016** — Terence Tao membuktikan bahwa versi modifikasi persamaan ini (dengan suku nonlinear yang dirata-ratakan) **memang** meledak. Ini pertanda bahwa pendekatan yang hanya mengandalkan energi tidak akan cukup.
- **2019** — Buckmaster dan Vicol membuktikan solusi lemah tidak tunggal untuk kelas solusi tertentu, memakai teknik yang dipinjam dari geometri.

Menariknya, sebagian peneliti kini justru menduga jawabannya adalah "bisa meledak", kebalikan dari dugaan awal.`,kenapaSulit:String.raw`Alat utama yang tersedia adalah hukum kekekalan energi, dan di tiga dimensi hukum itu tepat berada di ambang: tidak cukup kuat untuk mengendalikan suku nonlinear, tapi juga tidak membiarkannya bebas. Situasi seperti ini disebut kritis, dan hampir semua masalah terbuka besar di persamaan diferensial berada di titik kritis semacam ini.

Kesulitan lain: pusaran fluida terjadi di semua skala sekaligus, dari meter sampai milimeter. Argumen yang bekerja pada satu skala harus tetap bekerja saat skalanya diperkecil tanpa batas.`,bacaan:[{judul:"Clay Mathematics Institute — Navier–Stokes Equation",url:"https://www.claymath.org/millennium/navier-stokes-equation/"},{judul:"Wikipedia — Navier–Stokes existence and smoothness",url:"https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_existence_and_smoothness"}]},{slug:"birch-swinnerton-dyer",nama:"Konjektur Birch dan Swinnerton-Dyer",namaEn:"Birch and Swinnerton-Dyer Conjecture",label:[n,"Geometri Aljabar","Teori Bilangan"],tahun:1965,penggagas:"Bryan Birch dan Peter Swinnerton-Dyer",hadiah:i,ringkas:"Menghubungkan banyaknya solusi rasional sebuah kurva eliptik dengan perilaku fungsi L-nya di satu titik.",pernyataan:String.raw`Kurva eliptik atas $\mathbb{Q}$ adalah kurva berbentuk

$$
E: y^2 = x^3 + ax + b, \qquad a, b \in \mathbb{Q},
$$

yang tidak singular. Titik-titik rasionalnya membentuk grup yang, menurut teorema Mordell, selalu terbangkit secara hingga:

$$
E(\mathbb{Q}) \cong \mathbb{Z}^{r} \times (\text{grup hingga}).
$$

Bilangan $r$ disebut **rank**: kasarnya, banyaknya arah tak hingga pada solusi rasional.

**Konjektur BSD:** rank $r$ sama dengan orde nol fungsi $L(E, s)$ di titik $s = 1$. Versi kuatnya bahkan meramalkan nilai koefisien pertama deret Taylor $L$ di titik itu.`,latar:String.raw`Pada awal 1960-an, Birch dan Swinnerton-Dyer memakai komputer EDSAC di Cambridge untuk menghitung banyaknya solusi kurva eliptik modulo berbagai bilangan prima. Dari tumpukan data numerik itu muncul pola yang mereka rumuskan sebagai konjektur. Ini salah satu konjektur besar pertama yang lahir dari eksperimen komputer.

Kurva eliptik bukan objek pinggiran. Andrew Wiles membuktikan Teorema Terakhir Fermat (1995) lewat kurva eliptik, dan kriptografi kurva eliptik kini mengamankan sebagian besar lalu lintas internet.`,contoh:String.raw`**Masalah bilangan kongruen.** Sebuah bilangan asli $n$ disebut kongruen kalau ia merupakan luas segitiga siku-siku bersisi rasional. Contohnya $6$: segitiga $3$–$4$–$5$ luasnya $6$.

Ternyata $n$ kongruen jika dan hanya jika kurva

$$
y^2 = x^3 - n^2 x
$$

punya rank positif. Jadi pertanyaan geometri sederhana berumur seribu tahun berubah menjadi pertanyaan tentang rank kurva eliptik.

Bilangan $5$ juga kongruen, lewat segitiga bersisi $\tfrac{3}{2}$, $\tfrac{20}{3}$, dan $\tfrac{41}{6}$ — luasnya tepat $5$. Sedangkan $1$, $2$, dan $3$ bukan bilangan kongruen. Dengan mengasumsikan BSD, Tunnell (1983) memberi kriteria yang mudah dihitung untuk memutuskan bilangan mana yang kongruen. Tanpa BSD, kriteria itu hanya berlaku satu arah.`,kemajuan:String.raw`- **1976** — Coates dan Wiles membuktikan sebagian kasus untuk kurva dengan perkalian kompleks.
- **1986** — Gross dan Zagier menghubungkan turunan $L$ di $s = 1$ dengan tinggi titik rasional tertentu.
- **1988** — Kolyvagin, melanjutkan hasil di atas, membuktikan konjektur ini untuk kurva dengan orde nol analitik $0$ atau $1$.
- Hasil terkini (antara lain Bhargava, Skinner, Urban, dan Zhang) menunjukkan konjektur ini berlaku untuk sebagian besar kurva eliptik dalam arti statistik.

Yang belum tersentuh adalah kasus rank $\ge 2$, yang justru paling menarik.`,kenapaSulit:String.raw`Konjektur ini menjembatani dua dunia yang jauh: sisi aljabar (menghitung titik rasional, pekerjaan yang bisa tak berujung) dan sisi analitik (perilaku sebuah fungsi kompleks). Tidak jelas kenapa keduanya harus berkaitan sama sekali.

Hambatan teknisnya adalah grup Tate–Shafarevich, objek yang mengukur kegagalan prinsip lokal-global. Sampai sekarang belum diketahui apakah grup itu selalu berhingga, padahal itu diperlukan bahkan untuk merumuskan versi kuat konjektur ini.`,bacaan:[{judul:"Clay Mathematics Institute — Birch and Swinnerton-Dyer Conjecture",url:"https://www.claymath.org/millennium/birch-and-swinnerton-dyer-conjecture/"},{judul:"Wikipedia — Birch and Swinnerton-Dyer conjecture",url:"https://en.wikipedia.org/wiki/Birch_and_Swinnerton-Dyer_conjecture"}]},{slug:"konjektur-hodge",nama:"Konjektur Hodge",namaEn:"Hodge Conjecture",label:[n,"Geometri Aljabar"],tahun:1941,penggagas:"William Vallance Douglas Hodge",hadiah:i,ringkas:"Seberapa jauh bentuk geometris rumit bisa disusun dari potongan yang berupa persamaan polinomial?",pernyataan:String.raw`Untuk ragam aljabar projektif nonsingular $X$ atas $\mathbb{C}$, kohomologinya dapat dipecah menjadi

$$
H^{n}(X, \mathbb{C}) = \bigoplus_{p+q=n} H^{p,q}(X),
$$

yang disebut dekomposisi Hodge. Kelas Hodge adalah kelas di $H^{2k}(X,\mathbb{Q})$ yang bagian kompleksnya seluruhnya berada di $H^{k,k}(X)$.

**Konjektur Hodge:** setiap kelas Hodge merupakan kombinasi linear dengan koefisien rasional dari kelas-kelas subvarietas aljabar di dalam $X$.

Kalimat pendeknya: setiap objek yang terlihat aljabar dari sudut pandang topologi memang benar-benar berasal dari persamaan polinomial.`,latar:String.raw`Hodge mengemukakannya dalam kongres matematikawan internasional 1950, berdasarkan teori yang ia bangun sejak 1930-an. Teori Hodge sendiri adalah salah satu jembatan besar abad ke-20: ia menghubungkan analisis (persamaan diferensial dan bentuk harmonik), topologi (lubang-lubang pada suatu ruang), dan geometri aljabar (himpunan solusi polinomial).

Konjektur ini adalah Masalah Milenium yang paling sulit diceritakan ke orang awam, karena bahkan merumuskan pertanyaannya sudah memerlukan kuliah pascasarjana.`,contoh:String.raw`Kasus $k = 1$ sudah terbukti dan namanya **teorema $(1,1)$ Lefschetz**: setiap kelas Hodge berderajat $2$ memang berasal dari divisor, yaitu subvarietas berkodimensi satu.

Gambaran kasarnya begini. Bayangkan sebuah permukaan berlubang. Topologi bisa mendeteksi lubang itu tanpa peduli bagaimana permukaannya dibuat. Pertanyaan Hodge: kalau sebuah lubang punya ciri-ciri yang khas milik himpunan solusi polinomial, apakah pasti ada kurva atau permukaan yang benar-benar didefinisikan polinomial yang menghasilkannya?

Untuk lubang berdimensi terendah jawabannya ya, dan itulah teorema Lefschetz. Untuk dimensi lebih tinggi, tidak ada yang tahu.`,kemajuan:String.raw`- **Teorema Lefschetz $(1,1)$** menyelesaikan kasus $k = 1$ sepenuhnya.
- Konjektur ini terbukti untuk beberapa kelas ragam khusus, seperti ragam abelian tertentu dan hiperpermukaan berdimensi rendah.
- **1961** — Atiyah dan Hirzebruch menunjukkan versi konjektur ini dengan koefisien bilangan bulat (bukan rasional) **salah**. Jadi koefisien rasional memang syarat yang penting, bukan sekadar kenyamanan.
- Grothendieck mengusulkan versi perbaikan yang lebih umum pada 1969, yang juga masih terbuka.

Sampai sekarang belum ada pendekatan umum yang tampak menjanjikan.`,kenapaSulit:String.raw`Persoalannya adalah membangun sesuatu (subvarietas aljabar) dari informasi yang sepenuhnya topologis. Tidak ada resep umum untuk itu, dan tidak ada cara mengecek satu per satu karena kelas Hodge yang mungkin muncul tak terhingga banyaknya.

Kegagalan versi bilangan bulatnya juga jadi peringatan: intuisi di sini mudah menyesatkan, dan kebenaran pernyataannya bergantung pada detail teknis yang halus.`,bacaan:[{judul:"Clay Mathematics Institute — Hodge Conjecture",url:"https://www.claymath.org/millennium/hodge-conjecture/"},{judul:"Wikipedia — Hodge conjecture",url:"https://en.wikipedia.org/wiki/Hodge_conjecture"}]},{slug:"yang-mills",nama:"Yang–Mills dan Celah Massa",namaEn:"Yang–Mills Existence and Mass Gap",label:[n,"Fisika Matematis"],tahun:2e3,penggagas:"Dirumuskan Clay Mathematics Institute (teorinya dari 1954)",hadiah:i,ringkas:"Teori yang jadi tulang punggung fisika partikel ini bekerja sangat baik di eksperimen, tapi belum punya fondasi matematis yang ketat.",pernyataan:String.raw`**Masalahnya ada dua bagian.**

Pertama, buktikan bahwa untuk setiap grup gauge kompak sederhana $G$, teori Yang–Mills kuantum di ruang-waktu empat dimensi $\mathbb{R}^4$ benar-benar ada sebagai teori medan kuantum yang memenuhi aksioma yang ketat.

Kedua, buktikan teori itu punya **celah massa** $\Delta > 0$: setiap keadaan tereksitasi punya energi setidaknya $\Delta$ di atas keadaan vakum. Artinya partikel teringan dalam teori itu punya massa positif, bukan nol.`,latar:String.raw`Chen Ning Yang dan Robert Mills merumuskan teorinya pada 1954 sebagai perumuman elektromagnetisme. Teori ini kemudian menjadi kerangka Model Standar fisika partikel, yang menjelaskan gaya kuat dan gaya lemah.

Yang aneh: gaya elektromagnetik dibawa foton yang bermassa nol, sehingga jangkauannya tak terbatas. Gaya kuat dibawa gluon yang secara persamaan juga bermassa nol, tapi jangkauannya sangat pendek dan gluon tidak pernah teramati sendirian. Penjelasan fisikanya adalah celah massa dan pengurungan warna, dan keduanya sudah diterima fisikawan berdasarkan eksperimen serta simulasi. Buktinya secara matematis belum ada.`,contoh:String.raw`Bukti dukungan dari eksperimen dan komputer cukup kuat:

- Simulasi kisi (lattice QCD) secara konsisten menghasilkan partikel teringan berupa glueball dengan massa sekitar $1{,}5$ GeV, jelas lebih besar dari nol.
- Tidak pernah ada satu pun quark atau gluon yang teramati dalam keadaan bebas, sesuai perkiraan pengurungan.
- Model Standar meramalkan hasil eksperimen sampai ketelitian belasan angka di belakang koma.

Jadi ini masalah yang jawabannya sudah diketahui fisikawan, tapi bukan dalam pengertian yang diterima matematikawan. Yang diminta Clay Institute bukan angka yang cocok dengan eksperimen, melainkan pembuktian bahwa objek matematis yang dibicarakan itu memang ada.`,kemajuan:String.raw`- Teori medan kuantum sudah berhasil dibangun secara ketat di dimensi dua dan tiga. Dimensi empat, yang kebetulan dimensi dunia kita, tetap membandel.
- Pendekatan lewat teori kisi memberi hasil numerik yang meyakinkan, tapi mengambil limit kontinunya secara ketat belum bisa dilakukan.
- Program aksiomatik (Wightman, Osterwalder–Schrader) menyediakan daftar syarat yang harus dipenuhi; belum ada yang berhasil membangun teori yang memenuhinya di empat dimensi.

Banyak matematikawan menganggap masalah ini yang paling jauh dari jangkauan di antara tujuh Masalah Milenium.`,kenapaSulit:String.raw`Perhitungan fisika yang sukses itu bertumpu pada teori perturbasi: hasilnya berupa deret yang, secara matematis, tidak konvergen. Deret itu memberi angka yang sangat akurat, tapi tidak mendefinisikan objek apa pun secara ketat.

Selain itu, sifat yang mau dibuktikan — celah massa — justru bersifat nonperturbatif. Ia tidak terlihat sama sekali dalam pendekatan deret, sehingga tidak bisa didekati dengan alat yang selama ini paling ampuh di fisika partikel.`,bacaan:[{judul:"Clay Mathematics Institute — Yang–Mills and Mass Gap",url:"https://www.claymath.org/millennium/yang-mills-the-maths-gap/"},{judul:"Wikipedia — Yang–Mills existence and mass gap",url:"https://en.wikipedia.org/wiki/Yang%E2%80%93Mills_existence_and_mass_gap"}]}],a="Teori Bilangan",l=[{slug:"konjektur-collatz",nama:"Konjektur Collatz",namaEn:"Collatz Conjecture (3n + 1 problem)",label:[a],tahun:1937,penggagas:"Lothar Collatz",ringkas:"Genap dibagi dua, ganjil dikali tiga tambah satu. Apakah semua bilangan akhirnya jatuh ke 1?",pernyataan:String.raw`Definisikan fungsi pada bilangan asli:

$$
f(n) =
\begin{cases}
n/2, & n \text{ genap},\\
3n + 1, & n \text{ ganjil}.
\end{cases}
$$

Terapkan berulang-ulang mulai dari sembarang $n \ge 1$.

**Konjektur Collatz:** berapa pun $n$ awalnya, barisan itu pada akhirnya mencapai $1$.

Setelah sampai di $1$, barisannya berputar selamanya: $1 \to 4 \to 2 \to 1$.`,latar:String.raw`Lothar Collatz mencatat masalah ini di buku catatannya sekitar 1937. Masalah yang sama beredar dengan banyak nama — masalah $3n+1$, masalah Ulam, masalah Kakutani, algoritma Hasse — karena berpindah dari mulut ke mulut antar matematikawan sebelum sempat dibukukan.

Paul Erdős menawarkan hadiah $500 bagi yang bisa menyelesaikannya, sambil berkomentar bahwa matematika belum siap untuk masalah semacam ini. Jeffrey Lagarias, yang menulis survei terlengkapnya, menyarankan matematikawan muda menjauh: masalah ini terkenal menyedot waktu tanpa hasil.`,contoh:String.raw`Mulai dari $n = 6$:

$$
6 \to 3 \to 10 \to 5 \to 16 \to 8 \to 4 \to 2 \to 1
$$

Delapan langkah, selesai.

Sekarang $n = 27$, dan perilakunya berubah total. Barisannya butuh **111 langkah**, sempat memanjat sampai **9.232**, jauh di atas titik awalnya, sebelum akhirnya jatuh juga ke $1$:

$$
27 \to 82 \to 41 \to 124 \to 62 \to 31 \to 94 \to \cdots \to 9232 \to \cdots \to 2 \to 1
$$

Inilah yang membuat masalah ini licin: naik-turunnya tidak punya pola yang bisa ditebak dari bilangan awalnya. Bilangan kecil bisa berkelana sangat jauh, lalu tiba-tiba runtuh ke $1$.

Yang harus dibuktikan sebenarnya dua hal: tidak ada barisan yang membesar selamanya, dan tidak ada siklus lain selain $1 \to 4 \to 2 \to 1$.`,kemajuan:String.raw`- Komputer sudah memeriksa semua bilangan sampai sekitar $2{,}9 \times 10^{20}$. Semuanya berakhir di $1$.
- Kalau ada siklus lain selain $1 \to 4 \to 2$, panjangnya harus lebih dari 100 juta langkah.
- **1976** — Riho Terras membuktikan hampir semua bilangan (dalam arti kerapatan) pada akhirnya turun di bawah nilai awalnya.
- **2019** — Terence Tao membuktikan hasil terkuat sejauh ini: hampir semua orbit Collatz akhirnya mencapai nilai yang hampir terbatas. Ia sendiri menyebutnya sedekat mungkin dengan bukti penuh tanpa benar-benar membuktikannya.

Perlu diingat, "hampir semua" dalam arti ini masih menyisakan kemungkinan adanya pengecualian, dan satu pengecualian saja sudah cukup untuk meruntuhkan konjekturnya.`,kenapaSulit:String.raw`Operasi $n/2$ rapi di basis 2, sedangkan $3n+1$ rapi di basis 3. Keduanya bergantian, dan tidak ada satu sudut pandang yang membuat keduanya sederhana sekaligus. Akibatnya barisan itu berperilaku seolah-olah acak, padahal aturannya sepenuhnya deterministik.

Alat matematika yang biasa dipakai untuk barisan — fungsi monoton, invarian, atau ukuran yang selalu mengecil — semuanya gagal di sini, karena barisannya memang boleh naik dulu sangat jauh sebelum turun.`,bacaan:[{judul:"Wikipedia — Collatz conjecture",url:"https://en.wikipedia.org/wiki/Collatz_conjecture"},{judul:"Terence Tao — Almost all orbits of the Collatz map attain almost bounded values",url:"https://arxiv.org/abs/1909.03562"}]},{slug:"konjektur-goldbach",nama:"Konjektur Goldbach",namaEn:"Goldbach's Conjecture",label:[a],tahun:1742,penggagas:"Christian Goldbach",ringkas:"Setiap bilangan genap lebih dari 2 adalah jumlah dua bilangan prima. Sudah diperiksa sampai 4 triliun kali sejuta, belum ada yang membantah.",pernyataan:String.raw`**Konjektur Goldbach (versi kuat):** setiap bilangan bulat genap $n > 2$ dapat ditulis sebagai jumlah dua bilangan prima,

$$
n = p + q, \qquad p, q \text{ prima}.
$$

Ada versi yang lebih lemah, disebut konjektur Goldbach ganjil: setiap bilangan ganjil lebih dari $5$ adalah jumlah tiga bilangan prima. Versi lemah ini sudah terbukti; versi kuatnya belum.`,latar:String.raw`Pada 7 Juni 1742, Christian Goldbach menulis surat kepada Leonhard Euler berisi dugaan tentang penjumlahan bilangan prima. Euler membalas bahwa ia yakin dugaan itu benar, tapi tidak bisa membuktikannya. Hampir tiga abad kemudian, posisi kita masih sama persis dengan Euler.

Masalah ini sempat jadi bahan promosi novel *Uncle Petros and Goldbach's Conjecture* pada tahun 2000: penerbitnya menawarkan hadiah satu juta dolar bagi yang bisa membuktikannya dalam dua tahun. Tidak ada yang berhasil.`,contoh:String.raw`Beberapa bilangan genap dan pemecahannya:

$$
\begin{aligned}
4 &= 2 + 2 & 6 &= 3 + 3 & 8 &= 3 + 5\\
10 &= 3 + 7 = 5 + 5 & 20 &= 3 + 17 = 7 + 13 & 100 &= 3 + 97 = 11 + 89 = 17 + 83 = \cdots
\end{aligned}
$$

Menariknya, semakin besar bilangannya, biasanya semakin **banyak** cara memecahnya. Bilangan $100$ punya 6 cara; bilangan $1000$ punya 28 cara; bilangan $100\,000$ punya lebih dari 800 cara. Grafik banyaknya cara ini terhadap $n$ berbentuk seperti komet, dan dikenal sebagai komet Goldbach.

Justru kelimpahan inilah yang membuat orang yakin konjekturnya benar: untuk gagal, sebuah bilangan genap harus kehabisan **semua** kemungkinan sekaligus.`,kemajuan:String.raw`- **1937** — Ivan Vinogradov membuktikan versi ganjilnya benar untuk semua bilangan ganjil yang cukup besar, tanpa menyebut sebesar apa.
- **1973** — Chen Jingrun membuktikan setiap bilangan genap yang cukup besar adalah jumlah sebuah prima dan sebuah bilangan yang punya paling banyak dua faktor prima. Sedekat itu, dan berhenti di situ.
- **2013** — Harald Helfgott menutup celah pada hasil Vinogradov dan menyelesaikan versi ganjil untuk **semua** bilangan ganjil lebih dari $5$. Hasil ini diterima luas.
- Komputer sudah memeriksa versi kuatnya untuk semua bilangan genap sampai $4 \times 10^{18}$.

Perlu dicatat, versi ganjil tidak otomatis menyelesaikan versi kuat: dari "genap = dua prima" kita bisa menurunkan versi ganjil, tapi tidak sebaliknya.`,kenapaSulit:String.raw`Bilangan prima terdefinisi lewat perkalian, sedangkan konjektur ini bertanya tentang penjumlahan. Menjembatani dua operasi itu adalah kesulitan klasik teori bilangan, dan sebagian besar alat yang ada — metode lingkaran Hardy–Littlewood, metode saringan — hanya sanggup mengurus bilangan yang cukup besar, sambil menyisakan bilangan kecil untuk diperiksa komputer.

Metode saringan bahkan punya batas teoretis yang dikenal sebagai penghalang paritas, yang membuatnya tidak akan pernah bisa memisahkan "dua prima" dari "prima kali dua prima". Itulah kenapa hasil Chen Jingrun berhenti tepat selangkah sebelum tujuan.`,bacaan:[{judul:"Wikipedia — Goldbach's conjecture",url:"https://en.wikipedia.org/wiki/Goldbach%27s_conjecture"},{judul:"Harald Helfgott — The ternary Goldbach conjecture is true",url:"https://arxiv.org/abs/1312.7748"}]},{slug:"konjektur-prima-kembar",nama:"Konjektur Prima Kembar",namaEn:"Twin Prime Conjecture",label:[a],tahun:1849,penggagas:"Alphonse de Polignac",ringkas:"Apakah pasangan prima berselisih 2 tidak pernah habis? Sejak 2013 jaraknya berhasil ditekan dari 70 juta menjadi 246.",pernyataan:String.raw`Pasangan prima kembar adalah dua bilangan prima yang selisihnya $2$, misalnya $(3,5)$, $(5,7)$, $(11,13)$, dan $(17,19)$.

**Konjektur prima kembar:** ada tak hingga banyak pasangan seperti itu, yaitu tak hingga banyak $p$ sehingga $p$ dan $p+2$ dua-duanya prima.

Bandingkan dengan fakta yang sudah lama diketahui: bilangan prima sendiri tak hingga banyaknya (dibuktikan Euclid sekitar 300 SM). Yang belum diketahui adalah apakah prima yang berdempetan juga tak pernah habis.`,latar:String.raw`Alphonse de Polignac merumuskannya pada 1849 dalam bentuk yang lebih umum: untuk setiap bilangan genap $k$, ada tak hingga pasangan prima berselisih $k$. Kasus $k = 2$ adalah konjektur prima kembar.

Makin besar bilangannya, prima makin jarang: di sekitar $x$, kerapatan prima kira-kira $1/\ln x$. Karena itu masuk akal kalau prima kembar makin langka. Pertanyaannya, apakah kelangkaan itu berakhir dengan kehabisan.

Petunjuk bahwa mereka memang langka datang dari Viggo Brun (1919): jumlah kebalikan semua prima kembar,

$$
\left(\tfrac13 + \tfrac15\right) + \left(\tfrac15 + \tfrac17\right) + \left(\tfrac1{11} + \tfrac1{13}\right) + \cdots
$$

konvergen ke suatu bilangan sekitar $1{,}9021605$, yang disebut konstanta Brun. Bandingkan dengan jumlah kebalikan semua prima, yang divergen. Sayangnya konvergensi ini tidak memberi tahu apakah sukunya berhingga atau tak hingga banyak.`,contoh:String.raw`Prima kembar kecil:

$$
(3,5),\ (5,7),\ (11,13),\ (17,19),\ (29,31),\ (41,43),\ (59,61),\ (71,73), \ldots
$$

Sampai $100$ ada 8 pasang, sampai $1000$ ada 35 pasang, sampai satu juta ada 8.169 pasang. Jumlahnya terus bertambah, hanya makin lambat.

Pasangan prima kembar terbesar yang diketahui ditemukan pada 2016:

$$
2\,996\,863\,034\,895 \times 2^{1\,290\,000} \pm 1,
$$

keduanya punya 388.342 digit. Menemukan pasangan raksasa seperti itu tentu tidak membuktikan apa pun tentang ketakhinggaan — selalu ada kemungkinan pasangan itu termasuk yang terakhir.`,kemajuan:String.raw`- **2013** — Zhang Yitang, yang saat itu bekerja sebagai dosen tidak tetap, membuktikan ada tak hingga pasangan prima dengan selisih **kurang dari 70 juta**. Ini terobosan besar: sebelumnya tidak ada satu pun batas berhingga yang terbukti.
- **2013–2014** — proyek terbuka Polymath8 bersama James Maynard dan Terence Tao menekan batas itu berkali-kali, sampai akhirnya **246**.
- Dengan mengasumsikan konjektur Elliott–Halberstam yang juga belum terbukti, batasnya turun lagi menjadi **6**.

Artinya, sekarang sudah pasti ada suatu bilangan genap $k \le 246$ yang muncul sebagai selisih dua prima tak hingga kali. Yang belum diketahui adalah apakah $k = 2$ termasuk salah satunya.`,kenapaSulit:String.raw`Metode saringan bisa menunjukkan bahwa prima kembar tidak terlalu rapat, tapi tidak bisa menunjukkan bahwa mereka tidak pernah habis. Penghalang paritas yang sama seperti pada konjektur Goldbach muncul lagi di sini.

Metode Zhang dan Maynard bekerja dengan menangkap dua prima di dalam jendela sempit tanpa bisa mengendalikan lebarnya sampai tepat $2$. Menutup jarak dari 246 ke 2 tampaknya bukan soal memperbaiki perhitungan, melainkan butuh gagasan baru.`,bacaan:[{judul:"Wikipedia — Twin prime",url:"https://en.wikipedia.org/wiki/Twin_prime"},{judul:"Quanta Magazine — Unheralded mathematician bridges the prime gap",url:"https://www.quantamagazine.org/unheralded-mathematician-bridges-the-prime-gap-20130519/"}]},{slug:"bilangan-sempurna-ganjil",nama:"Bilangan Sempurna Ganjil",namaEn:"Odd Perfect Number Problem",label:[a],tahun:-300,penggagas:"Sudah ditanyakan sejak zaman Yunani kuno",ringkas:"Semua bilangan sempurna yang pernah ditemukan genap. Apakah ada yang ganjil? Pertanyaan berumur lebih dari dua ribu tahun.",pernyataan:String.raw`Bilangan sempurna adalah bilangan asli yang sama dengan jumlah pembagi sejatinya. Contoh terkecil:

$$
6 = 1 + 2 + 3, \qquad 28 = 1 + 2 + 4 + 7 + 14.
$$

Dengan fungsi jumlah pembagi $\sigma$, syaratnya $\sigma(n) = 2n$.

**Masalahnya:** adakah bilangan sempurna yang ganjil? Sampai hari ini semua bilangan sempurna yang diketahui genap.`,latar:String.raw`Euclid sudah membuktikan sekitar 300 SM: kalau $2^p - 1$ prima, maka $2^{p-1}(2^p - 1)$ sempurna. Dua ribu tahun kemudian Euler membuktikan kebalikannya, bahwa **setiap** bilangan sempurna genap berbentuk seperti itu. Jadi sisi genapnya sudah tuntas dan terhubung langsung dengan prima Mersenne.

Sisi ganjilnya tidak bergerak sama sekali. Ini sering disebut sebagai salah satu pertanyaan tertua dalam matematika yang masih terbuka.`,contoh:String.raw`Empat bilangan sempurna terkecil: $6$, $28$, $496$, dan $8128$. Semuanya cocok dengan rumus Euclid:

$$
6 = 2^1(2^2-1), \quad 28 = 2^2(2^3-1), \quad 496 = 2^4(2^5-1), \quad 8128 = 2^6(2^7-1).
$$

Euler juga menunjukkan bahwa **kalau** bilangan sempurna ganjil $n$ ada, bentuknya harus

$$
n = p^{\alpha} m^{2}, \qquad p \equiv \alpha \equiv 1 \pmod 4,
$$

dengan $p$ prima yang tidak membagi $m$. Jadi kita tahu banyak sekali tentang benda yang belum tentu ada.

Daftar syarat yang sudah terkumpul cukup panjang: $n$ harus lebih besar dari $10^{1500}$, punya sedikitnya 10 faktor prima berbeda, punya sedikitnya 101 faktor prima bila dihitung dengan kelipatannya, dan faktor prima terbesarnya harus melebihi $10^{8}$.`,kemajuan:String.raw`- **2012** — Ochem dan Rao menaikkan batas bawahnya menjadi $10^{1500}$.
- **2015** — Nielsen membuktikan bilangan seperti itu harus punya sedikitnya 10 faktor prima berbeda.
- Banyak syarat tambahan lain sudah diturunkan, semuanya berupa "kalau ada, maka harus begini".

Perhatikan polanya: setiap hasil baru mempersempit tempat persembunyian, tanpa pernah menutupnya sama sekali.`,kenapaSulit:String.raw`Fungsi $\sigma$ bersifat multiplikatif, jadi mudah dihitung kalau faktorisasinya diketahui. Kesulitannya, syarat $\sigma(n) = 2n$ mengunci hubungan antar faktor prima secara sangat ketat namun tidak pernah sampai menghasilkan kontradiksi.

Membuktikan sesuatu **tidak ada** di dalam himpunan tak hingga memerlukan argumen struktural, bukan pencarian. Sejauh ini yang tersedia baru rangkaian pembatas, dan setiap pembatas baru hanya menggeser garis batas lebih jauh.`,bacaan:[{judul:"Wikipedia — Perfect number",url:"https://en.wikipedia.org/wiki/Perfect_number"},{judul:"Oddperfect.org — status pencarian",url:"https://oddperfect.org/"}]},{slug:"konjektur-abc",nama:"Konjektur abc",namaEn:"abc Conjecture",label:[a],tahun:1985,penggagas:"Joseph Oesterlé dan David Masser",ringkas:"Membatasi seberapa besar c boleh melampaui hasil kali faktor prima dari a, b, dan c. Ada klaim bukti yang sampai sekarang belum diterima secara luas.",pernyataan:String.raw`Untuk bilangan asli $n$, tulis $\operatorname{rad}(n)$ sebagai hasil kali semua faktor prima berbeda dari $n$. Misalnya $\operatorname{rad}(72) = \operatorname{rad}(2^3 \cdot 3^2) = 6$.

**Konjektur abc:** untuk setiap $\varepsilon > 0$, hanya ada berhingga banyak tripel bilangan asli koprima $(a, b, c)$ dengan $a + b = c$ dan

$$
c > \operatorname{rad}(abc)^{1+\varepsilon}.
$$

Bahasa sederhananya: kalau $a + b = c$, ketiganya tidak boleh terlalu kaya akan pangkat tinggi sekaligus.`,latar:String.raw`Konjektur ini dirumuskan Oesterlé dan Masser pada pertengahan 1980-an, dan cepat dianggap sangat penting karena kekuatannya. Kalau benar, banyak teorema besar langsung ikut: Teorema Terakhir Fermat untuk eksponen besar, teorema Roth, konjektur Mordell, sampai konjektur Erdős–Woods.

Pada 2012 Shinichi Mochizuki mengumumkan bukti sepanjang lebih dari 500 halaman memakai kerangka yang ia bangun sendiri, yaitu teori Teichmüller antar-universal. Makalahnya terbit di jurnal PRIMS pada 2021. Namun Peter Scholze dan Jakob Stix menyatakan menemukan celah pada 2018, dan sampai sekarang komunitas matematika belum menerima bukti itu secara luas. Jadi statusnya: ada klaim bukti yang diperdebatkan, bukan masalah yang tuntas.`,contoh:String.raw`Ambil $a = 1$, $b = 8$, $c = 9$. Ketiganya koprima dan $1 + 8 = 9$. Di sini

$$
\operatorname{rad}(1 \cdot 8 \cdot 9) = \operatorname{rad}(72) = 2 \cdot 3 = 6,
$$

sehingga $c = 9 > 6 = \operatorname{rad}(abc)$. Tripel seperti ini disebut "abc hit" dan memang ada, hanya jarang.

Contoh yang lebih ekstrem: $a = 3$, $b = 125$, $c = 128$, dengan $\operatorname{rad}(3 \cdot 125 \cdot 128) = 3 \cdot 5 \cdot 2 = 30$, padahal $c = 128$. Konjekturnya bukan melarang kejadian ini, melainkan mengatakan bahwa kelebihan sebesar itu tidak bisa terus-menerus terjadi kalau pangkatnya dinaikkan sedikit.`,kemajuan:String.raw`- Beberapa versi lemah sudah terbukti, misalnya batas eksponensial dari Stewart dan Yu.
- Perhitungan komputer telah mengumpulkan ribuan tripel abc berkualitas tinggi, dan semuanya sesuai dengan konjektur.
- **2012–sekarang** — bukti Mochizuki tetap menjadi perdebatan terbuka; sebagian kecil ahli menerima, sebagian besar belum.

Karena situasi ini, banyak yang memperlakukan konjektur abc sebagai masalah yang masih terbuka.`,kenapaSulit:String.raw`Konjektur ini menuntut kendali atas hubungan antara penjumlahan ($a + b = c$) dan struktur perkalian (faktorisasi prima) sekaligus — bentrokan yang sama seperti pada Goldbach, tapi dalam bentuk yang jauh lebih kuat.

Kesulitan tambahan datang dari sisi sosial: kerangka yang dipakai Mochizuki sangat baru dan hanya dikuasai sedikit orang, sehingga memverifikasinya saja sudah menjadi proyek bertahun-tahun.`,bacaan:[{judul:"Wikipedia — abc conjecture",url:"https://en.wikipedia.org/wiki/Abc_conjecture"},{judul:"Quanta Magazine — Titans of mathematics clash over epic proof",url:"https://www.quantamagazine.org/titans-of-mathematics-clash-over-epic-proof-of-abc-conjecture-20180920/"}]},{slug:"konjektur-legendre",nama:"Konjektur Legendre",namaEn:"Legendre's Conjecture",label:[a],tahun:1798,penggagas:"Adrien-Marie Legendre",ringkas:"Selalu ada bilangan prima di antara dua kuadrat berurutan. Terlihat jelas dari data, tapi belum terbukti.",pernyataan:String.raw`**Konjektur Legendre:** untuk setiap bilangan asli $n$, selalu ada bilangan prima $p$ dengan

$$
n^2 < p < (n+1)^2.
$$

Ini salah satu dari empat masalah Landau tentang bilangan prima yang diumumkan pada kongres 1912 dan sampai sekarang belum satu pun terselesaikan.`,latar:String.raw`Pertanyaan semacam ini bermuara pada satu hal: seberapa besar jarak antara dua bilangan prima berurutan? Hasil klasik yang sudah terbukti adalah postulat Bertrand (dibuktikan Chebyshev, 1852): selalu ada prima antara $n$ dan $2n$.

Jarak antara $n^2$ dan $(n+1)^2$ hanya sekitar $2n$, jauh lebih sempit daripada jarak $n$ sampai $2n$. Di situlah kesulitannya: interval yang harus dijamin berisi prima jauh lebih pendek.`,contoh:String.raw`Beberapa kasus kecil:

- Antara $4$ dan $9$: ada $5$ dan $7$.
- Antara $9$ dan $16$: ada $11$ dan $13$.
- Antara $100$ dan $121$: ada $101$, $103$, $107$, $109$, $113$.

Makin besar $n$, biasanya makin banyak prima yang muncul di antara dua kuadrat — jumlahnya kira-kira $2n/\ln n$. Jadi secara statistik konjektur ini terlihat sangat aman. Masalahnya, statistik bukan bukti: konjektur ini menuntut jaminan bahwa tidak ada satu pun $n$ yang kosong.`,kemajuan:String.raw`- Terbukti benar untuk semua $n$ yang sudah diperiksa komputer, sampai jauh melampaui $10^{18}$.
- **2001** — Baker, Harman, dan Pintz membuktikan selalu ada prima di interval $[x,\; x + x^{0{,}525}]$ untuk $x$ yang cukup besar. Untuk menyelesaikan konjektur Legendre, eksponennya perlu turun sampai $0{,}5$.
- Dengan mengasumsikan Hipotesis Riemann pun konjektur ini belum otomatis selesai — Riemann hanya memberi interval sekitar $\sqrt{x}\log x$, sedikit terlalu lebar.

Jadi ini masalah yang letaknya persis di luar jangkauan alat terbaik yang ada.`,kenapaSulit:String.raw`Semua metode yang ada mengendalikan prima secara rata-rata pada interval panjang. Begitu intervalnya dipersempit sampai seukuran $\sqrt{x}$, galat pada rumus perkiraannya menjadi sebesar jumlah yang mau diperkirakan, sehingga perkiraannya kehilangan arti.

Menutup selisih kecil antara eksponen $0{,}525$ dan $0{,}5$ tampak sedikit, tapi justru di situ alat yang tersedia berhenti bekerja.`,bacaan:[{judul:"Wikipedia — Legendre's conjecture",url:"https://en.wikipedia.org/wiki/Legendre%27s_conjecture"},{judul:"Wikipedia — Landau's problems",url:"https://en.wikipedia.org/wiki/Landau%27s_problems"}]},{slug:"prima-n-kuadrat-plus-satu",nama:"Prima Berbentuk n² + 1",namaEn:"Primes of the Form n² + 1",label:[a],tahun:1912,penggagas:"Dirumuskan Edmund Landau",ringkas:"Apakah ada tak hingga banyak bilangan prima berbentuk n² + 1? Salah satu dari empat masalah Landau.",pernyataan:String.raw`**Masalahnya:** apakah ada tak hingga banyak bilangan asli $n$ sehingga

$$
n^2 + 1
$$

merupakan bilangan prima?

Ini masalah keempat dari daftar Landau, bersama Goldbach, prima kembar, dan konjektur Legendre.`,latar:String.raw`Polinomial derajat satu sudah tuntas: teorema Dirichlet (1837) menjamin barisan $an + b$ dengan $a, b$ koprima memuat tak hingga banyak prima. Untuk polinomial derajat dua, tidak ada satu pun contoh yang berhasil dibuktikan.

Perkiraan kasarnya: banyaknya $n \le N$ dengan $n^2+1$ prima kira-kira sebanding dengan $\sqrt{N}/\log N$, mengikuti konjektur Bateman–Horn. Perkiraan ini sangat cocok dengan data, tapi tetap sebatas konjektur.`,contoh:String.raw`Beberapa nilai:

$$
1^2+1 = 2,\quad 2^2+1 = 5,\quad 4^2+1 = 17,\quad 6^2+1 = 37,\quad 10^2+1 = 101
$$

semuanya prima. Tetapi

$$
3^2+1 = 10, \quad 5^2+1 = 26, \quad 7^2+1 = 50
$$

tidak. Perhatikan $n$ harus genap agar $n^2+1$ ganjil — kecuali kasus $n=1$.

Sampai batas yang sudah dihitung komputer, kepadatan prima jenis ini persis seperti yang diramalkan rumus Bateman–Horn. Tetap saja, tidak ada yang bisa membuktikan bahwa daftarnya tidak berhenti di suatu tempat.`,kemajuan:String.raw`- **1978** — Henryk Iwaniec membuktikan ada tak hingga banyak $n$ sehingga $n^2 + 1$ punya paling banyak dua faktor prima. Sedekat itu dengan "prima", dan berhenti di situ.
- Metode saringan modern bisa menangani banyak varian, tapi selalu berhenti di "paling banyak dua faktor".
- Hasil serupa juga berlaku untuk beberapa polinomial kuadrat lain, dengan hambatan yang sama.`,kenapaSulit:String.raw`Nilai $n^2+1$ tumbuh kuadratik, jadi di antara $1$ dan $N$ hanya ada sekitar $\sqrt{N}$ calon. Barisan yang begitu jarang berada di luar jangkauan metode saringan, yang butuh barisan cukup padat agar galatnya terkendali.

Penghalang paritas juga muncul lagi: saringan tidak bisa membedakan bilangan dengan satu faktor prima dari bilangan dengan dua faktor prima, dan itu persis perbedaan antara hasil Iwaniec dan jawaban yang dicari.`,bacaan:[{judul:"Wikipedia — Landau's problems",url:"https://en.wikipedia.org/wiki/Landau%27s_problems"},{judul:"Wikipedia — Bateman–Horn conjecture",url:"https://en.wikipedia.org/wiki/Bateman%E2%80%93Horn_conjecture"}]},{slug:"konjektur-brocard",nama:"Masalah Brocard",namaEn:"Brocard's Problem",label:[a],tahun:1876,penggagas:"Henri Brocard",ringkas:"Kapan n! + 1 menjadi bilangan kuadrat? Hanya tiga jawaban yang diketahui, dan belum terbukti tidak ada yang lain.",pernyataan:String.raw`**Masalah Brocard:** tentukan semua pasangan bilangan asli $(n, m)$ yang memenuhi

$$
n! + 1 = m^2.
$$

Solusi yang diketahui hanya tiga: $n = 4, 5, 7$. Bilangan $m$ yang bersesuaian — $5$, $11$, dan $71$ — disebut bilangan Brown.

**Konjekturnya:** tidak ada solusi lain.`,latar:String.raw`Brocard mengajukan pertanyaan ini pada 1876, dan Ramanujan mengajukannya lagi secara terpisah pada 1913 tanpa mengetahui karya Brocard. Sampai sekarang belum ada yang bisa membuktikan daftarnya berhenti di tiga.

Masalah ini menarik karena bentuknya sangat sederhana, tapi menggabungkan dua objek yang sifatnya berlawanan: faktorial tumbuh sangat cepat dan penuh faktor prima kecil, sedangkan bilangan kuadrat punya struktur yang sangat kaku.`,contoh:String.raw`Tiga solusi yang diketahui:

$$
4! + 1 = 25 = 5^2, \qquad 5! + 1 = 121 = 11^2, \qquad 7! + 1 = 5041 = 71^2.
$$

Coba yang lain:

$$
6! + 1 = 721 = 7 \times 103, \qquad 8! + 1 = 40\,321 = 61 \times 661,
$$

keduanya bukan kuadrat. Pencarian komputer sudah menyisir $n$ sampai sekitar $10^{9}$ tanpa menemukan solusi keempat.`,kemajuan:String.raw`- Overholt (1993) menunjukkan bahwa kalau konjektur abc benar, maka masalah Brocard hanya punya berhingga banyak solusi.
- Pencarian komputer memperluas batas pemeriksaan tanpa menemukan solusi baru.
- Beberapa varian, misalnya $n! + 1 = m^k$ untuk $k$ tetap, punya hasil parsial serupa.

Jadi salah satu jalan menuju penyelesaiannya adalah lewat konjektur abc yang sendirinya juga belum tuntas.`,kenapaSulit:String.raw`Persamaan yang mencampur faktorial dengan pangkat termasuk persamaan Diophantine eksponensial, kelas yang secara umum sangat sulit. Alat standar seperti aritmetika modular hanya bisa menyingkirkan sebagian kasus, bukan semuanya.

Faktorial juga terlalu kaya faktor: begitu $n$ besar, $n!$ habis dibagi hampir semua prima kecil, sehingga informasi modular yang biasanya membantu justru menjadi hampa.`,bacaan:[{judul:"Wikipedia — Brocard's problem",url:"https://en.wikipedia.org/wiki/Brocard%27s_problem"}]},{slug:"prima-mersenne-tak-hingga",nama:"Ketakhinggaan Prima Mersenne",namaEn:"Infinitude of Mersenne Primes",label:[a],tahun:1644,penggagas:"Marin Mersenne",ringkas:"Prima berbentuk 2^p − 1 baru ditemukan 52 buah. Apakah jumlahnya tak hingga? Belum ada yang tahu.",pernyataan:String.raw`Bilangan Mersenne adalah bilangan berbentuk

$$
M_p = 2^p - 1
$$

dengan $p$ prima. Kalau $M_p$ juga prima, ia disebut prima Mersenne.

**Masalahnya:** apakah ada tak hingga banyak prima Mersenne? Pertanyaan pasangannya: apakah ada tak hingga banyak $M_p$ yang komposit? Keduanya belum terjawab.`,latar:String.raw`Marin Mersenne menerbitkan daftar dugaannya pada 1644, dan daftar itu ternyata mengandung beberapa kesalahan yang baru terkoreksi berabad-abad kemudian. Sejak itu, perburuan prima Mersenne menjadi olahraga tersendiri karena ada uji khusus yang sangat efisien untuknya, yaitu uji Lucas–Lehmer.

Karena teorema Euclid–Euler, setiap prima Mersenne baru langsung menghasilkan satu bilangan sempurna genap baru. Jadi pertanyaan ini setara dengan: apakah bilangan sempurna genap tak hingga banyaknya?`,contoh:String.raw`Prima Mersenne pertama:

$$
M_2 = 3,\quad M_3 = 7,\quad M_5 = 31,\quad M_7 = 127,\quad M_{13} = 8191.
$$

Tetapi $p$ prima tidak menjamin $M_p$ prima:

$$
M_{11} = 2047 = 23 \times 89.
$$

Sampai 2024 baru ditemukan 52 prima Mersenne, dan yang terbesar punya lebih dari 41 juta digit. Hampir semua rekor bilangan prima terbesar sepanjang sejarah komputer dipegang prima Mersenne, karena uji Lucas–Lehmer jauh lebih cepat daripada uji umum.

Konjektur Lenstra–Pomerance–Wagstaff memperkirakan banyaknya prima Mersenne dengan $p \le x$ tumbuh seperti $e^{\gamma}\log x/\log 2$ — perkiraan yang cocok dengan data, tapi tetap konjektur.`,kemajuan:String.raw`- Proyek GIMPS (Great Internet Mersenne Prime Search) menyumbangkan komputer sukarelawan sejak 1996 dan menemukan belasan prima Mersenne baru.
- Yang bisa dibuktikan sejauh ini hanya hasil bersyarat dan heuristik; tidak ada bukti ketakhinggaan.
- Bahkan pertanyaan yang tampak lebih mudah — apakah tak hingga banyak $M_p$ yang komposit — juga belum terbukti.`,kenapaSulit:String.raw`Tidak ada metode yang bisa menjamin kemunculan prima di dalam barisan yang tumbuh secepat $2^p$. Barisan itu terlalu jarang: sampai batas $N$ hanya ada sekitar $\log N$ calon, sementara semua teknik saringan butuh barisan yang jauh lebih padat.

Karena itu, setiap penemuan prima Mersenne baru menambah data, tapi sama sekali tidak mendekatkan kita pada bukti.`,bacaan:[{judul:"Wikipedia — Mersenne prime",url:"https://en.wikipedia.org/wiki/Mersenne_prime"},{judul:"GIMPS — Great Internet Mersenne Prime Search",url:"https://www.mersenne.org/"}]},{slug:"prima-fermat",nama:"Prima Fermat",namaEn:"Fermat Primes",label:[a],tahun:1640,penggagas:"Pierre de Fermat",ringkas:"Fermat menduga semua bilangan 2^(2^n) + 1 prima. Ternyata salah, dan sekarang belum ada yang tahu apakah jumlahnya lima atau tak hingga.",pernyataan:String.raw`Bilangan Fermat didefinisikan sebagai

$$
F_n = 2^{2^{n}} + 1.
$$

**Masalahnya:** ada berapa banyak $F_n$ yang prima? Apakah hanya lima yang sudah diketahui, ataukah masih ada yang lain, bahkan tak hingga banyak?`,latar:String.raw`Fermat pada 1640 menduga semua $F_n$ prima. Dugaannya bertahan sampai Euler membuktikannya salah pada 1732 dengan memfaktorkan

$$
F_5 = 4\,294\,967\,297 = 641 \times 6\,700\,417.
$$

Bilangan Fermat punya peran indah di geometri: teorema Gauss–Wantzel menyatakan poligon beraturan bersisi $n$ bisa dilukis dengan jangka dan penggaris tepat ketika $n$ adalah hasil kali pangkat dua dengan prima Fermat berbeda. Itulah kenapa segi-17 bisa dilukis — Gauss menemukannya saat berusia 19 tahun.`,contoh:String.raw`Lima prima Fermat yang diketahui:

$$
F_0 = 3,\quad F_1 = 5,\quad F_2 = 17,\quad F_3 = 257,\quad F_4 = 65\,537.
$$

Sejak $F_5$, semua bilangan Fermat yang berhasil diperiksa ternyata komposit. Pemeriksaan sudah dilakukan untuk banyak $n$ sampai sekitar $n = 32$ dan lebih jauh lagi untuk faktor-faktor parsialnya, tanpa satu pun prima baru.

Sebagian besar ahli sekarang menduga kebalikan dari dugaan Fermat: bahwa **hanya ada lima** prima Fermat. Tetapi tidak ada bukti untuk itu, dan tidak ada juga bukti bahwa jumlahnya berhingga.`,kemajuan:String.raw`- Banyak faktor prima bilangan Fermat ditemukan lewat pencarian terdistribusi, misalnya proyek Fermatsearch.
- Diketahui $F_n$ komposit untuk semua $5 \le n \le 32$, dan komposit untuk banyak $n$ besar lain yang faktornya kebetulan ditemukan.
- Heuristik probabilistik memperkirakan jumlah prima Fermat berhingga, karena $F_n$ tumbuh sangat cepat.`,kenapaSulit:String.raw`Bilangan Fermat tumbuh ganda eksponensial: $F_{33}$ saja sudah punya lebih dari dua miliar digit. Memeriksanya secara langsung di luar kemampuan komputer mana pun, sehingga data yang bisa dikumpulkan sangat terbatas.

Selain itu, sama seperti prima Mersenne, tidak ada metode yang bisa memaksa kemunculan atau ketiadaan prima di barisan sejarang ini.`,bacaan:[{judul:"Wikipedia — Fermat number",url:"https://en.wikipedia.org/wiki/Fermat_number"}]},{slug:"konjektur-erdos-straus",nama:"Konjektur Erdős–Straus",namaEn:"Erdős–Straus Conjecture",label:[a],tahun:1948,penggagas:"Paul Erdős dan Ernst Straus",ringkas:"Setiap pecahan 4/n bisa ditulis sebagai jumlah tiga pecahan satuan. Sudah diperiksa sampai n = 10¹⁷.",pernyataan:String.raw`**Konjektur Erdős–Straus:** untuk setiap bilangan asli $n \ge 2$, terdapat bilangan asli $x, y, z$ sehingga

$$
\frac{4}{n} = \frac{1}{x} + \frac{1}{y} + \frac{1}{z}.
$$

Pecahan berbentuk $1/x$ disebut pecahan satuan, dan penulisan seperti ini disebut ekspansi Mesir.`,latar:String.raw`Orang Mesir kuno menuliskan semua pecahan sebagai jumlah pecahan satuan, dan kebiasaan itu melahirkan pertanyaan matematis yang bertahan sampai sekarang. Fibonacci membuktikan setiap pecahan bisa ditulis begitu dengan algoritma rakus, tapi banyaknya suku tidak dibatasi.

Erdős dan Straus mempersempit pertanyaannya: untuk pembilang $4$, apakah tiga suku selalu cukup? Sirpiński mengajukan pertanyaan serupa untuk pembilang $5$.`,contoh:String.raw`Beberapa contoh:

$$
\frac{4}{3} = \frac{1}{1} + \frac{1}{4} + \frac{1}{12}, \qquad
\frac{4}{5} = \frac{1}{2} + \frac{1}{4} + \frac{1}{20}, \qquad
\frac{4}{7} = \frac{1}{2} + \frac{1}{15} + \frac{1}{210}.
$$

Kasus $n$ komposit mudah: kalau $4/d$ sudah punya ekspansi dan $d \mid n$, ekspansi $4/n$ tinggal mengalikan penyebutnya. Jadi yang benar-benar perlu dibuktikan hanya kasus $n$ prima.

Lebih jauh lagi, aritmetika modular menyingkirkan hampir semua sisa: yang tersisa hanyalah prima $n \equiv 1, 11^2, 13^2, 17^2, 19^2, 23^2 \pmod{840}$. Tetap saja, kelas tersisa itu berisi tak hingga banyak prima.`,kemajuan:String.raw`- Verifikasi komputer sudah mencapai $n \le 10^{17}$ tanpa satu pun tandingan.
- Banyak kelas kongruensi terbukti selalu punya ekspansi, sehingga yang tersisa tinggal sedikit kelas.
- Vaughan (1970) membuktikan banyaknya $n \le N$ yang mungkin gagal paling banyak sekitar $N \exp(-c(\log N)^{2/3})$ — sangat sedikit, tapi belum nol.`,kenapaSulit:String.raw`Argumen modular hanya bisa menyingkirkan kelas sisa, dan justru kelas yang tersisa adalah yang paling membandel. Untuk menutupnya dibutuhkan konstruksi eksplisit yang berlaku untuk tak hingga banyak prima sekaligus, dan itu belum ditemukan.

Pola seperti ini khas pada masalah pecahan Mesir: banyak kasus gampang, sisa kasusnya sedikit tapi keras kepala.`,bacaan:[{judul:"Wikipedia — Erdős–Straus conjecture",url:"https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93Straus_conjecture"}]},{slug:"konjektur-beal",nama:"Konjektur Beal",namaEn:"Beal Conjecture",label:[a],tahun:1993,penggagas:"Andrew Beal",hadiah:"US$1.000.000 dari Andrew Beal (dikelola AMS)",ringkas:"Perumuman Teorema Terakhir Fermat: kalau A^x + B^y = C^z dengan pangkat lebih dari 2, ketiganya harus punya faktor prima bersama.",pernyataan:String.raw`**Konjektur Beal:** jika

$$
A^x + B^y = C^z
$$

dengan $A, B, C$ bilangan asli dan $x, y, z$ bilangan asli lebih dari $2$, maka $A$, $B$, dan $C$ punya faktor prima bersama.

Teorema Terakhir Fermat adalah kasus khusus $x = y = z$: di situ syarat faktor bersama membuat solusinya mustahil untuk bilangan koprima.`,latar:String.raw`Andrew Beal, seorang bankir dan matematikawan amatir, merumuskan konjektur ini pada 1993 saat bereksperimen dengan komputer. Ia menawarkan hadiah yang nilainya dinaikkan bertahap sampai satu juta dolar, dikelola American Mathematical Society.

Setelah Wiles menuntaskan Teorema Terakhir Fermat pada 1995, konjektur Beal menjadi salah satu perumuman yang paling terkenal dan paling banyak diserang matematikawan amatir.`,contoh:String.raw`Contoh yang memenuhi persamaan itu memang ada, dan semuanya punya faktor bersama:

$$
3^3 + 6^3 = 3^5 \quad (27 + 216 = 243),
$$

di sini $3$, $6$, dan $3$ sama-sama habis dibagi $3$. Contoh lain:

$$
7^6 + 7^7 = 98^3.
$$

Yang belum pernah ditemukan adalah contoh dengan $A$, $B$, $C$ yang koprima. Pencarian komputer sudah menyisir semua nilai sampai batas besar untuk pangkat kecil tanpa hasil.`,kemajuan:String.raw`- Banyak kasus khusus terbukti, misalnya untuk kombinasi pangkat tertentu seperti $(3,3,n)$, $(3,4,5)$, dan banyak lagi, memakai kurva eliptik dan metode modular yang sama dengan bukti Wiles.
- Kalau konjektur abc benar, maka hanya ada berhingga banyak tandingan yang mungkin.
- Belum ada yang berhasil menangani semua kombinasi pangkat sekaligus.`,kenapaSulit:String.raw`Bukti Wiles bekerja karena kasus $x = y = z$ bisa diterjemahkan menjadi satu keluarga kurva eliptik yang sangat khusus. Begitu pangkatnya boleh berbeda-beda, keluarga kurva yang harus ditangani menjadi tak hingga banyak dan tidak seragam.

Setiap kombinasi pangkat praktis menjadi masalah penelitian tersendiri, dan sampai sekarang belum ada kerangka tunggal yang mencakup semuanya.`,bacaan:[{judul:"American Mathematical Society — The Beal Prize",url:"https://www.ams.org/profession/prizes-awards/ams-supported/beal-prize"},{judul:"Wikipedia — Beal conjecture",url:"https://en.wikipedia.org/wiki/Beal_conjecture"}]},{slug:"masalah-totien-lehmer",nama:"Masalah Totien Lehmer",namaEn:"Lehmer's Totient Problem",label:[a],tahun:1932,penggagas:"Derrick Henry Lehmer",ringkas:"Kalau φ(n) membagi n − 1, apakah n pasti prima? Tandingannya, kalau ada, pasti raksasa.",pernyataan:String.raw`Fungsi totien Euler $\varphi(n)$ menghitung banyaknya bilangan dari $1$ sampai $n$ yang koprima dengan $n$. Kalau $n$ prima, jelas $\varphi(n) = n - 1$, sehingga $\varphi(n) \mid n-1$.

**Masalah Lehmer:** apakah berlaku sebaliknya? Yaitu, apakah

$$
\varphi(n) \mid n - 1 \implies n \text{ prima}?
$$`,latar:String.raw`Lehmer mengajukan pertanyaan ini pada 1932. Kalau jawabannya ya, kita mendapat uji keprimaan yang sangat elegan. Kalau tidak, bilangan komposit yang memenuhinya disebut bilangan Lehmer, dan sampai sekarang belum ada satu pun yang ditemukan.

Pertanyaan ini mirip pola yang sering muncul di teori bilangan: sifat yang jelas dimiliki bilangan prima, lalu ditanyakan apakah sifat itu menjadi ciri khas yang membedakannya.`,contoh:String.raw`Untuk $n = 7$: $\varphi(7) = 6$ dan $6 \mid 6$. Cocok, dan $7$ memang prima.

Untuk $n = 15$: $\varphi(15) = 8$, sedangkan $n - 1 = 14$. Karena $8 \nmid 14$, bilangan ini bukan tandingan.

Semua bilangan komposit yang pernah diperiksa gagal memenuhi syarat itu. Yang sudah dibuktikan adalah batasan yang mengejutkan ketatnya: bilangan Lehmer, kalau ada, harus ganjil, bebas kuadrat, punya sedikitnya 15 faktor prima berbeda, dan nilainya lebih dari $10^{22}$.`,kemajuan:String.raw`- Lehmer sendiri membuktikan tandingannya harus punya sedikitnya 7 faktor prima; batas itu terus dinaikkan oleh peneliti berikutnya menjadi belasan.
- Kalau tandingannya habis dibagi $3$, syaratnya bahkan lebih ekstrem lagi, yaitu ratusan faktor prima.
- Belum ada bukti ketiadaan, dan belum ada tandingan.`,kenapaSulit:String.raw`Syarat $\varphi(n) \mid n-1$ menghubungkan struktur perkalian (lewat $\varphi$) dengan struktur penjumlahan (lewat $n-1$). Setiap faktor prima tambahan membuat $\varphi(n)$ makin kecil dibanding $n$, sehingga syaratnya makin sulit dipenuhi — tapi "makin sulit" bukan berarti mustahil.

Argumen yang ada hanya sanggup mendorong batasnya makin tinggi, tanpa pernah menutup kemungkinan terakhir.`,bacaan:[{judul:"Wikipedia — Lehmer's totient problem",url:"https://en.wikipedia.org/wiki/Lehmer%27s_totient_problem"}]},{slug:"irasionalitas-konstanta-euler",nama:"Irasionalitas Konstanta Euler–Mascheroni",namaEn:"Irrationality of the Euler–Mascheroni Constant",label:[a,"Analisis"],tahun:1734,penggagas:"Leonhard Euler",ringkas:"Konstanta γ muncul di mana-mana dalam matematika, tapi sampai sekarang belum diketahui apakah ia bilangan rasional atau bukan.",pernyataan:String.raw`Konstanta Euler–Mascheroni didefinisikan sebagai

$$
\gamma = \lim_{n \to \infty}\left( \sum_{k=1}^{n} \frac{1}{k} - \ln n \right) \approx 0{,}5772156649.
$$

**Masalahnya:** apakah $\gamma$ irasional? Apakah ia transenden? Kedua pertanyaan itu belum terjawab.`,latar:String.raw`Euler menghitung konstanta ini pada 1734 sebagai selisih antara deret harmonik dan logaritma natural. Sejak itu $\gamma$ muncul di banyak tempat: rumus banyaknya pembagi, teori bilangan analitik, analisis algoritma, sampai fisika statistik.

Bandingkan dengan tetangganya: $e$ terbukti irasional (Euler, 1737) dan transenden (Hermite, 1873); $\pi$ terbukti irasional (Lambert, 1761) dan transenden (Lindemann, 1882). Sementara $\gamma$, yang sama seringnya muncul, statusnya masih gelap.`,contoh:String.raw`Beberapa pertanyaan sejenis yang juga terbuka:

- Apakah $\zeta(5)$ irasional? Untuk $\zeta(3)$ jawabannya ya, dibuktikan Apéry pada 1978, dan kejutan itu sampai sekarang belum bisa ditiru untuk $\zeta(5)$.
- Apakah $\pi + e$ irasional? Diketahui setidaknya satu dari $\pi + e$ dan $\pi e$ pasti irasional, tapi tidak diketahui yang mana.
- Apakah $\pi$ bilangan normal, yaitu setiap barisan digit muncul dengan frekuensi yang seharusnya? Belum terbukti, meski triliunan digit sudah dihitung.

Untuk $\gamma$, perhitungan sudah mencapai triliunan digit desimal, dan kalau $\gamma = p/q$ maka penyebutnya $q$ harus lebih besar daripada $10^{244663}$.`,kemajuan:String.raw`- Hasil bersyarat: kombinasi tertentu yang melibatkan $\gamma$ diketahui irasional, tapi tidak $\gamma$ sendiri.
- Rivoal dan Zudilin membuktikan hasil serupa untuk nilai zeta ganjil: tak hingga banyak di antaranya irasional, dan setidaknya satu dari $\zeta(5), \zeta(7), \zeta(9), \zeta(11)$ irasional.
- Untuk $\gamma$ sendiri, tidak ada satu pun hasil tak bersyarat.`,kenapaSulit:String.raw`Bukti irasionalitas biasanya membutuhkan aproksimasi rasional yang sangat baik dan dapat dikendalikan, misalnya lewat pecahan lanjut atau aproksimasi Padé. Untuk $\gamma$, tidak ada representasi yang memberi barisan aproksimasi seperti itu.

Bukti Apéry untuk $\zeta(3)$ dianggap keberuntungan langka yang sampai sekarang belum bisa diulang, dan $\gamma$ bahkan tidak punya titik masuk yang mirip.`,bacaan:[{judul:"Wikipedia — Euler–Mascheroni constant",url:"https://en.wikipedia.org/wiki/Euler%27s_constant"},{judul:"Wikipedia — Apéry's theorem",url:"https://en.wikipedia.org/wiki/Ap%C3%A9ry%27s_theorem"}]},{slug:"kubus-sempurna-euler",nama:"Kubus Sempurna Euler",namaEn:"Perfect Cuboid",label:[a,"Geometri"],tahun:1719,penggagas:"Paul Halcke",ringkas:"Adakah balok yang panjang rusuk, semua diagonal sisi, dan diagonal ruangnya sekaligus bilangan bulat?",pernyataan:String.raw`Cari balok dengan rusuk $a, b, c$ sedemikian sehingga semuanya bilangan bulat, ketiga diagonal sisinya bilangan bulat,

$$
\sqrt{a^2+b^2},\quad \sqrt{b^2+c^2},\quad \sqrt{a^2+c^2} \in \mathbb{Z},
$$

dan diagonal ruangnya juga bilangan bulat:

$$
\sqrt{a^2+b^2+c^2} \in \mathbb{Z}.
$$

**Masalahnya:** apakah balok seperti itu ada? Belum ada yang menemukannya, dan belum ada yang membuktikan tidak mungkin.`,latar:String.raw`Balok Euler adalah versi setengah jadi: rusuk dan ketiga diagonal sisinya bulat, tapi diagonal ruangnya tidak. Contoh terkecil ditemukan Paul Halcke pada 1719 dengan rusuk $44$, $117$, dan $240$.

Menambahkan syarat diagonal ruang membuat masalahnya melompat jauh lebih sulit. Ini pada dasarnya soal mencari solusi bulat untuk sistem empat persamaan kuadrat sekaligus.`,contoh:String.raw`Balok Euler terkecil, rusuk $(44, 117, 240)$:

$$
\sqrt{44^2+117^2} = 125, \qquad \sqrt{117^2+240^2} = 267, \qquad \sqrt{44^2+240^2} = 244,
$$

semuanya bulat. Tapi diagonal ruangnya

$$
\sqrt{44^2+117^2+240^2} = \sqrt{73\,225} \approx 270{,}6
$$

bukan bilangan bulat. Sampai sekarang belum ada satu pun contoh yang keempat-empatnya bulat, meski pencarian komputer sudah menyisir rusuk sampai ukuran yang sangat besar.`,kemajuan:String.raw`- Banyak syarat wajib sudah diturunkan: misalnya satu rusuk harus habis dibagi $4$, satu habis dibagi $16$, ada rusuk yang habis dibagi $3$, $9$, dan $11$, dan seterusnya.
- Pencarian komputer terus memperbesar batas bawah ukuran rusuk tanpa menemukan contoh.
- Varian yang lebih longgar, misalnya paralelepipedum sempurna, sudah ditemukan contohnya — jadi masalahnya memang bergantung pada detail syaratnya.`,kenapaSulit:String.raw`Empat syarat kuadrat sekaligus mendefinisikan permukaan berdimensi tinggi dalam ruang solusi, dan mencari titik rasional pada permukaan semacam itu adalah salah satu masalah tersulit di geometri Diophantine.

Alat modular hanya bisa menyingkirkan sebagian kandidat, sedangkan pencarian komputer hanya bisa menutup daerah berhingga.`,bacaan:[{judul:"Wikipedia — Euler brick",url:"https://en.wikipedia.org/wiki/Euler_brick"}]}],e="Kombinatorika",t="Teori Graf",g=[{slug:"bilangan-ramsey",nama:"Bilangan Ramsey R(5,5)",namaEn:"Ramsey Number R(5,5)",label:[e],tahun:1930,penggagas:"Frank Ramsey",ringkas:"Berapa orang minimal agar pasti ada 5 yang saling kenal atau 5 yang saling asing? Jawabannya cuma diketahui berada antara 43 dan 46.",pernyataan:String.raw`Bilangan Ramsey $R(s,t)$ adalah bilangan terkecil $n$ sehingga setiap pewarnaan sisi graf lengkap $K_n$ dengan dua warna pasti memuat $K_s$ berwarna pertama atau $K_t$ berwarna kedua.

**Masalahnya:** berapa nilai $R(5,5)$? Yang diketahui hanya

$$
43 \le R(5,5) \le 46.
$$

Nilai pastinya belum diketahui, dan makin besar $s$ dan $t$, makin gelap keadaannya.`,latar:String.raw`Teorema Ramsey (1930) menjamin bilangan-bilangan ini ada. Masalahnya, menghitungnya sangat mahal. Yang sudah diketahui pasti antara lain $R(3,3) = 6$ dan $R(4,4) = 18$; sesudah itu, semuanya tinggal batas atas dan batas bawah.

Paul Erdős punya perumpamaan terkenal tentang masalah ini: kalau makhluk asing yang jauh lebih kuat mendarat dan menuntut nilai $R(5,5)$ atau bumi dihancurkan, sebaiknya seluruh matematikawan dan komputer dikerahkan untuk menghitungnya. Tapi kalau yang diminta $R(6,6)$, lebih baik kita menyerang duluan.`,contoh:String.raw`Kasus $R(3,3) = 6$ bisa diperiksa tangan: di antara enam orang, pasti ada tiga yang saling kenal atau tiga yang saling asing. Dengan lima orang, ada pengaturan yang menghindari keduanya, yaitu pewarnaan berbentuk siklus lima.

Untuk $R(5,5)$, memeriksa semua kemungkinan berarti menelusuri pewarnaan sisi $K_{45}$, yaitu $2^{990}$ kemungkinan — angka yang jauh melampaui jumlah atom di alam semesta teramati. Pencarian komputer hanya sanggup mempersempit batas, bukan menuntaskan.`,kemajuan:String.raw`- Batas bawah $43$ berasal dari konstruksi graf eksplisit yang tidak memuat $K_5$ pada kedua warna.
- Batas atasnya diperbaiki bertahap, dan pada 2024 Angeltveit dan McKay menurunkannya menjadi $46$.
- Untuk kasus umum, terobosan besar datang pada 2023 ketika Campos, Griffiths, Morris, dan Sahasrabudhe memperbaiki batas atas eksponensial klasik $4^n$ untuk pertama kalinya sejak 1935.

Banyak ahli menduga $R(5,5) = 43$, tapi menduga bukan membuktikan.`,kenapaSulit:String.raw`Jumlah kemungkinan tumbuh sangat cepat sehingga pencarian menyeluruh mustahil, sementara metode probabilistik hanya memberi batas kasar. Untuk nilai pasti, dibutuhkan konstruksi cerdas sekaligus argumen yang menutup semua kemungkinan lain.

Itu sebabnya kemajuan di bidang ini diukur dalam satuan selisih satu atau dua, bukan lompatan besar.`,bacaan:[{judul:"Wikipedia — Ramsey's theorem",url:"https://en.wikipedia.org/wiki/Ramsey%27s_theorem"},{judul:"Dynamic Survey of Small Ramsey Numbers",url:"https://www.combinatorics.org/ojs/index.php/eljc/article/view/DS1"}]},{slug:"konjektur-frankl",nama:"Konjektur Himpunan Tertutup Gabungan",namaEn:"Union-Closed Sets Conjecture (Frankl's Conjecture)",label:[e],tahun:1979,penggagas:"Péter Frankl",ringkas:"Pada keluarga himpunan yang tertutup terhadap gabungan, pasti ada satu unsur yang muncul di separuh anggotanya. Baru terbukti sampai 38 persen.",pernyataan:String.raw`Sebuah keluarga himpunan berhingga $\mathcal{F}$ disebut tertutup terhadap gabungan kalau untuk setiap $A, B \in \mathcal{F}$ berlaku $A \cup B \in \mathcal{F}$.

**Konjektur Frankl:** untuk setiap keluarga seperti itu yang memuat paling sedikit satu himpunan tak kosong, ada unsur $x$ yang termuat di setidaknya separuh anggota $\mathcal{F}$.`,latar:String.raw`Frankl mengajukannya pada 1979. Pernyataannya begitu sederhana sehingga terlihat seperti latihan, tapi bertahan puluhan tahun. Timothy Gowers pernah menyebutnya contoh masalah yang membuat orang meragukan pemahaman kita tentang objek yang sangat dasar.

Selama puluhan tahun tidak ada kemajuan kuantitatif sama sekali — bahkan konstanta sekecil apa pun belum bisa dibuktikan.`,contoh:String.raw`Ambil keluarga

$$
\mathcal{F} = \{\emptyset, \{1\}, \{2\}, \{1,2\}\}.
$$

Gabungan anggota mana pun tetap di dalam keluarga, jadi ia tertutup terhadap gabungan. Unsur $1$ muncul di dua dari empat anggota, yaitu tepat separuh. Begitu juga unsur $2$. Konjekturnya terpenuhi, bahkan pas di batas.

Yang membuat masalah ini menipu: keluarga seperti ini bisa disusun dengan sangat banyak cara, dan tidak ada cara jelas untuk menunjuk unsur mana yang seharusnya sering muncul.`,kemajuan:String.raw`- Terbukti benar untuk keluarga kecil, misalnya yang beranggota sampai puluhan himpunan, dan untuk keluarga yang memuat himpunan berukuran satu atau dua.
- **2022** — Justin Gilmer memberi terobosan pertama memakai teori informasi: selalu ada unsur yang muncul di setidaknya $1\%$ anggota.
- Dalam hitungan minggu, beberapa kelompok memperbaiki konstanta itu menjadi sekitar $0{,}38$, yaitu $(3-\sqrt5)/2$, yang tampaknya batas alami metode tersebut.

Jarak dari $0{,}38$ ke $0{,}5$ terlihat kecil, tapi metode yang sekarang mentok di situ.`,kenapaSulit:String.raw`Tidak ada struktur yang bisa dipegang: keluarga tertutup gabungan bisa terlihat sangat berbeda-beda, dan tidak ada kandidat unsur yang jelas untuk diperiksa.

Pendekatan entropi Gilmer memberi jalan baru, tapi batas $0{,}38$ muncul dari ketaksamaan dasar yang dipakai, sehingga menembusnya butuh ide yang benar-benar lain.`,bacaan:[{judul:"Wikipedia — Union-closed sets conjecture",url:"https://en.wikipedia.org/wiki/Union-closed_sets_conjecture"},{judul:"Quanta Magazine — Mathematician hurls structure and disorder into century-old problem",url:"https://www.quantamagazine.org/mathematician-hurls-structure-and-disorder-into-century-old-problem-20221011/"}]},{slug:"konjektur-bunga-matahari",nama:"Konjektur Bunga Matahari",namaEn:"Sunflower Conjecture",label:[e],tahun:1960,penggagas:"Paul Erdős dan Richard Rado",ringkas:"Berapa banyak himpunan berukuran k yang diperlukan agar pasti muncul pola bunga matahari? Jawabannya diduga c^k, dan batas terbaik masih di atasnya.",pernyataan:String.raw`Sekumpulan himpunan $A_1, \ldots, A_r$ disebut **bunga matahari** dengan inti $Y$ kalau irisan setiap dua himpunan berbeda sama persis dengan $Y$. Kelopaknya adalah bagian di luar inti, dan kelopak itu saling lepas.

Erdős dan Rado membuktikan: setiap keluarga berisi lebih dari $k!(r-1)^k$ himpunan berukuran $k$ pasti memuat bunga matahari dengan $r$ kelopak.

**Konjektur bunga matahari:** batas itu bisa diperbaiki menjadi $C^k$ untuk suatu konstanta $C$ yang hanya bergantung pada $r$.`,latar:String.raw`Erdős menawarkan hadiah $1000 untuk penyelesaiannya, salah satu nominal tertinggi yang pernah ia janjikan. Alasannya, lemma bunga matahari muncul di mana-mana: teori kompleksitas rangkaian, algoritma parameter tetap, sampai kombinatorika ekstremal.

Selisih antara $k!$ dan $C^k$ sangat besar. Kalau konjekturnya benar, banyak hasil di bidang lain langsung ikut membaik.`,contoh:String.raw`Ambil himpunan berukuran $2$:

$$
\{1,2\},\ \{1,3\},\ \{1,4\}
$$

Ini bunga matahari dengan tiga kelopak dan inti $\{1\}$. Sedangkan

$$
\{1,2\},\ \{2,3\},\ \{1,3\}
$$

bukan, karena irisan pasangan-pasangannya tidak sama.

Untuk $k = 2$ dan $r = 3$, lemma Erdős–Rado menjamin bunga matahari muncul begitu ada lebih dari $2! \cdot 2^2 = 8$ himpunan. Untuk $k$ besar, faktor $k!$ inilah yang terlalu boros menurut konjekturnya.`,kemajuan:String.raw`- **2019** — Alweiss, Lovett, Wu, dan Zhang memperbaiki batasnya secara dramatis menjadi sekitar $(\log k)^{k}$ dikalikan faktor yang tidak bergantung $k$ secara berlebihan; hasil ini kemudian dirapikan lagi oleh peneliti lain.
- Ini kemajuan besar pertama sejak 1960, dan mempersempit jarak dari $k!$ menjadi tinggal faktor $(\log k)^k$.
- Konjektur aslinya, yaitu batas $C^k$, tetap terbuka.`,kenapaSulit:String.raw`Masalahnya berada di persimpangan antara struktur dan keacakan: keluarga himpunan yang mau dihindari harus cukup teratur untuk menghindari bunga matahari, tapi keteraturan itu justru memaksa munculnya pola lain.

Terobosan 2019 datang dari cara berpikir probabilistik yang baru, dan bahkan pendekatan itu pun belum sampai ke batas yang diduga.`,bacaan:[{judul:"Wikipedia — Sunflower (mathematics)",url:"https://en.wikipedia.org/wiki/Sunflower_(mathematics)"},{judul:"Quanta Magazine — Mathematicians begin to tame wild sunflower problem",url:"https://www.quantamagazine.org/mathematicians-begin-to-tame-wild-sunflower-problem-20191021/"}]},{slug:"konjektur-hadwiger",nama:"Konjektur Hadwiger",namaEn:"Hadwiger Conjecture",label:[t,e],tahun:1943,penggagas:"Hugo Hadwiger",ringkas:"Perumuman besar teorema empat warna: graf yang tidak memuat minor K_t pasti bisa diwarnai dengan t − 1 warna. Terbukti sampai t = 6.",pernyataan:String.raw`**Konjektur Hadwiger:** kalau sebuah graf tidak memuat $K_t$ sebagai minor, maka graf itu dapat diwarnai dengan $t-1$ warna sehingga tidak ada dua simpul bertetangga berwarna sama.

Minor artinya $K_t$ bisa diperoleh dengan menghapus simpul, menghapus sisi, dan mengerutkan sisi.`,latar:String.raw`Hadwiger mengajukannya pada 1943, dan konjektur ini sering disebut salah satu masalah terbuka terpenting di teori graf. Alasannya, ia memuat teorema empat warna sebagai kasus khusus: graf planar tidak memuat minor $K_5$, jadi kasus $t = 5$ setara dengan pernyataan bahwa peta bisa diwarnai empat warna.

Teorema empat warna sendiri baru selesai pada 1976 lewat bukti berbantuan komputer. Konjektur Hadwiger menuntut jauh lebih banyak.`,contoh:String.raw`Kasus kecil bisa dicek langsung:

- $t = 2$: graf tanpa minor $K_2$ berarti tidak punya sisi, jadi satu warna cukup.
- $t = 3$: graf tanpa minor $K_3$ adalah hutan, dan hutan selalu bisa diwarnai dua warna.
- $t = 4$: dibuktikan Hadwiger dan Dirac.
- $t = 5$: setara dengan teorema empat warna (Wagner, 1937), jadi selesai setelah 1976.
- $t = 6$: dibuktikan Robertson, Seymour, dan Thomas pada 1993, dengan mengandalkan teorema empat warna.

Untuk $t \ge 7$, belum ada yang berhasil.`,kemajuan:String.raw`- Kasus $t \le 6$ tuntas, masing-masing dengan bukti yang jauh lebih rumit dari sebelumnya.
- Untuk kasus umum, yang bisa dibuktikan baru batas lemah: graf tanpa minor $K_t$ bisa diwarnai dengan sekitar $t \sqrt{\log t}$ warna, hasil yang diperbaiki bertahap sejak 1980-an sampai hasil Delcourt dan Postle pada 2021.
- Jarak antara $t-1$ dan $t\sqrt{\log t}$ masih terbuka.`,kenapaSulit:String.raw`Setiap kenaikan satu nilai $t$ memerlukan pemahaman struktur graf yang jauh lebih dalam, dan bukti untuk $t = 6$ saja sudah bergantung pada bukti berbantuan komputer untuk empat warna.

Selain itu, konjektur ini menghubungkan sifat topologis (adanya minor) dengan sifat pewarnaan, dan hubungan itu tidak punya alasan struktural yang jelas.`,bacaan:[{judul:"Wikipedia — Hadwiger conjecture (graph theory)",url:"https://en.wikipedia.org/wiki/Hadwiger_conjecture_(graph_theory)"}]},{slug:"konjektur-rekonstruksi",nama:"Konjektur Rekonstruksi",namaEn:"Reconstruction Conjecture",label:[t],tahun:1942,penggagas:"Paul Kelly dan Stanisław Ulam",ringkas:"Apakah sebuah graf bisa disusun ulang hanya dari kumpulan potongannya, yaitu semua subgraf hasil penghapusan satu simpul?",pernyataan:String.raw`Untuk graf $G$ dengan simpul $v_1, \ldots, v_n$, bentuk kumpulan (multiset) subgraf

$$
G - v_1,\ G - v_2,\ \ldots,\ G - v_n,
$$

yaitu graf hasil penghapusan satu simpul, masing-masing tanpa label. Kumpulan itu disebut dek.

**Konjektur rekonstruksi:** untuk $n \ge 3$, dua graf dengan dek yang sama pasti isomorfik. Dengan kata lain, dek menentukan grafnya secara tunggal.`,latar:String.raw`Kelly dan Ulam merumuskannya pada 1940-an. Analogi populernya: kalau sebuah foto dirobek menjadi beberapa potongan dan setiap potongan menghilangkan tepat satu orang, apakah foto aslinya bisa direkonstruksi?

Untuk $n = 2$ konjekturnya salah — dua graf berbeda pada dua simpul punya dek yang sama — dan itulah kenapa syarat $n \ge 3$ diperlukan.`,contoh:String.raw`Beberapa informasi yang bisa dipulihkan dari dek dengan mudah:

- Banyaknya simpul: ukuran deknya sendiri.
- Banyaknya sisi: jumlah sisi seluruh anggota dek dibagi $n-2$.
- Derajat tiap simpul, dan bahkan banyaknya subgraf kecil tertentu, lewat lemma penghitungan Kelly.

Jadi banyak sifat graf terbukti bisa direkonstruksi. Yang belum bisa dipastikan adalah keseluruhan bentuk grafnya.`,kemajuan:String.raw`- Terbukti untuk banyak kelas: pohon, graf reguler, graf terputus, graf luar-planar, dan lainnya.
- Verifikasi komputer memastikan konjekturnya benar untuk semua graf sampai 13 simpul.
- Versi untuk graf berarah ternyata **salah**: Stockmeyer menemukan tandingannya pada 1977, sehingga intuisi "informasinya jelas cukup" perlu dipakai hati-hati.`,kenapaSulit:String.raw`Dek memberi banyak informasi statistik, tapi mengubah informasi itu menjadi konstruksi graf yang utuh adalah lompatan yang besar. Sampai sekarang tidak ada metode umum yang mampu merakit ulang graf dari potongannya.

Adanya tandingan pada versi berarah menunjukkan bahwa pernyataan ini bukan kebenaran umum yang mudah, melainkan bergantung pada sifat khusus graf tak berarah.`,bacaan:[{judul:"Wikipedia — Reconstruction conjecture",url:"https://en.wikipedia.org/wiki/Reconstruction_conjecture"}]},{slug:"konjektur-pohon-anggun",nama:"Konjektur Pohon Anggun",namaEn:"Graceful Tree Conjecture (Ringel–Kotzig)",label:[t],tahun:1963,penggagas:"Gerhard Ringel dan Anton Kotzig",ringkas:"Apakah setiap pohon bisa diberi label bilangan sedemikian rupa sehingga selisih sisi-sisinya tepat 1 sampai n − 1?",pernyataan:String.raw`Sebuah pohon dengan $n$ simpul disebut **anggun** kalau simpulnya bisa diberi label berbeda dari $\{0, 1, \ldots, n-1\}$ sehingga label sisi, yang didefinisikan sebagai selisih mutlak label kedua ujungnya, tepat menghasilkan semua nilai $1, 2, \ldots, n-1$ masing-masing satu kali.

**Konjektur pohon anggun:** setiap pohon berhingga adalah pohon anggun.`,latar:String.raw`Konjektur ini lahir dari masalah dekomposisi graf: Ringel menduga graf lengkap $K_{2n+1}$ dapat dipecah menjadi $2n+1$ salinan sebuah pohon berukuran $n+1$. Kotzig menghubungkannya dengan pelabelan anggun, dan sejak itu keduanya dikenal sebagai satu paket.

Istilah "anggun" sendiri diperkenalkan Solomon Golomb pada 1972.`,contoh:String.raw`Ambil lintasan dengan empat simpul dan beri label $0 - 3 - 1 - 2$. Selisih sisinya:

$$
|0-3| = 3, \qquad |3-1| = 2, \qquad |1-2| = 1.
$$

Ketiga nilai $1, 2, 3$ muncul tepat sekali, jadi pohon itu anggun.

Untuk bintang dengan pusat berlabel $0$ dan daun $1, 2, \ldots, n-1$, selisihnya otomatis $1$ sampai $n-1$. Jadi semua bintang anggun. Kesulitannya muncul pada pohon berbentuk aneh dengan banyak cabang panjang.`,kemajuan:String.raw`- Terbukti untuk banyak keluarga pohon: lintasan, bintang, ulat (caterpillar), pohon dengan paling banyak empat daun, dan lain-lain.
- Verifikasi komputer memastikan semua pohon sampai sekitar 35 simpul anggun.
- **2020** — Montgomery, Pokrovskiy, dan Sudakov membuktikan versi asimtotik konjektur Ringel untuk pohon besar, memakai metode probabilistik.

Meski begitu, pernyataan untuk **semua** pohon tetap belum terbukti.`,kenapaSulit:String.raw`Banyaknya pohon dengan $n$ simpul tumbuh eksponensial, dan bentuknya sangat beragam, sehingga tidak ada satu strategi pelabelan yang jelas berlaku untuk semuanya.

Pembuktian biasanya berjalan per keluarga pohon, dan tiap keluarga butuh trik tersendiri. Belum ada kerangka yang menyatukan semuanya.`,bacaan:[{judul:"Wikipedia — Graceful labeling",url:"https://en.wikipedia.org/wiki/Graceful_labeling"}]},{slug:"bilangan-kromatik-bidang",nama:"Bilangan Kromatik Bidang",namaEn:"Hadwiger–Nelson Problem",label:[e,"Geometri"],tahun:1950,penggagas:"Edward Nelson dan Hugo Hadwiger",ringkas:"Berapa warna minimal untuk mewarnai seluruh bidang agar tidak ada dua titik berjarak 1 yang sewarna? Jawabannya antara 5 dan 7.",pernyataan:String.raw`Warnai setiap titik pada bidang $\mathbb{R}^2$ sehingga dua titik yang berjarak tepat $1$ selalu berbeda warna.

**Masalahnya:** berapa banyak warna yang paling sedikit dibutuhkan? Bilangan itu disebut bilangan kromatik bidang, $\chi(\mathbb{R}^2)$, dan yang diketahui hanya

$$
5 \le \chi(\mathbb{R}^2) \le 7.
$$`,latar:String.raw`Edward Nelson mengajukannya pada 1950 saat masih mahasiswa. Batas atas $7$ datang dari pewarnaan bidang memakai ubin segi enam berukuran tepat, dan batas bawah $4$ datang dari graf kecil bernama spindle Moser.

Selama 68 tahun tidak ada kemajuan sama sekali pada kedua batas itu.`,contoh:String.raw`**Batas atas 7.** Tutupi bidang dengan segi enam beraturan berdiameter sedikit kurang dari $1$, lalu warnai dengan tujuh warna berpola berulang. Dua titik sewarna selalu berjarak lebih dari $1$ atau kurang dari $1$, tidak pernah tepat $1$.

**Batas bawah 5.** Pada 2018 Aubrey de Grey — yang lebih dikenal sebagai ahli biologi penuaan — menemukan graf jarak satuan dengan 1.581 simpul yang tidak bisa diwarnai dengan empat warna. Setelah itu proyek terbuka Polymath16 memangkas ukuran graf semacam itu menjadi sekitar 500 simpul.

Jadi jawabannya pasti $5$, $6$, atau $7$, dan tidak ada yang tahu yang mana.`,kemajuan:String.raw`- **1950–2018** — batasnya tetap $4 \le \chi \le 7$.
- **2018** — de Grey menaikkan batas bawah menjadi $5$; hasilnya diverifikasi komputer dan diterima luas.
- **2018–sekarang** — Polymath16 memperkecil graf tandingan dan mencoba menaikkan batas menjadi $6$, sejauh ini belum berhasil.
- Kalau pewarnaannya dibatasi pada himpunan yang terukur, diketahui dibutuhkan setidaknya $5$ warna dengan argumen berbeda.`,kenapaSulit:String.raw`Menaikkan batas bawah berarti menemukan graf jarak satuan terbatas yang butuh lebih banyak warna, dan pencariannya harus dilakukan komputer dengan ruang pencarian yang sangat besar.

Menurunkan batas atas berarti menemukan pewarnaan bidang yang lebih hemat, dan sejak 1950 belum ada yang berhasil mengalahkan pola tujuh warna.`,bacaan:[{judul:"Wikipedia — Hadwiger–Nelson problem",url:"https://en.wikipedia.org/wiki/Hadwiger%E2%80%93Nelson_problem"},{judul:"Quanta Magazine — Decades-old graph problem yields to amateur mathematician",url:"https://www.quantamagazine.org/decades-old-graph-problem-yields-to-amateur-mathematician-20180417/"}]},{slug:"konjektur-pelari-sepi",nama:"Konjektur Pelari Sepi",namaEn:"Lonely Runner Conjecture",label:[e,"Teori Bilangan"],tahun:1967,penggagas:"Jörg Wills",ringkas:"Beberapa pelari berlari di lintasan melingkar dengan kecepatan berbeda. Apakah setiap pelari pasti pernah merasa sepi?",pernyataan:String.raw`Ada $k$ pelari berangkat bersamaan dari titik yang sama pada lintasan melingkar berkeliling $1$, masing-masing dengan kecepatan tetap yang berbeda-beda.

**Konjektur pelari sepi:** untuk setiap pelari, ada suatu waktu ketika jaraknya ke semua pelari lain paling sedikit

$$
\frac{1}{k}.
$$

Pada saat itu pelari tersebut dikatakan sepi.`,latar:String.raw`Masalah ini muncul dari pertanyaan aproksimasi Diophantine yang dirumuskan Jörg Wills pada 1967, lalu muncul lagi secara terpisah dalam konteks geometri bilangan. Nama yang puitis itu diberikan Luis Goddyn pada 1998, dan sejak itu lebih dikenal daripada rumusan aslinya.

Kalau diterjemahkan, konjektur ini bertanya tentang seberapa jauh kelipatan bilangan bisa dijauhkan dari bilangan bulat secara serentak.`,contoh:String.raw`Untuk dua pelari berkecepatan $0$ dan $1$, pelari kedua pasti pernah berada pada jarak $1/2$ dari yang diam. Cocok dengan konjektur karena $1/k = 1/2$.

Untuk tiga pelari dengan kecepatan $0$, $1$, dan $2$: pada waktu $t = 1/3$ posisi mereka adalah $0$, $1/3$, dan $2/3$, sehingga semuanya berjarak $1/3$ satu sama lain. Batas $1/k = 1/3$ tercapai persis.

Kasus batas seperti ini membuat konjekturnya tidak bisa diperbaiki: angka $1/k$ memang yang terbaik.`,kemajuan:String.raw`- Terbukti untuk sampai tujuh pelari; kasus tujuh diselesaikan Barajas dan Serra pada 2008.
- Banyak kasus khusus terbukti, misalnya ketika kecepatannya membentuk barisan tertentu atau semuanya bilangan bulat dengan batasan ukuran.
- Untuk jumlah pelari yang lebih besar, yang ada baru hasil parsial dengan konstanta lebih lemah dari $1/k$.`,kenapaSulit:String.raw`Meski bunyinya seperti cerita, isinya adalah pertanyaan aproksimasi Diophantine serentak: mencari satu waktu $t$ yang sekaligus menjauhkan banyak kelipatan dari bilangan bulat. Syarat serentak inilah yang membuat jumlah kasus meledak.

Setiap penambahan satu pelari melipatgandakan kerumitan analisisnya, sehingga bukti kasus tujuh saja sudah sangat panjang.`,bacaan:[{judul:"Wikipedia — Lonely runner conjecture",url:"https://en.wikipedia.org/wiki/Lonely_runner_conjecture"}]}],r="Geometri",u="Analisis",d="Aljabar",p=[{slug:"konjektur-kakeya",nama:"Konjektur Kakeya",namaEn:"Kakeya Conjecture",label:[u,r],tahun:1917,penggagas:"Sōichi Kakeya",ringkas:"Himpunan yang memuat ruas garis satuan ke segala arah bisa berluas nol, tapi dimensinya diduga tetap penuh. Kasus tiga dimensi baru selesai 2025.",pernyataan:String.raw`Himpunan Kakeya di $\mathbb{R}^n$ adalah himpunan kompak yang memuat sebuah ruas garis satuan untuk **setiap** arah.

Besicovitch menunjukkan pada 1919 bahwa himpunan seperti itu bisa punya luas (ukuran Lebesgue) nol. Yang tersisa adalah pertanyaan tentang dimensinya.

**Konjektur Kakeya:** setiap himpunan Kakeya di $\mathbb{R}^n$ punya dimensi Hausdorff dan dimensi Minkowski sama dengan $n$.`,latar:String.raw`Kakeya bertanya pada 1917: berapa luas terkecil daerah yang memungkinkan sebatang jarum sepanjang satu satuan diputar penuh $180^{\circ}$? Jawabannya mengejutkan: luasnya bisa dibuat sekecil yang diinginkan.

Dari situ lahir studi tentang himpunan Kakeya, yang ternyata terhubung ke banyak masalah besar di analisis harmonik: konjektur restriksi, konjektur Bochner–Riesz, sampai persamaan gelombang. Kalau konjektur Kakeya jatuh, banyak hasil lain ikut bergerak.`,contoh:String.raw`Di bidang ($n = 2$), konjektur ini sudah lama terbukti: setiap himpunan Kakeya di $\mathbb{R}^2$ berdimensi $2$, meski luasnya boleh nol. Jadi ada himpunan "setipis debu" yang tetap memuat jarum ke segala arah.

Gambaran konstruksinya: ambil segitiga, potong menjadi banyak irisan tipis, lalu geser irisan-irisan itu agar saling bertumpuk sebanyak mungkin. Luas totalnya mengecil, tapi kumpulan arah yang tercakup tetap lengkap.

Di dimensi tiga, pertanyaan yang sama jauh lebih sulit, dan baru terjawab belakangan ini.`,kemajuan:String.raw`- **1919** — Besicovitch membangun himpunan Kakeya berukuran nol.
- **1971** — Davies menyelesaikan kasus $n = 2$.
- **1995–2020-an** — serangkaian perbaikan batas dimensi di $n = 3$ oleh Wolff, Katz, Łaba, Tao, dan lainnya, tapi tidak sampai nilai penuh.
- **2025** — Hong Wang dan Joshua Zahl mengumumkan bukti konjektur Kakeya untuk $\mathbb{R}^3$, salah satu hasil analisis paling dibicarakan tahun itu.

Untuk dimensi empat ke atas, konjekturnya masih terbuka.`,kenapaSulit:String.raw`Himpunan Kakeya bisa dibangun dengan cara yang sangat licin: garis-garisnya boleh saling bertumpuk hampir sepenuhnya, sehingga argumen sederhana berbasis volume langsung gagal.

Yang dibutuhkan adalah cara mengukur "seberapa banyak garis boleh berpotongan" di semua skala sekaligus. Alat untuk itu baru berkembang beberapa dekade terakhir, dan makin tinggi dimensinya makin banyak konfigurasi yang harus dikendalikan.`,bacaan:[{judul:"Wikipedia — Kakeya set",url:"https://en.wikipedia.org/wiki/Kakeya_set"},{judul:"Quanta Magazine — New proof threads the needle on a sticky geometry problem",url:"https://www.quantamagazine.org/new-proof-threads-the-needle-on-a-sticky-geometry-problem-20250314/"}]},{slug:"masalah-persegi-terinskripsi",nama:"Masalah Persegi Terinskripsi",namaEn:"Inscribed Square Problem (Toeplitz' Conjecture)",label:[r],tahun:1911,penggagas:"Otto Toeplitz",ringkas:"Apakah setiap kurva tertutup sederhana memuat empat titik yang membentuk persegi? Terbukti untuk kurva mulus, belum untuk kurva sembarang.",pernyataan:String.raw`**Konjektur Toeplitz:** setiap kurva Jordan, yaitu kurva tertutup sederhana di bidang, memuat empat titik yang membentuk persegi.

Kurva Jordan boleh sangat liar: tidak harus mulus, tidak harus punya panjang berhingga, bahkan boleh berbentuk fraktal.`,latar:String.raw`Toeplitz mengajukannya pada 1911. Untuk kurva yang mulus atau cembung, jawabannya sudah lama diketahui ya. Kesulitannya justru pada kurva yang sangat tidak beraturan, dan di situlah pertanyaan ini bertahan lebih dari seabad.

Masalah ini sering dipakai sebagai contoh bahwa pernyataan geometri yang terdengar sepele bisa menyimpan kesulitan besar begitu syarat kemulusannya dilepas.`,contoh:String.raw`Untuk lingkaran, jelas ada persegi terinskripsi: ambil empat titik berjarak sudut $90^{\circ}$.

Untuk kurva berbentuk tidak beraturan pun, kalau digambar tangan, persegi seperti itu selalu bisa ditemukan. Perhitungan komputer juga selalu menemukannya.

Hasil terkait yang sudah terbukti: setiap kurva Jordan memuat tak hingga banyak persegi panjang terinskripsi, dan (Greene–Lobb, 2020) untuk kurva mulus, persegi panjang dengan **setiap** perbandingan sisi bisa ditemukan. Persegi adalah kasus perbandingan $1:1$, tapi hanya untuk kurva mulus.`,kemajuan:String.raw`- Terbukti untuk kurva cembung, kurva mulus, kurva mulus sepotong-sepotong, dan banyak kelas lain.
- **2020** — Greene dan Lobb membuktikan hasil kuat untuk kurva mulus memakai geometri simplektik, pendekatan yang tidak terduga.
- Untuk kurva Jordan sembarang, termasuk yang berbentuk fraktal, masalahnya tetap terbuka.`,kenapaSulit:String.raw`Bukti untuk kurva mulus memakai argumen topologis yang mengandalkan keteraturan kurva. Begitu kurvanya boleh berkerut tak terhingga, argumen itu runtuh dan tidak ada penggantinya.

Menghampiri kurva liar dengan kurva mulus juga tidak menyelesaikan masalah: persegi yang ditemukan pada hampirannya bisa mengecil menuju satu titik, sehingga limitnya bukan persegi sungguhan.`,bacaan:[{judul:"Wikipedia — Inscribed square problem",url:"https://en.wikipedia.org/wiki/Inscribed_square_problem"},{judul:"Quanta Magazine — New geometric perspective cracks old problem about rectangles",url:"https://www.quantamagazine.org/new-geometric-perspective-cracks-old-problem-about-rectangles-20200625/"}]},{slug:"bilangan-ciuman",nama:"Bilangan Ciuman",namaEn:"Kissing Number Problem",label:[r,"Kombinatorika"],tahun:1694,penggagas:"Isaac Newton dan David Gregory",ringkas:"Berapa banyak bola identik yang bisa menyentuh satu bola di tengah? Jawabannya baru diketahui untuk dimensi 1, 2, 3, 4, 8, dan 24.",pernyataan:String.raw`Bilangan ciuman $\tau_n$ adalah banyaknya bola satuan yang bisa menyentuh satu bola satuan pusat di $\mathbb{R}^n$ tanpa saling tumpang tindih.

**Masalahnya:** tentukan $\tau_n$ untuk setiap $n$. Nilai pastinya baru diketahui untuk

$$
n = 1, 2, 3, 4, 8, 24.
$$`,latar:String.raw`Pada 1694, Newton dan Gregory berdebat soal $\tau_3$: Newton yakin jawabannya $12$, Gregory menduga $13$ masih mungkin. Perdebatan itu baru diselesaikan pada 1953 oleh Schütte dan van der Waerden — Newton benar.

Masalah ini erat kaitannya dengan pengemasan bola dan kode pengoreksi galat, sehingga dimensi tinggi punya nilai praktis di telekomunikasi.`,contoh:String.raw`Nilai yang sudah diketahui:

$$
\tau_1 = 2, \quad \tau_2 = 6, \quad \tau_3 = 12, \quad \tau_4 = 24, \quad \tau_8 = 240, \quad \tau_{24} = 196\,560.
$$

Di bidang, enam koin bisa mengelilingi satu koin dengan pas — susunan sarang lebah. Di ruang, dua belas bola bisa menyentuh satu bola, tapi masih tersisa celah, dan celah itulah yang membuat Gregory berharap ada bola ketiga belas.

Dimensi $8$ dan $24$ istimewa karena adanya kisi $E_8$ dan kisi Leech yang sangat simetris. Musin menyelesaikan $n = 4$ pada 2003. Untuk $n = 5$, yang diketahui baru $40 \le \tau_5 \le 44$.`,kemajuan:String.raw`- **1953** — kasus $n = 3$ selesai.
- **1979** — Odlyzko, Sloane, dan Levenshtein menyelesaikan $n = 8$ dan $n = 24$ lewat metode pemrograman linear.
- **2003** — Musin menyelesaikan $n = 4$.
- Untuk dimensi lain, yang ada hanya selang antara konstruksi terbaik dan batas atas terbaik, dan selangnya melebar cepat seiring naiknya dimensi.`,kenapaSulit:String.raw`Setiap dimensi punya geometri sendiri: konstruksi yang optimal di satu dimensi tidak punya analogi di dimensi lain. Karena itu tidak ada metode tunggal yang menyelesaikan semuanya.

Batas atas biasanya diperoleh dari pemrograman linear atau semidefinit, dan hasilnya jarang persis menyentuh konstruksi terbaik. Selisih kecil itulah yang menyisakan ketidakpastian.`,bacaan:[{judul:"Wikipedia — Kissing number",url:"https://en.wikipedia.org/wiki/Kissing_number"}]},{slug:"konjektur-jacobian",nama:"Konjektur Jacobian",namaEn:"Jacobian Conjecture",label:[d,"Geometri Aljabar"],tahun:1939,penggagas:"Ott-Heinrich Keller",ringkas:"Kalau determinan Jacobi sebuah pemetaan polinomial konstan tak nol, apakah pemetaan itu pasti punya invers polinomial? Terkenal karena banyaknya bukti palsu.",pernyataan:String.raw`Misalkan $F : \mathbb{C}^n \to \mathbb{C}^n$ adalah pemetaan polinomial, yaitu setiap komponennya polinomial. Determinan matriks Jacobi-nya, $\det J_F$, adalah polinomial juga.

**Konjektur Jacobian:** kalau $\det J_F$ merupakan konstanta tak nol, maka $F$ bijektif dan inversnya juga pemetaan polinomial.

Arah sebaliknya mudah: kalau $F$ punya invers polinomial, determinan Jacobi-nya pasti konstanta tak nol.`,latar:String.raw`Keller mengajukannya pada 1939. Sejak itu konjektur ini terkenal karena satu hal khusus: banyak sekali bukti yang diumumkan lalu ditarik kembali, termasuk oleh matematikawan yang sangat dihormati.

Karena itu Smale memasukkannya ke daftar 18 masalah matematika penting untuk abad ke-21, dan banyak jurnal kini memperlakukan naskah yang mengklaim menyelesaikannya dengan sangat hati-hati.`,contoh:String.raw`Untuk $n = 1$, konjekturnya mudah: kalau $F(x)$ polinomial dengan $F'(x)$ konstanta tak nol, maka $F$ berbentuk $ax + b$, yang jelas punya invers polinomial.

Untuk $n = 2$, ambil

$$
F(x, y) = (x + y^2,\; y).
$$

Determinan Jacobi-nya $1$, dan inversnya $(u, v) \mapsto (u - v^2, v)$, memang polinomial. Sesuai konjektur.

Yang menipu: syarat determinan konstan terasa sangat kuat, seolah jawabannya jelas. Tapi belum ada yang bisa mengubah perasaan itu menjadi bukti untuk $n \ge 2$.`,kemajuan:String.raw`- Terbukti untuk $n = 1$, dan untuk pemetaan berderajat rendah pada kasus tertentu.
- Diketahui bahwa kasus umum bisa direduksi ke bentuk khusus berderajat tiga, hasil Bass, Connell, dan Wright (1982). Jadi cukup menyelesaikan kasus kubik.
- Versi karakteristik positif terbukti **salah**, sehingga sifat karakteristik nol memang penting.
- Sampai sekarang tidak ada bukti yang diterima untuk $n \ge 2$.`,kenapaSulit:String.raw`Syarat determinan konstan bersifat lokal: ia hanya mengatakan pemetaan itu tidak pernah "melipat" di titik mana pun. Kesimpulan yang diinginkan bersifat global: pemetaannya bijektif di seluruh ruang.

Menyeberang dari informasi lokal ke kesimpulan global adalah pola kesulitan yang berulang di matematika, dan di sini tidak ada alat yang mampu menjembataninya.`,bacaan:[{judul:"Wikipedia — Jacobian conjecture",url:"https://en.wikipedia.org/wiki/Jacobian_conjecture"}]},{slug:"masalah-hilbert-16",nama:"Masalah Hilbert ke-16",namaEn:"Hilbert's Sixteenth Problem",label:["Sistem Dinamik",u],tahun:1900,penggagas:"David Hilbert",ringkas:"Berapa banyak siklus limit yang bisa dimiliki sistem persamaan diferensial polinomial? Bahkan untuk derajat dua pun belum diketahui.",pernyataan:String.raw`Tinjau sistem persamaan diferensial di bidang

$$
\frac{dx}{dt} = P(x,y), \qquad \frac{dy}{dt} = Q(x,y),
$$

dengan $P$ dan $Q$ polinomial berderajat paling tinggi $n$. Siklus limit adalah orbit tertutup terisolasi, yaitu lintasan melingkar yang didekati lintasan di sekitarnya.

**Bagian kedua masalah Hilbert ke-16:** adakah batas atas $H(n)$ untuk banyaknya siklus limit yang hanya bergantung pada $n$, dan berapa nilainya?`,latar:String.raw`Hilbert memasukkannya ke daftar 23 masalah pada 1900. Dari daftar itu, masalah ke-16 termasuk yang paling sedikit kemajuannya sampai sekarang.

Sejarahnya juga penuh drama: pada 1923 Dulac mengumumkan bukti bahwa tiap sistem polinomial hanya punya berhingga banyak siklus limit. Enam puluh tahun kemudian ditemukan celah pada buktinya, dan pernyataan itu baru benar-benar dibuktikan secara terpisah oleh Écalle dan Ilyashenko pada akhir 1980-an.`,contoh:String.raw`Untuk sistem linear ($n = 1$), tidak ada siklus limit sama sekali.

Untuk $n = 2$, sistem kuadrat, sudah ditemukan contoh dengan **empat** siklus limit. Yang belum diketahui: apakah empat itu maksimum, atau masih bisa lebih banyak. Bahkan pertanyaan sesempit "apakah $H(2)$ berhingga" belum terjawab dengan nilai konkret.

Bandingkan dengan sistem terkenal seperti osilator van der Pol, yang punya tepat satu siklus limit dan dipakai memodelkan detak jantung dan rangkaian elektronik.`,kemajuan:String.raw`- **1980-an** — Écalle dan Ilyashenko membuktikan setiap sistem polinomial tertentu hanya punya berhingga banyak siklus limit. Ini menutup celah Dulac, tapi tidak memberi batas seragam.
- Diketahui $H(n) \ge$ sekitar $n^2 \log n$ dari konstruksi eksplisit.
- Nilai $H(2)$ sampai sekarang tidak diketahui, bahkan tidak diketahui apakah berhingga.
- Versi infinitesimal dan versi lemah dari masalah ini menjadi bidang penelitian tersendiri dengan kemajuan yang lebih terukur.`,kenapaSulit:String.raw`Siklus limit bisa lahir dan mati saat parameter sistem digeser sedikit, lewat peristiwa yang disebut bifurkasi. Mengendalikan semua kemungkinan bifurkasi untuk semua polinomial berderajat $n$ sekaligus adalah tugas yang sangat besar.

Selain itu, tidak ada rumus umum untuk orbit sistem nonlinear, sehingga siklusnya tidak bisa ditulis secara eksplisit dan hanya bisa dipelajari lewat sifat kualitatif.`,bacaan:[{judul:"Wikipedia — Hilbert's sixteenth problem",url:"https://en.wikipedia.org/wiki/Hilbert%27s_sixteenth_problem"}]},{slug:"konjektur-unique-games",nama:"Konjektur Unique Games",namaEn:"Unique Games Conjecture",label:["Ilmu Komputer Teoretis"],tahun:2002,penggagas:"Subhash Khot",ringkas:"Kalau benar, batas terbaik banyak algoritma hampiran yang kita punya sekarang ternyata sudah optimal dan tidak bisa diperbaiki lagi.",pernyataan:String.raw`Dalam permainan unik, diberikan graf yang setiap sisinya punya batasan berbentuk permutasi: nilai di satu ujung menentukan secara tunggal nilai yang dibutuhkan di ujung lain.

**Konjektur Unique Games:** untuk setiap $\varepsilon > 0$, membedakan antara kasus "ada penetapan yang memenuhi lebih dari $1-\varepsilon$ bagian batasan" dan kasus "tidak ada penetapan yang memenuhi lebih dari $\varepsilon$ bagian" adalah masalah NP-sulit.`,latar:String.raw`Khot merumuskannya pada 2002 dan hasilnya mengubah arah penelitian algoritma hampiran. Kalau konjekturnya benar, banyak batas hampiran yang selama ini dicapai algoritma ternyata sudah yang terbaik yang mungkin.

Contoh paling terkenal: algoritma Goemans–Williamson untuk Max-Cut mencapai rasio sekitar $0{,}878$. Dengan konjektur ini, rasio tersebut terbukti optimal — tidak ada algoritma polinomial yang bisa lebih baik, kecuali $P = NP$.`,contoh:String.raw`**Max-Cut.** Bagi simpul graf menjadi dua kelompok sehingga sebanyak mungkin sisi menyeberang antar kelompok. Menyelesaikannya secara tepat adalah NP-sulit.

Algoritma Goemans–Williamson (1995) memakai pemrograman semidefinit dan menjamin hasil setidaknya $0{,}878$ kali nilai optimum. Selama bertahun-tahun orang mencari algoritma yang lebih baik. Konjektur Unique Games mengatakan pencarian itu sia-sia.

Hal serupa berlaku untuk Vertex Cover: rasio $2$ tampaknya sudah yang terbaik, kalau konjekturnya benar.`,kemajuan:String.raw`- **2018** — Khot, Minzer, dan Safra membuktikan teorema permainan 2-ke-2, yang dianggap membuktikan "separuh jalan" menuju konjektur ini dan sangat memperkuat kepercayaan pada kebenarannya.
- Banyak konsekuensi konjektur ini sudah dipetakan secara rinci, sehingga jelas apa saja yang ikut selesai kalau ia terbukti.
- Belum ada bukti penuh, dan belum ada juga algoritma yang membantahnya.`,kenapaSulit:String.raw`Konjektur ini berbicara tentang batas kemampuan semua algoritma polinomial, jadi membuktikannya sama sulitnya dengan membuktikan ketiadaan — masalah yang sama seperti pada $P$ versus $NP$.

Di sisi lain, membantahnya berarti menemukan algoritma cerdas untuk masalah yang sudah diserang banyak peneliti selama dua dekade.`,bacaan:[{judul:"Wikipedia — Unique games conjecture",url:"https://en.wikipedia.org/wiki/Unique_games_conjecture"},{judul:"Quanta Magazine — First big steps toward proving the unique games conjecture",url:"https://www.quantamagazine.org/first-big-steps-toward-proving-the-unique-games-conjecture-20180424/"}]}],b=[...m,...l,...g,...p],h=s=>b.find(k=>k.slug===s);export{n as M,b as U,h as c};
