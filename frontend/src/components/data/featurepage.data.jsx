const featurePage = [
    {
        name: 'Pengiriman Pesan (Form Interaktif):',
        desc: 'Pengunjung dapat dengan mudah mengirim pesan dengan mengisi Nama dan Isi Pesan melalui formulir input yang intuitif. Sistem akan memvalidasi pesan, memastikan Nama dan Pesan tidak kosong sebelum dikirim.'
    },
    {
        name: 'Tampilan Pesan (Embla Carousel):',
        desc: 'Pesan yang sudah terkirim akan ditampilkan dalam format kartu (`MessageCard`) yang menarik dan mudah dibaca. Pesan dikelompokkan menjadi slide berisi maksimal 4 pesan per slide, diorganisir menggunakan library Embla Carousel.',
        desc2: (
            <p className="mt-1 text-sm italic text-gray-600">Pengunjung dapat menavigasi pesan menggunakan tombol panah `&lt;` dan `&gt;`. Carousel diatur dalam mode loop: false sehingga navigasi tidak dapat berputar tanpa akhir.</p>
        )
    },
    {
        name: 'Informasi Detail Pesan:',
        desc: 'Setiap kartu pesan menampilkan: Nama Pengirim, Isi Pesan, Tanggal Pesan dalam format lokal (misal: DD/MM/YYYY), dan Waktu Relatif yang diperbarui secara berkala (misal: "Just now", "5 minutes ago").'
    },
    {
        name: 'Pengambilan Data Asinkron:',
        desc: 'Data pesan diambil dari endpoint secara asinkron (menggunakan `fetchMessages`), memastikan user interface tetap responsif selama proses pemuatan data. Terdapat indikator loading yang akan muncul saat data pesan sedang dimuat.'
    },
]
export {featurePage}