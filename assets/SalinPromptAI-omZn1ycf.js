import{r as e,j as n}from"./react-C7wYa_pA.js";import{s as u}from"./index-DaiwS2Mr.js";const l=String.raw`Saya ingin mengubah file yang saya sisipkan (foto/scan tulisan tangan) menjadi teks Markdown + LaTeX yang bisa dirender oleh KaTeX, supaya bisa langsung saya salin dari jawabanmu dan tempel ke situs Colimp. Ikuti kriteria berikut.

1. RUMUS BESAR. Persamaan yang besar, panjang, atau berdiri sendiri di barisnya (termasuk yang memuat pecahan bertingkat, sigma, integral, limit, atau matriks) ditulis sebagai blok: "$$" di baris sendiri, rumusnya, lalu "$$" di baris sendiri. Beri satu baris kosong sebelum dan sesudah blok itu. Contoh:

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

2. RUMUS KECIL. Simbol, variabel, atau rumus pendek yang menyatu di tengah kalimat ditulis sebaris dengan satu tanda dolar, misalnya $x^2 + 1$ atau $n \geq 2$. Jangan beri spasi tepat sesudah "$" pembuka atau tepat sebelum "$" penutup.

3. ALIGNED. Beberapa baris rumus yang berurutan (rantai persamaan atau langkah hitungan, biasanya baris berikutnya diawali "=") ditulis dengan aligned di dalam blok "$$". Letakkan "&" tepat sebelum tanda relasi (=, <, >, \leq, \geq, dst.) di setiap baris, dan akhiri setiap baris kecuali yang terakhir dengan "\\". Contoh:

$$
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2 \\
&= (a-b)^2 + 4ab
\end{aligned}
$$

4. JANGAN MENGUBAH APA PUN DARI TULISAN SAYA. Kamu hanya diperintahkan mengubah tulisan ini menjadi teks KaTeX. Jangan memperbaiki, merapikan, meringkas, menambah atau menghapus langkah, menerjemahkan, atau mengoreksi hitungan, walaupun menurutmu ada yang keliru. Kata, urutan, dan isi harus persis seperti tulisan aslinya. Bagian yang tidak terbaca tandai dengan [tidak terbaca], jangan ditebak.

Aturan tambahan:
- Kalimat biasa ditulis sebagai paragraf utuh; jangan memutus satu kalimat dengan enter. Baris kosong hanya untuk paragraf baru, poin-poin, atau sebelum/sesudah blok "$$".
- Daftar atau poin-poin pakai format Markdown ("- " atau "1. ").
- Teks di dalam rumus ditulis dengan \text{...}.
- Hanya pakai perintah yang didukung KaTeX. Untuk beberapa baris rumus pakai aligned, bukan align, eqnarray, \label, atau \newcommand.
- Kirim SELURUH hasilnya di dalam satu blok kode (code block) supaya bisa saya salin sekaligus, tanpa penjelasan atau komentar apa pun di luar blok itu.`;function b({judul:t="Punya solusi tulisan tangan?",ket:s="Salin prompt ini, kirim ke ChatGPT/Gemini/Claude bersama foto jawabanmu, lalu tempel hasilnya di sini."}){const[a,i]=e.useState(!1);return e.useEffect(()=>{if(!a)return;const r=setTimeout(()=>i(!1),1800);return()=>clearTimeout(r)},[a]),n.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 mb-2 px-3 py-2 bg-brand-50/60 border border-brand-100 rounded-lg",children:[n.jsxs("p",{className:"text-[0.75rem] text-ink-600 leading-snug",children:[n.jsx("span",{className:"font-semibold text-ink-700",children:t})," ",s]}),n.jsx("button",{type:"button",onClick:async()=>{await u(l)&&i(!0)},className:`shrink-0 px-2.5 py-1 text-[0.6875rem] font-semibold rounded-md border transition-colors ${a?"bg-hm-500 border-hm-500 text-white":"bg-white border-brand-300 text-brand-700 hover:bg-brand-50"}`,children:a?"Prompt tersalin":"Salin prompt AI"})]})}export{b as S};
