const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="23" height="23" viewBox="0 0 256 256"><path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path></svg>
)

const componentsFooter = [
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

export { componentsFooter, XIcon }