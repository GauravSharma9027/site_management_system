import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#0b2f6d] text-gray-200">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 border-b border-gray-700">

                {/* Company Info */}
                <div>
                    <h2 className="text-white font-bold text-2xl">InfraContracts</h2>
                    <p className="text-sm mt-3 leading-relaxed">
                        Empowering industries with smart contract management solutions.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Navigation</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
                        <li><Link to="/projects" className="hover:text-yellow-300 transition">Projects</Link></li>
                        <li><Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link></li>
                        <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-yellow-300 transition">Terms of Service</Link></li>
                        <li><Link to="/faq" className="hover:text-yellow-300 transition">FAQs</Link></li>
                        <li><Link to="/support" className="hover:text-yellow-300 transition">Support</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2"><FaEnvelope /> info@infracontracts.com</li>
                        <li className="flex items-center gap-2"><FaPhoneAlt /> +91 98765 43210</li>
                        <li className="flex items-center gap-2"><FaMapMarkerAlt /> Sector 62, Noida, India</li>
                    </ul>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" aria-label="LinkedIn" className="hover:text-yellow-300 text-xl"><FaLinkedin /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-yellow-300 text-xl"><FaTwitter /></a>
                        <a href="#" aria-label="YouTube" className="hover:text-yellow-300 text-xl"><FaYoutube /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center py-5 text-sm bg-[#092a4d]">
                © {new Date().getFullYear()} InfraContracts. All rights reserved.
            </div>
        </footer>
    );
}
