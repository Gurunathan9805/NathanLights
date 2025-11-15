export const LegalPage = ({ title, content }: any) => (
  <div className="min-h-screen bg-linear-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-amber-400 mb-8">{title}</h1>
      <div className="bg-gray-800 p-8 rounded-lg">
        <div className="text-gray-300 space-y-6 leading-relaxed">{content}</div>
      </div>
    </div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <LegalPage
      title="Privacy Policy"
      content={
        <>
          <p className="text-white font-bold text-xl mb-4">
            Last updated: November 12, 2025
          </p>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, including name,
              email address, phone number, shipping address, and payment
              information when you make a purchase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to process your orders,
              communicate with you, improve our services, and comply with legal
              obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              3. Information Sharing
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share information with service providers who assist us in
              operating our website and conducting our business.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              4. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration, or
              disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              information. Contact us at privacy@nathanlights.com for any
              privacy-related requests.
            </p>
          </div>
        </>
      }
    />
  );
};

export default PrivacyPolicy;
