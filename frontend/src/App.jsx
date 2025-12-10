import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { alertError } from './components/data/alert'

const API_URL = import.meta.env.VITE_API_URL + '/messages'

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
    const [messages, setMessages] = useState([])
    const [newName, setNewName] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [itemsPerGroup, setItemsPerGroup] = useState(4)
    const messageInputRef = useRef(null)
    const nameInputRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerGroup(2)
            } else {
                setItemsPerGroup(4)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
            alertError('Nama dan pesan tidak boleh kosong!')
            return
        }

        setIsSending(true)

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
                nameInputRef.current?.focus()
            } else {
                const errorData = await response.json()
                alertError(errorData.error || 'Failed to send message.')
            }
        } catch (error) {
            console.error('Error sending message:', error)
            alertError('A network connection error occurred.')
        } finally {
            setIsSending(false)
        }
    }

    const handleNameKeyDown = (e) => {
        if(e.key === 'Enter' || e.key === 'ArrowDown'){
            e.preventDefault()
            messageInputRef.current?.focus()
        }
    }

    const handleMessageKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            nameInputRef.current?.focus()
        }
    }

    const groupedMessages = []
    if (isLoading) {
        groupedMessages.push([{ from: "System", title: "Loading messages...", date: new Date().toISOString(), createdAt: new Date().toISOString() }])
    } else {
        for (let i = 0; i < messages.length; i += itemsPerGroup) {
            groupedMessages.push(messages.slice(i, i + itemsPerGroup))
        }
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])


    return (
        <>
            <div className="flex flex-col bg-blue-50 items-center justify-center text-center pt-18 md:pt-20 gap-5">
                <h1 className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-500 to-yellow-500 text-4xl md:text-5xl font-DMSerif py-20">Welcome to Fahrul's website!</h1>
            </div>
            <h1 className="place mt-5 font-semibold text-2xl md:text-4xl">Message</h1>
            <div className="lg:h-125 place flex flex-col lg:flex-row border-2 lg:border-2 border-blue-500 rounded-xl mt-5 select-none">
                <div className="relative lg:w-10/12">
                    <div className='overflow-hidden h-full' ref={emblaRef}>
                        <div className="flex h-full">
                            {groupedMessages.length === 0 && !isLoading ? (
                                <div className='shrink-0 grow-0 basis-full py-5 px-7 min-w-0'>
                                    <p className="text-center text-gray-500">No messages yet. Be the first to post!</p>
                                </div>
                            ) : (groupedMessages.map((slideGroup, slideIndex) => (
                                <div key={slideIndex} className='shrink-0 grow-0 basis-full py-5 px-7 min-w-0'>
                                    <div className="grid md:grid-cols-2 gap-5 h-full">
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
                        <button onClick={scrollPrev} className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-1.5 rounded-full z-10 border-2 border-blue-500'>&lt;</button>
                        <button onClick={scrollNext} className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-1.5 rounded-full z-10 border-2 border-blue-500'>&gt;</button>
                    </div>
                </div>


                <div className="relative wrap-break-word lg:border-l-2 border-blue-500 lg:w-1/3">
                    <div>
                        <textarea onKeyDown={handleNameKeyDown} ref={nameInputRef} className='focus:outline-none resize-none w-full p-4 border-blue-500 lg:border-y-0 border-y-2 lg:border-b-2' placeholder="Masukkan nama" id="input-name" value={newName} onChange={(e) => setNewName(e.target.value)}></textarea>
                    </div>
                    <textarea onKeyDown={handleMessageKeyDown} ref={messageInputRef} className="focus:outline-none w-full p-4 h-50 resize-none" placeholder="Masukkan pesan di sini..." id="input-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></textarea>
                    <button disabled={isSending} onClick={sendMessage} className={`${isSending ? 'opacity-80 bg-blue-500 cursor-not-allowed' : 'bg-blue-500 active:scale-90 hover:shadow-lg hover:cursor-pointer'} transition-transform duration-150 absolute w-15 h-15 right-0 bottom-0 rounded-full flex justify-center items-center`}>
                        {isSending ? (
                            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="#ffffff" viewBox="0 0 256 256"><path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"></path></svg>

                        )}
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
        <div className="bg-white border border-blue-500 relative shadow-lg h-[217px] flex justify-between flex-col gap-2 rounded-lg transition-all duration-300 hover:shadow-2xl">
            <div className='cursor-pointer text-red-500 absolute right-0'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg></div>
            <p className="py-1.5 px-3 text-sm text-gray-600">From: {from}</p>
            <p className="p-3 text-center">{title}</p>
            <div className="flex justify-between text-sm text-gray-600 py-1.5 px-3">
                <p>{date}</p>
                <p>{timeAgoText}</p>
            </div>
        </div>
    )
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
            <div className="place py-10 px-0 lg:px-8">
                <h2 className="text-2xl lg:text-4xl font-bold text-center mb-10 text-gray-800">
                    About This Page
                </h2>

                <section className="lg:w-4xl lg:mx-auto bg-white lg:p-10 rounded-xl lg:shadow-2xl">
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-6 border-b-2 pb-2 text-blue-500 flex items-center">
                        <span role="img" aria-label="globe" className="mr-3">🌐</span> Deskripsi Fitur Pesan
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                        Fitur pesan ini dirancang untuk memungkinkan pengunjung website berinteraksi secara langsung dengan meninggalkan komentar, testimoni, atau pesan singkat lainnya, menciptakan nuansa komunitas yang interaktif di halaman utama.
                    </p>

                    <h4 className="text-lg md:text-2xl font-bold mb-4 text-gray-800 flex items-center">
                        <span role="img" aria-label="sparkles" className="mr-2 text-yellow-500">✨</span> Fungsionalitas Utama:
                    </h4>

                    <ul className="text-gray-700 space-y-9">
                        {components.map((components, index) => {
                            return (
                                <li key={index} className="flex">
                                    <span className="text-blue-500 font-bold mr-3 mt-1">✓</span>
                                    <div>
                                        <p className="font-semibold text-base">{components.name}</p>
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