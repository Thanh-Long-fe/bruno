const tools = [
    {
      title: 'Submit a Case Inquiry',
      description:
        'Submit an online inquiry about your case or request other services, such as an accommodation request, or how to correct an error on your notice.',
      image: '/img/1.jpg',
      link: '/',
    },
    {
      title: 'USCIS Processing Times Information',
      description:
        'See an estimate of how much time USCIS is taking to process your application or petition at its offices.',
      image: '/img/2.jpg',
      link: '/'
    },
    {
      title: 'USCIS Office Locations',
      description:
        'Find local and international USCIS offices and get directions to the office.',
      image: '/img/3.jpg',
      link: '/',
    },
  ];
  
  const RelatedToolsGrid = () => {
    return (
      <div className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div key={tool.title} className="border rounded overflow-hidden shadow bg-white">
            <img src={tool.image} alt={tool.title} className="w-full h-48 object-cover grayscale" />
            <div className="p-4 flex flex-col justify-between h-[220px]">
              <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{tool.description}</p>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#005ea2] text-white rounded hover:bg-blue-800 w-fit"
              >
                Visit Page
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default RelatedToolsGrid;
  