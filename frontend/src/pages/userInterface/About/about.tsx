import { ChevronRight } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-amber-400">
            About Nathan Lights
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-white space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              Our Story
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Nathan Lights was born from a passion for creating unique,
              handcrafted lighting solutions that blend modern technology with
              timeless craftsmanship. Founded in 2020, we've been illuminating
              homes and businesses with our signature 3D printed designs,
              premium resin work, and carefully selected wood finishes.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We believe that lighting is more than just functionality—it's an
              art form that transforms spaces and creates ambiance. Our mission
              is to provide innovative, sustainable, and beautifully designed
              lighting solutions that inspire and delight our customers.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              Our Values
            </h2>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li className="flex items-start">
                <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Quality Craftsmanship:</strong>{" "}
                  Every product is meticulously handcrafted with attention to
                  detail
                </span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Innovation:</strong> We embrace
                  cutting-edge 3D printing technology while honoring traditional
                  techniques
                </span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Sustainability:</strong> We use
                  eco-friendly materials and processes wherever possible
                </span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Customer Satisfaction:</strong>{" "}
                  Your happiness is our priority, backed by our 2-year warranty
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-amber-400 mb-4 text-center">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  500+
                </div>
                <p className="text-gray-300">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  50+
                </div>
                <p className="text-gray-300">Unique Designs</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  100%
                </div>
                <p className="text-gray-300">Handcrafted</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  2 Years
                </div>
                <p className="text-gray-300">Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
