import { useCallback, useState } from "react";

const Footer = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useCallback((page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  }, []);

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-1 mb-4">
              <span
                className="text-2xl font-serif italic text-amber-400"
                style={{ fontFamily: "cursive" }}
              >
                Nathan
              </span>
              <span className="text-2xl font-bold text-amber-400">LIGHTS</span>
            </div>
            <p className="text-gray-400 mb-4">
              Handcrafted lighting solutions with premium quality and innovative
              design.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => navigate("shop")}
                  className="hover:text-amber-400"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // setCategoryFilter("table");
                    navigate("shop");
                  }}
                  className="hover:text-amber-400"
                >
                  Table Lamps
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // setCategoryFilter("pendant");
                    navigate("shop");
                  }}
                  className="hover:text-amber-400"
                >
                  Pendant Lights
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // setCategoryFilter("led");
                    navigate("shop");
                  }}
                  className="hover:text-amber-400"
                >
                  LED Lighting
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => navigate("about")}
                  className="hover:text-amber-400"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("portfolio")}
                  className="hover:text-amber-400"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("blog")}
                  className="hover:text-amber-400"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("contact")}
                  className="hover:text-amber-400"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => navigate("faq")}
                  className="hover:text-amber-400"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("shipping")}
                  className="hover:text-amber-400"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("returns")}
                  className="hover:text-amber-400"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("privacy")}
                  className="hover:text-amber-400"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("terms")}
                  className="hover:text-amber-400"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Nathan Lights. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-amber-400">
              Facebook
            </button>
            <button className="text-gray-400 hover:text-amber-400">
              Instagram
            </button>
            <button className="text-gray-400 hover:text-amber-400">
              Twitter
            </button>
            <button className="text-gray-400 hover:text-amber-400">
              Pinterest
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
