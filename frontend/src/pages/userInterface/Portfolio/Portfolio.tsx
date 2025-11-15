const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-linear-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-4 text-center">
          Our Portfolio
        </h1>
        <p className="text-gray-300 text-center text-lg mb-12">
          See how Nathan Lights transforms spaces
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600",
              title: "Modern Living Room",
              desc: "Nordic Pendant Installation",
            },
            {
              img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600",
              title: "Garden Pathway",
              desc: "Outdoor Lighting Series",
            },
            {
              img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
              title: "Bedroom Ambiance",
              desc: "Aurora Table Lamp Setup",
            },
            {
              img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600",
              title: "Office Space",
              desc: "LED Strip Accent Lighting",
            },
            {
              img: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600",
              title: "Dining Area",
              desc: "Crystal Chandelier Feature",
            },
            {
              img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600",
              title: "Hallway Design",
              desc: "Wall Sconce Series",
            },
          ].map((project, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-amber-400">{project.desc}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PortfolioPage;
