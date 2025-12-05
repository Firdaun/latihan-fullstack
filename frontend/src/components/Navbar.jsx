import { Link, useLocation } from "react-router";
import { componentsNav } from "./data/navbar.data";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

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
            e.preventDefault();
        }
    }
    return (
        <nav onContextMenu={handleRightClick} className="nav shadow-lg">
            <div ref={menuRef} className="place flex justify-between">
                <h1 className="text-2xl lg:text-4xl font-semibold">Fahrul</h1>
                <svg onClick={() => setIsOpen(!isOpen)} className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                <ul className={`${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-7'} lg:opacity-100 lg:pointer-events-auto lg:translate-y-0 transition-all duration-300 ease-in-out flex py-3 lg:py-0 space-y-2 lg:space-y-0 rounded-lg flex-col lg:flex-row absolute lg:static right-10 shadow-lg lg:shadow-none top-20 lg:flex lg:gap-5 items-center bg-white lg:bg-transparent`}>
                    {componentsNav.map((to, index) => (
                        <li key={index}><Link onClick={() => setIsOpen(false)} className="lg:hover:text-white px-8 lg:px-0" to={to.links}>{to.menu}</Link></li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}