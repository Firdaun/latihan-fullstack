// frontend/src/components/Blog.jsx

import { Link, Outlet, useRoutes } from 'react-router'; // Perlu ganti import 'react-router' ke 'react-router-dom' di main.jsx dan package.json

// Komponen untuk Halaman Daftar Artikel (List of Posts)
function PostList() {
    // Logika fetch data artikel dari backend dan menampilkannya di sini
    // ...
    return (
        <div className="min-h-screen lg:mt-20 flex flex-col items-center p-3 md:p-16">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Fahrul's Blog</h1>
            {/* Tampilkan daftar artikel di sini */}
            <Link to="/blog/contoh-artikel-1">Baca Artikel Pertama</Link>
        </div>
    )
}

// Komponen untuk Halaman Detail Artikel (Single Post)
function SinglePost() {
    // Logika mengambil artikel berdasarkan slug dari URL dan menampilkannya
    // ...
    return (
        <div className="min-h-screen lg:mt-20 flex flex-col items-center p-3 md:p-16">
            <h1 className="text-4xl font-bold">Judul Artikel</h1>
            <p>Konten artikel...</p>
        </div>
    )
}

// Komponen utama Blog.jsx
export default function Blog() {
    return (
        // Gunakan PostList atau SinglePost di sini, tergantung route
        <PostList /> // Atau gunakan React Router untuk switch antar list dan detail
    )
}