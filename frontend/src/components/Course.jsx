export default function Course({ embedId, title }) {

    const srcUrl = `https://www.youtube.com/embed/${embedId}`

    return (
        <div className="mt-20">
            <div className="flex flex-col items-center py-20 bg-white">
                <h1 className="text-5xl font-extrabold text-gray-900">Reference</h1>
                <p className="text-2xl font-semibold text-gray-600 mt-2">Referensi pembelajaran</p>
            </div>

            <div className="max-w-200 mb-28 m-auto relative rounded-2xl overflow-hidden aspect-video">
                <iframe
                    title={title || "Embedded YouTube Video"}
                    src={srcUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                />
            </div>
        </div>
    )
}