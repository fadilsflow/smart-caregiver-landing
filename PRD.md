# PRD — Public Dashboard Kesehatan Lansia Indonesia

## 1. Ringkasan

Public dashboard ini menampilkan gambaran mudah dipahami tentang isu kesehatan lansia di Indonesia: tren indikator kesehatan, minat publik, dan percakapan media digital. Versi awal memakai data dummy yang meniru struktur pipeline `elderly-health-analytics`, lalu bisa diganti ke data MongoDB/API saat backend siap.

Aplikasi dibangun dengan Astro sebagai public-facing dashboard statis/interaktif ringan. UI mengikuti arahan `DESIGN.md`: white canvas, Coinbase Blue sebagai aksen utama, tipografi tenang, card radius besar, CTA pill, dan section spacing editorial.

## 2. Tujuan Produk

1. Membantu publik memahami isu kesehatan lansia Indonesia tanpa membaca notebook/data mentah.
2. Menyajikan sinyal dari 3 sumber data:
   - WHO: indikator kesehatan seperti hipertensi, diabetes, obesitas, harapan hidup.
   - Google Trends: minat pencarian topik lansia dari waktu ke waktu dan per wilayah.
   - YouTube: engagement dan sentimen video terkait kesehatan lansia.
3. Menjadi landing page capstone yang kredibel, rapi, dan mudah dibagikan.
4. Menyiapkan fondasi UI agar data dummy bisa diganti data live tanpa redesign besar.

## 3. Non-Goals Versi Awal

- Tidak perlu login, admin panel, atau personalisasi.
- Tidak perlu koneksi MongoDB langsung dari frontend.
- Tidak perlu chart real-time.
- Tidak perlu analitik prediktif atau rekomendasi medis personal.
- Tidak menggantikan konsultasi tenaga kesehatan.

## 4. Target Pengguna

| Pengguna | Kebutuhan |
|---|---|
| Masyarakat umum | Paham topik kesehatan lansia yang sedang penting/trending. |
| Keluarga/caregiver | Menemukan isu utama seperti hipertensi, diabetes, demensia, aktivitas fisik. |
| Mahasiswa/peneliti | Melihat ringkasan data multi-sumber untuk eksplorasi awal. |
| Pembuat kebijakan/komunitas | Melihat wilayah/topik dengan perhatian publik tinggi. |

## 5. Problem Statement

Data kesehatan lansia tersebar di sumber berbeda: WHO menyediakan indikator formal, Google Trends menunjukkan minat publik, dan YouTube menunjukkan percakapan media digital. Notebook analisis berguna untuk eksplorasi teknis, tetapi publik butuh tampilan yang lebih ringkas, kontekstual, dan mudah dibaca.

## 6. Success Metrics

Versi awal sukses jika:

- Pengguna bisa memahami 3 insight utama dalam < 60 detik.
- Semua chart punya judul, konteks, dan label yang jelas.
- Dashboard mobile-friendly.
- Data dummy terisolasi dalam file data sehingga mudah diganti.
- Build Astro berhasil tanpa dependency berat yang tidak perlu.

## 7. Data Scope

### 7.1 Schema Dasar

Mengikuti schema pipeline:

```json
{
  "source": "WHO",
  "keyword": "Hypertension",
  "value": 31.16,
  "metric": "percent",
  "timestamp": "2005-01-01",
  "region": "Indonesia",
  "sentiment": null,
  "batch_id": "20260511_001",
  "indicator_code": "BP_04",
  "age_group": "60+",
  "sex": "Male"
}
```

### 7.2 Sumber Data

| Source | Versi Dummy | Versi Live Nanti |
|---|---|---|
| WHO | Time series indikator kesehatan lansia 2000–2024. | MongoDB collection WHO hasil collector. |
| Google Trends | Interest score keyword per bulan/provinsi. | MongoDB collection Trends. |
| YouTube | Video topic, engagement score, sentiment. | MongoDB collection YouTube. |

### 7.3 Keyword Awal

- Hipertensi lansia
- Diabetes lansia
- Demensia
- Aktivitas fisik lansia
- Gizi lansia
- Perawatan lansia
- Kesehatan mental lansia

## 8. Informasi Utama yang Ditampilkan

### 8.1 Executive Summary

Kartu ringkasan di atas fold:

1. Total data points.
2. Topik paling banyak dicari.
3. Indikator kesehatan paling menonjol.
4. Sentimen publik YouTube.

### 8.2 Chart dan Visualisasi

Terinspirasi dari `elderly_analytics.ipynb`:

