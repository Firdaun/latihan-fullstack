import { contactComponents } from "./data/contact.data";

export default function Contact() {

    return (
        <div className="flex flex-col mt-20">
            <div className="flex flex-col items-center py-20 bg-white">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">Contact Fahrul</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Ada saran dan pertanyaan?</p>
            </div>

            <div className="bg-blue-50 py-20 flex grow">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">

                    {contactComponents.map((item, index) => (
                        <div key={index} className="active:shadow-2xl flex flex-col h-90 justify-center items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">

                            <div className="p-8 h-32 w-32 flex justify-center items-center rounded-full shadow-lg bg-blue-100 mb-4">
                                <item.icon className="h-auto w-full text-gray-800" />
                            </div>

                            <div className="text-center mt-4">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
                                {item.href !== '#' ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-base font-medium ${item.linkTextClass} hover:underline transition-colors`}>
                                        {item.text}
                                    </a>
                                ) : (
                                    <p className={`text-base font-medium ${item.linkTextClass}`}>{item.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}