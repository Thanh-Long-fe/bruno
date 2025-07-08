import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import DHSLogo from '../assets/DHS_cis_W.c9ca91ff.svg';
import { menuItems } from '../page/HomePage'; // ensure menuItems = [{ label: string, path: string }[]]

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <header className="bg-white shadow-md z-50 relative">
           <div className='max-w-[1024px] mx-auto p-4 '>
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div>
                    <div className="flex items-center gap-4">
                        <img src={DHSLogo} alt="DHS Logo" className="h-[50px]" />
                    </div>

                    <button
                        className="md:hidden text-[#005288]"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </div>
            <div>
                <nav className="hidden md:flex items-center p-4 justify-end gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="text-[#005288] text-base font-bold flex items-center gap-1"
                            onClick={() =>
                                setActiveDropdown(activeDropdown === item.label ? null : item.label)
                            }
                        >
                            {item.label}
                            <span
                                className={`transform transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''
                                    }`}
                            >
                                <ChevronDown size={16} />
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
            </div>
            {/* Mobile Slide Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-[260px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header inside mobile menu */}
                <div className="p-4 flex justify-between items-center border-b">
                    <img src={DHSLogo} alt="DHS Logo" className="h-8" />
                    <button
                        className="text-[#005288] text-xl font-bold"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex flex-col p-4 gap-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="text-[#005288] text-base font-semibold flex items-center justify-between"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                setActiveDropdown(null);
                            }}
                        >
                            {item.label}
                            <span
                                className={`transform transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''
                                    }`}
                            >
                                ▾
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Overlay when menu is open */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;