| Visualisasi | Tujuan | Bentuk UI |
|---|---|---|
| Distribusi source data | Menjelaskan komposisi dataset. | Bar chart atau donut. |
| Top keyword populer | Menunjukkan topik paling sering muncul. | Horizontal bar chart. |
| Tren indikator WHO | Melihat perubahan kesehatan dari waktu ke waktu. | Line chart multi-series. |
| Tren minat pencarian | Melihat perubahan interest publik. | Line chart by keyword. |
| Peta/minat per wilayah | Menunjukkan provinsi dengan interest tinggi. | Ranked region list dulu; map opsional nanti. |
| Sentimen YouTube | Mengukur nada percakapan publik. | Stacked bar atau sentiment cards. |
| Engagement YouTube | Menemukan topik/video paling menarik perhatian. | Ranked table/card list. |

## 9. Halaman dan Struktur Konten

### 9.1 Single Page Dashboard

Rute: `/`

Urutan section:

1. **Hero**
   - Judul: “Memahami Kesehatan Lansia Indonesia lewat Data Publik”
   - Subjudul: data WHO, Google Trends, dan YouTube dikemas untuk publik.
   - CTA: “Lihat insight” dan “Tentang data”.
   - Visual: dark product-card mockup berisi mini chart.

2. **Key Metrics**
   - 4 kartu statistik.
   - Ringkas, angka besar, label jelas.

3. **Overview Dataset**
   - Chart distribusi source.
   - Penjelasan singkat tentang tiap sumber.

4. **Topik yang Banyak Dicari**
   - Horizontal bar top keywords.
   - Filter dummy: semua sumber / Trends / YouTube.

5. **Tren Kesehatan**
   - Line chart indikator WHO.
   - Toggle indikator: hipertensi, diabetes, obesitas, harapan hidup.

6. **Minat Publik per Waktu dan Wilayah**
   - Line chart Google Trends.
   - Ranked list provinsi.

7. **Percakapan YouTube**
   - Sentiment breakdown.
   - Top video/topic cards berbasis engagement dummy.

8. **Insight untuk Publik**
   - 3–5 insight berbasis data, ditulis non-teknis.
   - Contoh: “Hipertensi konsisten jadi isu utama, sementara minat pencarian demensia meningkat.”

9. **Metodologi dan Batasan**
   - Jelaskan data dummy pada versi awal.
   - Jelaskan sumber data dan metode agregasi.
   - Disclaimer: bukan nasihat medis.

10. **Footer**
   - Capstone project, source info, last updated dummy.

## 10. UX Requirements

- Bahasa utama: Indonesia.
- Tone: publik, edukatif, tidak alarmis.
- Setiap chart harus punya:
  - Judul jelas.
  - Kalimat “apa artinya”.
  - Label sumbu/legend.
  - Empty/loading state jika data tidak ada.
- Mobile:
  - Chart scroll horizontal jika perlu.
  - Card menjadi 1 kolom.
  - Hero CTA tetap mudah ditekan.
- Accessibility:
  - Kontras teks cukup.
  - Jangan pakai warna sebagai satu-satunya pembeda sentimen/tren.
  - Angka penting punya teks pendamping.

## 11. UI Direction dari DESIGN.md

### 11.1 Visual Language

- Canvas utama putih `#ffffff`.
- Aksen utama Coinbase Blue `#0052ff`, dipakai hemat untuk CTA, active states, dan highlight data.
- Teks utama near-black `#0a0b0d`.
- Teks sekunder cool gray `#5b616e`.
- Section alternatif soft gray `#f7f7f7`.
- Hero/CTA band bisa dark `#0a0b0d`.

### 11.2 Components

- Top nav tinggi 64px, white background.
- CTA selalu pill radius besar.
- Cards radius 24px, padding 32px.
- Section padding desktop 96px; mobile lebih kecil.
- Numeric values memakai mono fallback.
- Semantic colors:
  - Positive/up: `#05b169`.
  - Negative/down: `#cf202f`.
  - Jangan pakai semantic color sebagai button background.

### 11.3 Layout

- Max content width sekitar 1200px.
- Hero split 2 kolom desktop, 1 kolom mobile.
- Metric cards 4-up desktop, 2-up tablet, 1-up mobile.
- Chart cards 2-up untuk chart kecil, full-width untuk time series utama.

## 12. Functional Requirements

### F1. Render Dashboard dengan Data Dummy

- App memuat data dari file lokal, misalnya `src/data/dummy-dashboard.ts`.
- Tidak ada API call eksternal di versi awal.
- Semua chart dan cards memakai data tersebut.

Acceptance criteria:
- Dashboard tetap tampil saat offline.
- Data dummy mudah diganti tanpa edit komponen besar.

### F2. Key Metrics

