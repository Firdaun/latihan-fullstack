import { Link } from "react-router";
import { componentsNav } from "./data/navbar.data";

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="place flex justify-between">
                <h1 className="text-4xl font-bold">Fahrul</h1>
                <ul className="flex font-semibold gap-5 items-center">
                    {componentsNav.map((to, index) => (
                        <li key={index}><Link className="hover:text-white" to={to.links}>{to.menu}</Link></li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}