import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="place flex justify-between">
                <h1 className="text-4xl font-bold">Fahrul</h1>
                <ul className="flex font-semibold gap-5 items-center">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="#">Course</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>
        </nav>
    )
}