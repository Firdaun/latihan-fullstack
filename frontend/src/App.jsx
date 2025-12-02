import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/messages';

function formatTimeAgo(timestamp) {
    if (!timestamp) return 'Just now'

    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) {
        return 'Just now'
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
        const days = Math.floor(diffInSeconds / 86400)
        return `${days} day${days > 1 ? 's' : ''} ago`
    }
}

export default function Apps() {
    return (
        <>
            <HeroSection />
            <Deskripsi />
        </>
    )
}

function HeroSection() {
    const [messages, setMessages] = useState([]);
    const [newName, setNewName] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const fetchMessages = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await fetch(API_URL)
            if (!response.ok) {
                throw new Error('Failed to retrieve message from server.')
            }
            const data = await response.json()
            setMessages(data)
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMessages()
    }, [fetchMessages])

    const sendMessage = async () => {
        if (!newName.trim() || !newTitle.trim()) {
            alert('Nama dan pesan tidak boleh kosong!')
            return
        }

        const messageData = {
            from: newName.trim(),
            title: newTitle.trim(),
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            })
            if (response.ok) {
                const savedMessage = await response.json()
                setMessages(prevMessages => [savedMessage, ...prevMessages])
                setNewName('')
                setNewTitle('')
            } else {
                alert('Failed to send message.')
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('A network connection error occurred.')
        }
    }

    const groupedMessages = []
    if (isLoading) {
        groupedMessages.push([{ from: "System", title: "Loading messages...", date: new Date().toISOString(), createdAt: new Date().toISOString() }]);
    } else {
        for (let i = 0; i < messages.length; i += 4) {
            groupedMessages.push(messages.slice(i, i + 4));
        }
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])


    return (
        <>
            <div className="flex flex-col bg-blue-50 items-center justify-center text-center mt-20 gap-5">
                <h1 className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-500 to-yellow-500 text-5xl font-DMSerif py-20">Welcome to Fahrul's website!</h1>
            </div>
            <h1 className="place font-semibold text-4xl">Message</h1>


            <div className="h-125 place flex border-20 border-gray-300 rounded-xl mt-5">
                <div className="relative w-10/12">
                    <div className='overflow-hidden h-full' ref={emblaRef}>
                        <div className="flex h-full ">
                            {groupedMessages.length === 0 && !isLoading ? (
                                <div className='shrink-0 grow-0 basis-full py-5 px-7 min-w-0'>
                                    <p className="text-center text-gray-500">No messages yet. Be the first to post!</p>
                                </div>
                            ) : (groupedMessages.map((slideGroup, slideIndex) => (
                                <div key={slideIndex} className='shrink-0 grow-0 basis-full py-5 px-7 min-w-0'>
                                    <div className="grid grid-cols-2 gap-5 h-full">
                                        {slideGroup.map((message, messageIndex) => (
                                            <MessageCard
                                                key={message.id || messageIndex}
                                                title={message.title}
                                                from={message.from}
                                                createdAt={message.createdAt || message.date}
                                                date={new Date(message.createdAt || message.date).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )))}
                        </div>
                        <button onClick={scrollPrev} className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-white opacity-70 p-1.5 rounded-full z-10 shadow-md border'>&lt;</button>
                        <button onClick={scrollNext} className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-white opacity-70 p-1.5 rounded-full z-10 shadow-md border'>&gt;</button>
                    </div>
                </div>


                <div className="relative wrap-break-word border-l-20 border-gray-300 w-1/3">
                    <div>
                        <textarea className='focus:outline-none resize-none w-full p-4 border-gray-300 border-b-20' placeholder="Masukkan nama" id="input-name" value={newName} onChange={(e) => setNewName(e.target.value)}></textarea>
                    </div>
                    <textarea className="focus:outline-none w-full p-4 h-full resize-none" placeholder="Masukkan pesan di sini..." id="input-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></textarea>
                    <button onClick={sendMessage} className="bg-blue-300 hover:cursor-pointer absolute w-15 h-15 right-0 bottom-0 rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="#000000" viewBox="0 0 256 256"><path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"></path></svg>
                    </button>
                </div>
            </div>
        </>
    )
}

function MessageCard({ title, from, date, createdAt }) {

    const [timeAgoText, setTimeAgoText] = useState(() => formatTimeAgo(createdAt))

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgoText(formatTimeAgo(createdAt))
        }, 60000)

        return () => clearInterval(interval)
    }, [createdAt])

    return (
        <div className="bg-blue-100 shadow-lg h-50 flex justify-between flex-col gap-2 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <p className="py-1.5 px-3 text-sm text-gray-600">From: {from}</p>
            <p className="p-3 text-center">{title}</p>
            <div className="flex justify-between text-sm text-gray-600 py-1.5 px-3">
                <p>{date}</p>
                <p>{timeAgoText}</p>
            </div>
        </div>
    );
}

