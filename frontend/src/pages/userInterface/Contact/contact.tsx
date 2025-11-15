import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  updateFormField,
  submitContactForm,
} from "../../../store/slices/contactSlice";

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const { formData, status, error } = useAppSelector((state) => state.contact);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(updateFormField({ field, value: e.target.value }));
    };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(submitContactForm(formData));

    if (submitContactForm.fulfilled.match(resultAction)) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-linear-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">
          Contact Us
        </h1>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-600 text-white rounded-lg">
            Thank you! We will get back to you soon.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={formData.name}
                onChange={handleInputChange("name")}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email *"
                required
                value={formData.email}
                onChange={handleInputChange("email")}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
                disabled={status === "loading"}
              />
              <textarea
                placeholder="Your Message *"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange("message")}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition ${
                  status === "loading" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
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
