import { useLocation } from "react-router";
import { componentsFooter, XIcon } from "./data/footer.data";

export default function Footer() {
    const location = useLocation()

    const handleRightClick = (e) => {
        if (location.pathname === '/about-unlocked') {
            e.preventDefault();
        }
    }

    return (
        <>
            <footer onContextMenu={handleRightClick} className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {componentsFooter.map((column, columnIndex) => (
                            <div key={columnIndex}>
                                <h3 className="lg:text-lg font-semibold text-white mb-3 lg:mb-4 border-b border-gray-700 pb-2">{column.name}</h3>
                                <nav className="space-y-2 lg:space-y-3">
                                    {column.links.map((link, linkIndex) => (
                                        <a key={linkIndex} href={link.href} className="text-gray-400 hover:text-white block text-sm transition duration-150 ease-in-out">{link.name}</a>
                                    ))}
                                </nav>
                            </div>
                        ))}
                        <div>
                            <h3 className="lg:text-lg font-semibold text-white mb-3 lg:mb-4 border-b border-gray-700 pb-2">HUBUNGI KAMI</h3>
                            <p className="text-gray-400 text-sm mb-2 lg:mb-3">
                                Alamat: Jl. Sukahening No. 123<br />
                                Email: fahrulbrrads@gmail.com
                            </p>
                            <div className="flex">
                                <a className="text-gray-400 hover:text-white" rel="noopener noreferrer" target="_blank" href="https://x.com/Fahrul7309"><XIcon/></a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-700 text-center">
                        <p className="text-sm text-gray-400">
                            &copy; 2025 Fahrul's website. Semua Hak Dilindungi.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}