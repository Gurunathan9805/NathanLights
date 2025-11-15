const BlogPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">
          Lighting Ideas & Tips
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Top 10 Lighting Trends in 2025",
              date: "Nov 10, 2025",
              excerpt:
                "Discover the latest trends in home lighting design, from smart technology to sustainable materials.",
            },
            {
              title: "How to Choose the Perfect Light for Your Living Room",
              date: "Nov 5, 2025",
              excerpt:
                "A comprehensive guide to selecting the right lighting fixtures for your living space.",
            },
            {
              title: "Energy-Efficient LED Lighting Tips",
              date: "Oct 28, 2025",
              excerpt:
                "Learn how LED lights can save you money while providing better illumination.",
            },
            {
              title: "The Art of Layered Lighting",
              date: "Oct 20, 2025",
              excerpt:
                "Master the technique of combining ambient, task, and accent lighting.",
            },
            {
              title: "Outdoor Lighting Ideas for Your Garden",
              date: "Oct 15, 2025",
              excerpt:
                "Transform your outdoor space with strategic lighting placement and design.",
            },
            {
              title: "Smart Home Lighting Integration",
              date: "Oct 10, 2025",
              excerpt:
                "Everything you need to know about connecting your lights to smart home systems.",
            },
          ].map((post, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <div className="h-48 bg-linear-to-r from-amber-500 to-amber-700"></div>
              <div className="p-6">
                <p className="text-amber-400 text-sm mb-2">{post.date}</p>
                <h3 className="text-white font-bold text-xl mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <button className="text-amber-400 hover:underline font-semibold">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BlogPage;
