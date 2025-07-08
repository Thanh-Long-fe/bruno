import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react';
import DHSLogo from '../assets/DHS_cis_W.c9ca91ff.svg';
import { menuItems } from '../page/HomePage';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white">
  {/* Top menu */}
  <div className="bg-gray-200 w-full">
    <div className="max-w-[1024px] mx-auto flex items-center">
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 p-4 w-full">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="text-black text-lg font-bold hover:text-blue-400"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  </div>

  {/* Logo + social */}
  <div className="w-full bg-gray-100">
    <div className="max-w-[1024px] mx-auto text-black py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <img src={DHSLogo} alt="DHS Logo" className="h-[60px]" />
      <div className="flex flex-wrap justify-center gap-3">
        <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Facebook size={20} /></a>
        <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Twitter size={20} /></a>
        <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Youtube size={20} /></a>
        <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Instagram size={20} /></a>
        <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Linkedin size={20} /></a>
        <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Mail size={20} /></a>
      </div>
    </div>
  </div>

  {/* Blue section */}
  <div className="w-full bg-[#005288]">
    <div className="py-8 px-4 max-w-[1024px] mx-auto grid gap-8 md:grid-cols-3 text-sm">
      {/* Middle col */}
      <div className="flex flex-col items-center gap-4 md:col-span-2">
        <img src="/img/v.png" alt="DHS" className="h-[60px]" />

        <div className="flex flex-col sm:flex-row sm:justify-center gap-8 text-white">
          <div className="flex flex-col gap-1 text-base">
            <a href="#" className="underline">About USCIS</a>
            <a href="#" className="underline">Accessibility</a>
            <a href="#" className="underline">Budget and Performance</a>
            <a href="#" className="underline">DHS Components</a>
          </div>
          <div className="flex flex-col gap-1 text-base">
            <a href="#" className="underline">Freedom of Information Act</a>
            <a href="#" className="underline">No FEAR Act Data</a>
            <a href="#" className="underline">Privacy and Legal</a>
            <a href="#" className="underline">Disclaimers</a>
            <a href="#" className="underline">Site Map</a>
          </div>
          <div className="flex flex-col gap-1 text-base">
            <a href="#" className="underline">Office of the Inspector General</a>
            <a href="#" className="underline">The White House</a>
            <a href="#" className="underline">USA.gov</a>
          </div>
        </div>
      </div>

      {/* Right col */}
      <div className="flex justify-end items-center">
        <img src="/img/d.png" alt="NTAS" className="max-h-[170px] object-contain" />
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
