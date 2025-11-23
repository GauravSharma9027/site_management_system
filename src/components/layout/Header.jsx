import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdHome, MdAssignment, MdInfo, MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const headerItems = [
        { path: "/", label: "Home", icon: <MdHome size={20} /> },
        { path: "/createContractPage", label: "Contract Page", icon: <MdAssignment size={20} /> },
        { path: "#", label: "Site Detail", icon: <MdInfo size={20} /> },
        { path: "#", icon: <FaUserCircle size={30} /> },
    ];

    return (
        <header className="w-screen fixed top-0 z-50 px-4 md:px-16 py-4 bg-gradient-to-br from-[#003f9a] to-[#004bb8]">
                <div className="px-6 py-2 bg-white/20 flex items-center justify-between rounded-[50rem] shadow-sm backdrop-blur-md border border-white/20">
                    {/* Left: Logo/Title */}
                    <div>
                        <h1 className="text-white text-nowrap font-bold text-sm sm:text-lg lg:text-xl tracking-wide">Site Management System</h1>
                    </div>
                    {/* Right: Tablet and Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium">
                        {headerItems.map((item, index) => (
                            <Link key={index} to={item.path} className="flex items-center gap-2 text-nowrap hover:text-yellow-300 hover:underline underline-offset-4 active:underline transition duration-300">
                                {item.icon} {item.label}
                            </Link>
                        ))}
                    </nav>
                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {menuOpen && (
                    <div className="lg:hidden mt-4 px-6 py-4 bg-white/20 rounded-3xl backdrop-blur-md border border-white/20 transform duration-500">
                        <nav className="flex flex-col gap-4 font-medium">
                            {headerItems.map((item, index) => (
                                <Link key={index} to={item.path} className="flex items-center gap-2 text-nowrap text-white hover:text-yellow-300 hover:underline underline-offset-4 active:underline transition duration-300" onClick={() => setMenuOpen(false)}>
                                    {item.icon} {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
        </header>
    );
}