function Deskripsi() {

    const components = [
        {
            name: 'Pengiriman Pesan (Form Interaktif):',
            desc: 'Pengunjung dapat dengan mudah mengirim pesan dengan mengisi Nama dan Isi Pesan melalui formulir input yang intuitif. Sistem akan memvalidasi pesan, memastikan Nama dan Pesan tidak kosong sebelum dikirim.'
        },
        {
            name: 'Tampilan Pesan (Embla Carousel):',
            desc: 'Pesan yang sudah terkirim akan ditampilkan dalam format kartu (`MessageCard`) yang menarik dan mudah dibaca. Pesan dikelompokkan menjadi slide berisi maksimal 4 pesan per slide, diorganisir menggunakan library Embla Carousel.',
            desc2: (
                <p className="mt-1 text-sm italic text-gray-600">Pengunjung dapat menavigasi pesan menggunakan tombol panah `&lt;` dan `&gt;`. Carousel diatur dalam mode loop sehingga navigasi dapat berputar tanpa akhir.</p>
            )
        },
        {
            name: 'Informasi Detail Pesan:',
            desc: 'Setiap kartu pesan menampilkan: Nama Pengirim, Isi Pesan, Tanggal Pesan dalam format lokal (misal: DD/MM/YYYY), dan Waktu Relatif yang diperbarui secara berkala (misal: "Just now", "5 minutes ago").'
        },
        {
            name: 'Pengambilan Data Asinkron:',
            desc: 'Data pesan diambil dari endpoint secara asinkron (menggunakan `fetchMessages`), memastikan user interface tetap responsif selama proses pemuatan data. Terdapat indikator loading yang akan muncul saat data pesan sedang dimuat.'
        },
    ]

    return (
        <>
            <div className="place px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
                    About This Page
                </h2>

                <section className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-2xl">
                    <h3 className="text-3xl font-semibold mb-6 border-b-2 pb-2 text-blue-600 flex items-center">
                        <span role="img" aria-label="globe" className="mr-3">🌐</span> Deskripsi Fitur Pesan
                    </h3>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Fitur pesan ini dirancang untuk memungkinkan pengunjung website berinteraksi secara langsung dengan meninggalkan komentar, testimoni, atau pesan singkat lainnya, menciptakan nuansa komunitas yang interaktif di halaman utama.
                    </p>

                    <h4 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                        <span role="img" aria-label="sparkles" className="mr-2 text-yellow-500">✨</span> Fungsionalitas Utama:
                    </h4>

                    <ul className="text-gray-700 space-y-9">
                        {components.map((components, index) => {
                            return (
                                <li key={index} className="flex">
                                    <span className="text-blue-500 font-bold mr-3 mt-1">✓</span>
                                    <div>
                                        <p className="font-semibold text-lg">{components.name}</p>
                                        <p>{components.desc}</p>
                                        {components.desc2}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </div>
        </>
    )
}