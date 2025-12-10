import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import About from './About.jsx'
import { alertError, alertSuccess } from './data/alert'

const AUTH_API_URL = import.meta.env.VITE_API_URL + '/auth/validate-key'

export default function ProtectedAbout() {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [key, setKey] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUnlocked) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isUnlocked])

    const handleClose = () => {
        navigate(-1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!key.trim()) {
            await alertError('Masukkan secret key terlebih dahulu!')
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch(AUTH_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: key }),
            })

            const data = await response.json()

            if (response.ok) {
                await alertSuccess(`${data.message} Selamat datang.`)
                sessionStorage.setItem('is_unlocked_about', 'true')
                setIsUnlocked(true)
            } else {
                await alertError('Key salah. Silakan coba lagi.')
            }
        } catch (error) {
            console.error('Error validating key:', error)
            alertError('Terjadi kesalahan jaringan.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <About />

            {!isUnlocked && (
                <div 
                    className="fixed inset-0 bg-black/70 z-9999 w-screen h-screen flex justify-center items-center"
                    style={{ backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)' }}
                >
                    <form 
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-white relative w-full max-w-2xl p-6 md:p-10 md:shadow-xl rounded-2xl md:border border-blue-200 transform transition-all duration-500 mx-4"
                    >
                        <div onClick={handleClose} className="text-red-500 absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                        </div>

                        <div className="text-center mb-10">
                            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-blue-300">
                                🔒 Akses Terkunci
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight text-gray-800">
                                Restricted Area
                            </h1>
                            <h2 className="md:text-lg text-gray-600 font-medium">
                                Halaman About diproteksi. Masukkan kunci untuk melihat konten.
                            </h2>
                        </div>

                        <div className="flex justify-center mt-8">
                            <div className="flex w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-blue-300">
                                <input 
                                    type="password" 
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="Ketik secret key..." 
                                    className="grow p-4 text-base md:text-lg focus:outline-none bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition duration-300" 
                                />
                                <button 
                                    disabled={isLoading}
                                    title="Buka Kunci" 
                                    type="submit" 
                                    className="group flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-4 transition duration-300 ease-in-out cursor-pointer disabled:bg-gray-400" 
                                >
                                    {isLoading ? (
                                        <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:rotate-6 transition duration-300">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}