import CaseStatusChecker from '../components/checkCase';
import RelatedToolsGrid from '../components/list';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      <div className="w-full bg-gray-100">
        <div className="max-w-[1024px] mx-auto flex justify-between items-center">
          <div className='flex items-center gap-3'>
            <div>
              <img src="/img/icon.webp" className='w-[23px] h-[13px]' alt="" />
            </div>
            <div className='text-sm'>
              An official website of the United States government
            </div>
          </div>
          <div className='flex text-sm gap-2 text-blue-800 hover:underline cursor-pointer'>
            <div>Español
            </div>
            <div className='text-sm'>
            Multilingual Resources
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white relative" style={{ boxShadow: "0 3px 6px #00000029" }}>
        <Header />
      </div>
      <main className='bg-gray-100'>
        <div className="max-w-[1024px] mx-auto p-6 pb-10 bg-white">
          <div className='text-3xl font-bold'>Case Status Online</div>
          <CaseStatusChecker />
          <div className='flex items-center justify-between px-8 flex-wrap'>
            <div><span onClick={() => window.location.reload()} className='text-blue-800 text-sm hover:underline'>DHS PRIVACY NOTICE</span></div>
            <div><span onClick={() => window.location.reload()} className='text-blue-800 text-sm hover:underline'>PAPERWORK REDUCTION ACT</span></div>
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
          <RelatedToolsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
