export default function Contact() {

    const components = [
        {
            name: 'Twitter',
            value: (<a href="https://x.com/Fahrul7309" target="_blank" className="">@Fahrul7309 Ikuti Update Terbaru</a>),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#000000" viewBox="0 0 256 256"><path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path></svg>
            )
        },
        {
            name: 'WhatsApp',
            value: (<a href="https://wa.me/+628960447555" target="_blank" className="">+628960447555 Respon Cepat</a>),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#000000" viewBox="0 0 256 256"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path></svg>
            )
        },
        {
            name: 'Our office location',
            value: (<p className="">kec. sukahening kab.tasikmalaya</p>),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#000000" viewBox="0 0 256 256"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path></svg>
            )
        }
    ]

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col h-full justify-center items-center ">
                <h1 className="text-5xl font-bold">Contact Fahrul</h1>
                <p className="text-2xl font-semibold">Ada saran dan pertanyaan?</p>
            </div>
            <div className="bg-blue-200 h-90">
                <div className="bg-gray-200 place flex -translate-y-1/3 justify-around m-auto w-[90%]">
                    {components.map((components, index) => (
                        <div key={index} className="-translate-y-1/4 gap-5 items-center flex flex-col">
                            <div className="h-37 w-37 flex justify-center items-center rounded-full bg-blue-200">
                                {components.icon}
                            </div>
                            <div className="text-center w-37">
                                <h1 className="text-2xl font-semibold">{components.name}</h1>
                                {components.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}