import { Link } from 'react-router-dom';
import DHSLogo from '../assets/DHS_cis_W.c9ca91ff.svg';
import CaseStatusChecker from '../components/checkCase';
import RelatedToolsGrid from '../components/list';
import Footer from '../components/Footer';

export const menuItems = [
  { label: 'Topics', path: '/' },
  { label: 'Forms', path: '/' },
  { label: 'Newsroom', path: '/' },
  { label: 'Citizenship', path: '/' },
  { label: 'Green Card', path: '/' },
  { label: 'Laws', path: '/' },
  { label: 'Tools', path: '/' },
];

const HomePage = () => {
  return (
    <div>
      <div className="w-full bg-white relative" style={{ boxShadow: "0 3px 6px #00000029"}}>
        <div className="max-w-[1024px] mx-auto p-6">
          {/* Logo + Title */}
          <div className="flex items-center gap-4">
            <img src={DHSLogo} alt="DHS Logo" className="h-[60px]" />
          </div>

          {/* Menu */}
          <div>
            <nav className="flex items-center justify-end gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-[#005288] text-lg font-bold hover:underline flex items-center gap-1"
                >
                  {item.label}
                  <span>▾</span>
                </Link>
              ))}
            </nav>''
          </div>
        </div>
      </div>
      <main className='bg-gray-100'>
        <div className="max-w-[1024px] mx-auto p-6 bg-white">
        <div className='text-3xl font-bold'>Case Status Online</div>
        <CaseStatusChecker />
        <div className='flex items-center justify-around'>
          <div><Link to={'/'} className='text-blue-500 text-sm hover:underline'>DHS PRIVACY NOTICE</Link></div>
          <div><Link to={'/'} className='text-blue-500 text-sm hover:underline'>PAPERWORK REDUCTION ACT</Link></div>
        </div>
        <div className="w-full h-1 bg-gray-300 mt-2"></div>
        <div className="w-full mt-4 border rounded overflow-hidden shadow bg-white">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src="/img/coaImage.230f8bef.jpg" 
                alt="Related"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div className="md:w-2/3 p-6">
              <h2 className="text-xl font-semibold mb-2">Change of Address</h2>
              <p className="text-gray-700 mb-3">
                We strongly encourage you to update your address with USCIS to ensure you receive all correspondence and
                benefits from us in a timely manner and avoid possible delays or denials related to your case.
              </p>
              <p className="text-gray-700 mb-4">
                Visit the{' '}
                <a
                  href="/"
                  className="text-blue-700 underline"
                  rel="noopener noreferrer"
                >
                  Change of Address webpage
                </a>{' '}
                to get started.
              </p>
              <a
                href="/"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#005ea2] text-white rounded hover:bg-blue-800"
              >
                Visit Page
              </a>
            </div>
          </div>
        </div>
        <RelatedToolsGrid/>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
