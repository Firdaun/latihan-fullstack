import { Link } from "react-router";

export default function Blog() {
    const components = [
        {
            judul: 'Critical Security Vulnerability in React Server Components',
            timeAgo: '19/12/2025',
            keterangan: 'Security researchers have found and disclosed two additional vulnerabilities in React Server Components while attempting to exploit the patches in last week’s critical vulnerability…'
        },
        {
            judul: 'Critical Security Vulnerability in React Server Components',
            timeAgo: '19/12/2025',
            keterangan: 'Security researchers have found and disclosed two additional vulnerabilities in React Server Components while attempting to exploit the patches in last week’s critical vulnerability…'
        },
        {
            judul: 'Critical Security Vulnerability in React Server Components',
            timeAgo: '19/12/2025',
            keterangan: 'Security researchers have found and disclosed two additional vulnerabilities in React Server Components while attempting to exploit the patches in last week’s critical vulnerability…'
        },
        {
            judul: 'Critical Security Vulnerability in React Server Components',
            timeAgo: '19/12/2025',
            keterangan: 'Security researchers have found and disclosed two additional vulnerabilities in React Server Components while attempting to exploit the patches in last week’s critical vulnerability…'
        },
    ]
    return (
        <>
            <div className="place">
                <h1 className="max-w-1/2 mx-auto text-5xl font-semibold mt-20">Latest Updates</h1>
                {components.map((components, index) => {
                    return (
                        <div key={index} className="max-w-1/2 font-RobotoSlab my-5 border p-5 mx-auto rounded-xl">
                            <h1 className="text-2xl font-bold">{components.judul}</h1>
                            <p className="my-3 text-slate-500">{components.timeAgo}</p>
                            <p className="text-slate-600">{components.keterangan}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}