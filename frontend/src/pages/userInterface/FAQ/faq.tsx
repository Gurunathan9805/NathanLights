const FAQPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {[
            {
              q: "What are your shipping times?",
              a: "We typically ship within 2-3 business days. Delivery takes 5-7 business days within India.",
            },
            {
              q: "Do you offer international shipping?",
              a: "Currently, we only ship within India. International shipping coming soon!",
            },
            {
              q: "What is your return policy?",
              a: "We offer a 30-day return policy for unused items in original packaging. Return shipping is free for defective products.",
            },
            {
              q: "Are your products energy efficient?",
              a: "Yes! All our LED products are energy efficient and rated for long-term use.",
            },
            {
              q: "Do you offer custom designs?",
              a: "Yes, we offer custom design services. Contact us to discuss your requirements.",
            },
            {
              q: "What is the warranty period?",
              a: "All Nathan Lights products come with a 2-year warranty against manufacturing defects.",
            },
            {
              q: "How do I care for my lighting fixtures?",
              a: "Clean with a soft, dry cloth. Avoid harsh chemicals. Handle resin parts with care.",
            },
            {
              q: "Can I track my order?",
              a: "Yes! Once shipped, you will receive a tracking number via email.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-amber-400 mb-3">{faq.q}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FAQPage;
