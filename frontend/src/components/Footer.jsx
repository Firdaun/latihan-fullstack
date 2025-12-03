export default function Footer() {

    const XIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="23" height="23" viewBox="0 0 256 256"><path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path></svg>
    )

    const components = [
        {
            name: 'TENTANG KAMI',
            links: [
                { name: 'Tentang Fahrul\'s website', href: '#' },
                { name: 'Blog / Berita Terbaru', href: '#' },
                { name: 'Karir', href: '#' },
                { name: 'Testimoni', href: '#' },
            ]
        },
        {
            name: 'LAYANAN & PRODUK',
            links: [
                { name: 'Kategori Produk A', href: '#' },
                { name: 'Layanan Spesial', href: '#' },
                { name: 'Portofolio', href: '#' },
                { name: 'Penawaran Eksklusif', href: '#' },
            ]
        },
        {
            name: 'DUKUNGAN & HUKUM',
            links: [
                { name: 'Kontak Kami', href: '#' },
                { name: 'Pusat Bantuan / FAQ', href: '#' },
                { name: 'Kebijakan Privasi', href: '#' },
                { name: 'Syarat & Ketentuan', href: '#' },
            ]
        },
    ]

    return (
        <>
            <footer class="bg-gray-800 text-white">
                <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {components.map((column, columnIndex) => (
                            <div key={columnIndex}>
                                <h3 class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">{column.name}</h3>
                                <nav class="space-y-3">
                                    {column.links.map((link, linkIndex) => (
                                        <a key={linkIndex} href={link.href} class="text-gray-400 hover:text-white block text-sm transition duration-150 ease-in-out">{link.name}</a>
                                    ))}
                                </nav>
                            </div>
                        ))}
                        <div>
                            <h3 class="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">HUBUNGI KAMI</h3>
                            <p class="text-gray-400 text-sm mb-3">
                                Alamat: Jl. Sukahening No. 123<br />
                                Email: fahrulbrrads@gmail.com
                            </p>
                            <div class="flex">
                                <a className="text-gray-400 hover:text-white" rel="noopener noreferrer" target="_blank" href="https://x.com/Fahrul7309"><XIcon/></a>
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 pt-6 border-t border-gray-700 text-center">
                        <p class="text-sm text-gray-400">
                            &copy; 2025 Fahrul's website. Semua Hak Dilindungi.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}