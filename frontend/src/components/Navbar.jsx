import { Link, useLocation } from "react-router"
import { componentsNav } from "./data/navbar.data"
import { useEffect, useRef, useState } from "react"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [])

    const handleRightClick = (e) => {
        if (location.pathname === '/about-unlocked') {
            e.preventDefault()
        }
    }
    return (
        <>
            <nav onContextMenu={handleRightClick} className={`nav ${isScrolled ? 'shadow-lg' : ''}`}>
                <div ref={menuRef} className="place flex justify-between">
                    <h1 className="text-2xl lg:text-4xl font-semibold">Fahrul</h1>
                    <div className="flex justify-center items-center gap-5">
                        <ul className={`${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-7'} lg:opacity-100 lg:pointer-events-auto lg:translate-y-0 transition-all duration-300 ease-in-out flex py-3 lg:py-0 space-y-2 lg:space-y-0 rounded-lg flex-col lg:flex-row absolute lg:static right-10 shadow-lg lg:shadow-none top-20 lg:flex lg:gap-5 items-center bg-white lg:bg-transparent`}>
                            {componentsNav.map((to, index) => (
                                <li key={index}><Link onClick={() => setIsOpen(false)} className="lg:hover:text-blue-500 duration-300 transition-all ease-in-out px-8 lg:px-0" to={to.links}>{to.menu}</Link></li>
                            ))}
                        </ul>
                        <div onClick={() => setShowModal(true)} className="px-5 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-400 transition-all duration-300 ease-in-out">Access</div>
                        <svg onClick={() => setIsOpen(!isOpen)} className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                    </div>
                </div>
            </nav>
            {showModal && (
                <div onClick={() => setShowModal(false)} className="fixed bg-black/50 backdrop-blur-sm min-h-screen z-9999 w-screen flex justify-center items-center inset-0">
                    <form onClick={(e) => e.stopPropagation()} className="bg-white relative max-w-2xl p-10  shadow-xl rounded-2xl border border-blue-200 transform transition-all duration-500">
                        <div onClick={() => setShowModal(false)} className="hover:scale-110 transition-transform text-red-500 absolute right-3 top-3 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg></div>
                        <div className="text-center mb-5">
                            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-blue-300">
                                🔒 Akses Di Kunci
                            </span>

                            <h2 className="md:text-lg lg:text-xl text-gray-700 font-medium">
                                Masukkan secret key di bawah ini untuk membuka akses
                            </h2>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-blue-500">
                                <input type="password" placeholder="Ketik secret key di sini..." className="grow p-4 text-base md:text-lg focus:outline-none bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition duration-300" />
                                <button title="Buka Kunci Akses" type="submit" className="group flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-4 transition duration-300 ease-in-out transform" >
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
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}