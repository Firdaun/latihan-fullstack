import { useState } from 'react'
import { useNavigate } from 'react-router'
import { alertError, alertSuccess } from './data/alert'

const LockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white group-hover:rotate-6 transition duration-300">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)

const AUTH_API_URL = import.meta.env.VITE_API_URL + '/auth/validate-key'

export default function Lock({ nextPagePath }) {
    const [key, setKey] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        if (e) e.preventDefault()

        if (!key.trim()) {
            await alertError('Masukkan secret key terlebih dahulu!')
            return
        }

        try {
            const response = await fetch(AUTH_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: key }),
            })

            if (response.ok) {
                await alertSuccess('Akses diterima! Selamat datang di halaman About.')
                sessionStorage.setItem('is_unlocked_about', 'true')
                navigate(nextPagePath || '/', { state: { unlocked: true } })
            } else {
                await alertError('Key salah. Silakan coba lagi.')
            }
        } catch (error) {
            console.error('Error validating key:', error)
            alertError('Terjadi kesalahan jaringan. Cek status server backend Anda.')
        }
    }

    return (
        <div className="min-h-screen pt-20 mt-18 lg:mt-20 flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl p-6 md:p-10  md:shadow-xl rounded-2xl md:border border-blue-200 transform transition-all duration-500 md:hover:shadow-2xl hover:shadow-blue-300/50">

                <div className="text-center mb-10">
                    <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-sky-300">
                        🔒 Akses Diblokir
                    </span>

                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight bg-clip-text text-transparent bg-linear-to-r from-sky-500 to-cyan-500 transition-colors duration-500"
                    >
                        Halaman Di Kunci
                    </h1>

                    <h2 className="md:text-lg lg:text-xl text-gray-700 font-medium">
                        Masukkan secret key di bawah ini untuk melanjutkan
                    </h2>
                </div>

                <div className="flex justify-center mt-8">
                    <div className="flex w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-sky-300">

                        <input
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Ketik secret key di sini..."
                            className="grow p-4 text-base md:text-lg focus:outline-none bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 transition duration-300" />

                        <button
                            type="submit"
                            className="group flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white p-4 transition duration-300 ease-in-out transform"
                            title="Buka Kunci Akses"
                        >
                            <LockIcon />
                        </button>
                    </div>
                </div>
            </form>

            <p className="mt-8 text-gray-500 text-sm">
                Hubungi administrator jika Anda memerlukan kunci.
            </p>

        </div>
    )
}