// src/components/Blog.jsx

import { Link } from "react-router";

export default function Blog() {
    return (
        <div className="min-h-screen lg:mt-20 flex flex-col items-center justify-center lg:bg-gray-50">
            <div className="w-full max-w-4xl p-3 md:p-16 text-center bg-white lg:shadow-2xl rounded-3xl lg:border-4 border-sky-400/50 transform transition-all duration-500 lg:hover:scale-[1.01]">

                <span className="inline-block text-7xl mb-6" role="img" aria-label="construction">🚧</span>

                <h1
                    className="text-5xl lg:text-7xl md:text-8xl font-extrabold tracking-tight mb-3 leading-tight bg-clip-text text-transparent bg-linear-to-r from-sky-600 to-blue-800"
                >
                    BLOG
                </h1>

                <h2 className="text-lg md:text-3xl text-gray-700 font-semibold">
                    Halaman ini sedang dalam pengerjaan.
                </h2>

                <p className="text-base lg:text-xl text-gray-500 mt-4">
                    Nantikan tulisan, artikel, dan pembaruan terbaru dari Fahrul!
                </p>

                <div className="mt-10">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition duration-300 transform active:scale-150 hover:scale-105"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}