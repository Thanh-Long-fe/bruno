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
        <div className=' bg-gray-200 w-full'>
        <div className="max-w-[1024px] mx-auto flex tems-center justify-around">
        <div className="flex items-center justify-between gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-black text-lg font-bold flex items-center gap-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full bg-gray-100'>
        <div className=" bg-transparent max-w-[1024px] mx-auto text-black py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
          <img src={DHSLogo} alt="DHS Logo" className="h-[60px]" />
          </div>
  
          <div className="flex gap-3">
            <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Twitter size={20} /></a>
            <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Youtube size={20} /></a>
            <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Linkedin size={20} /></a>
            <a href="#" className="p-2 bg-white text-black rounded hover:opacity-80"><Mail size={20} /></a>
          </div>
        </div>
        </div>
  
        {/* Blue bottom section */}
        <div className="py-8 bg-[#005288] px-4 grid md:grid-cols-3 gap-8 text-sm">
          {/* Left col */}
          <div>
            <img src={DHSLogo} alt="DHS" className="h-10 mb-2" />
          </div>
  
          {/* Middle col - links */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:underline">About USCIS</a>
              <a href="#" className="hover:underline">Accessibility</a>
              <a href="#" className="hover:underline">Budget and Performance</a>
              <a href="#" className="hover:underline">DHS Components</a>
            </div>
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:underline">Freedom of Information Act</a>
              <a href="#" className="hover:underline">No FEAR Act Data</a>
              <a href="#" className="hover:underline">Privacy and Legal</a>
              <a href="#" className="hover:underline">Disclaimers</a>
              <a href="#" className="hover:underline">Site Map</a>
            </div>
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:underline">Office of the Inspector General</a>
              <a href="#" className="hover:underline">The White House</a>
              <a href="#" className="hover:underline">USA.gov</a>
            </div>
          </div>
  
          {/* Right col - NTAS box */}
          <div className="bg-[#0076a8] p-4 rounded text-center">
            <p className="text-xs mb-1">National Terrorism Advisory System</p>
            <div className="bg-white text-[#005288] font-bold py-2 mb-2">NTAS</div>
            <p className="text-sm font-semibold mb-1">BULLETIN</p>
            <p className="text-xs text-white underline cursor-pointer mb-2">READ MORE</p>
            <a href="#" className="text-xs text-white underline">Put this widget on your web page</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  