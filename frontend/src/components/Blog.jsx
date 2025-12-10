import { Link, Outlet, useRoutes } from 'react-router' 

function PostList() {
    return (
        <div className="min-h-screen lg:mt-20 flex flex-col items-center p-3 md:p-16">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Fahrul's Blog</h1>
            {/* Tampilkan daftar artikel di sini */}
            <Link to="/blog/contoh-artikel-1">Baca Artikel Pertama</Link>
        </div>
    )
}

function SinglePost() {
    return (
        <div className="min-h-screen lg:mt-20 flex flex-col items-center p-3 md:p-16">
            <h1 className="text-4xl font-bold">Judul Artikel</h1>
            <p>Konten artikel...</p>
        </div>
    )
}

export default function Blog() {
    return (
        <PostList /> 
    )
}