- Menampilkan total records, total sources, top keyword, average sentiment.
- Angka diformat human-readable.

Acceptance criteria:
- Semua metric punya label dan helper text.

### F3. Dataset Distribution

- Menampilkan jumlah record per source.
- Memakai bar/donut sederhana.

Acceptance criteria:
- WHO, Google Trends, YouTube terlihat jelas.

### F4. Topic Popularity

- Menampilkan top keyword berdasarkan frekuensi/skor dummy.
- Bisa dibaca di mobile.

Acceptance criteria:
- Minimal 5 keyword tampil.

### F5. Health Indicator Trends

- Menampilkan line chart indikator WHO dari tahun ke tahun.
- Multi-series atau single selected series.

Acceptance criteria:
- Minimal 3 indikator tampil.
- Tahun dan nilai terbaca.

### F6. Public Interest Trends

- Menampilkan trend Google Trends bulanan.
- Menampilkan ranked region/province list.

Acceptance criteria:
- Minimal 6 titik waktu dan 5 wilayah.

### F7. YouTube Sentiment & Engagement

- Menampilkan proporsi positive/neutral/negative.
- Menampilkan top topic/video cards.

Acceptance criteria:
- Engagement score dan sentiment label tampil.

### F8. Methodology Section

- Menjelaskan sumber data, dummy status, dan batasan.

Acceptance criteria:
- Ada disclaimer medis.
- Ada “last updated”.

## 13. Technical Requirements

- Framework: Astro.
- Styling: CSS biasa atau CSS modules/global CSS. Hindari dependency UI berat untuk versi awal.
- Chart approach versi awal:
  - Prefer custom SVG/CSS charts ringan jika dataset kecil.
  - Alternatif: install chart library jika butuh interaksi lebih banyak.
- Data dummy: TypeScript object/array.
- Components kandidat:
  - `Hero.astro`
  - `MetricCard.astro`
  - `ChartCard.astro`
  - `BarChart.astro`
  - `LineChart.astro`
  - `SentimentBreakdown.astro`
  - `Methodology.astro`

## 14. Data Dummy Requirements

Buat dataset yang realistis tapi jelas dummy:

- WHO yearly data: 2000, 2005, 2010, 2015, 2020, 2024.
- Google Trends monthly/quarterly data: minimal 12 titik.
- Region interest: minimal 10 provinsi Indonesia.
- YouTube topics: minimal 8 video/topic cards.
- Semua dummy record punya `source`, `keyword`, `value`, `metric`, `timestamp`, `region` jika relevan.

Tambahkan label UI: “Data dummy untuk prototipe”.

## 15. Content Guidelines

- Hindari klaim medis keras.
- Gunakan “indikasi”, “sinyal”, “tren awal”, bukan “membuktikan”.
- Jelaskan bahwa Google Trends dan YouTube mewakili perhatian publik digital, bukan prevalensi penyakit.
- WHO diposisikan sebagai indikator kesehatan formal.

## 16. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Publik salah mengira data Trends sebagai prevalensi penyakit. | Copy jelas: “minat pencarian, bukan jumlah kasus”. |
| Data dummy terlihat seperti data resmi. | Badge “Data dummy” di hero dan methodology. |
| Chart terlalu teknis. | Tambah insight sentence di tiap chart. |
| UI terlalu ramai. | Ikuti DESIGN.md: whitespace besar, blue hemat, card rapi. |
| Mobile chart sulit dibaca. | Gunakan ranked list dan scroll area. |

## 17. Milestones

### M1 — Static PRD & Design Alignment

- PRD selesai.
- Struktur dashboard disepakati.

### M2 — Data & Component Foundation

- Data dummy dibuat.
- Token/style global dibuat mengikuti `DESIGN.md`.
- Komponen card/chart dasar dibuat.

### M3 — Dashboard MVP

- Semua section utama tampil.
- Chart dummy berfungsi.
- Responsive layout selesai.

### M4 — Verification

- `astro build` sukses.
- Manual test desktop/mobile.
- Copy dan disclaimer dicek.

### M5 — Future Live Data

- Tambah endpoint/static generation dari MongoDB/API.
- Tambah last successful pipeline run.
- Tambah filter periode/source.

## 18. Open Questions

1. Nama final aplikasi: tetap “Public Dashboard Kesehatan Lansia” atau nama brand lain?
2. Apakah dashboard perlu menampilkan notebook/source code link?
3. Apakah target deployment Vercel, Netlify, GitHub Pages, atau server kampus?
4. Untuk MVP, chart custom SVG cukup atau ingin library seperti Chart.js/ECharts?
5. Apakah perlu mode English di fase berikutnya?
