import { useState } from "react";
const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = (e: any) => {
    e.preventDefault();
    alert("Thank you! We will get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-linear-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                key="contact-name"
                type="text"
                placeholder="Your Name *"
                required
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
              <input
                key="contact-email"
                type="email"
                placeholder="Your Email *"
                required
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
              <textarea
                key="contact-message"
                placeholder="Your Message *"
                required
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-amber-400 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  info@nathanlights.com
                </p>
                <p>
                  <strong className="text-white">Phone:</strong> +91 98765 43210
                </p>
                <p>
                  <strong className="text-white">Address:</strong> 123 Design
                  Street, Mumbai, India 400001
                </p>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-amber-400 mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-amber-400 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Facebook
                </button>
                <button className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
                  Instagram
                </button>
                <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Pinterest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
