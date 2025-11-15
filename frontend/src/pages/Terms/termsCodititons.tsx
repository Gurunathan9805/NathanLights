import { LegalPage } from "../Policies/PrivacyPolicy";

const TermsConditions = () => {
  return (
    <LegalPage
      title="Terms & Conditions"
      content={
        <>
          <p className="text-white font-bold text-xl mb-4">
            Last updated: November 12, 2025
          </p>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Nathan Lights website, you accept and agree
              to be bound by these terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              2. Product Information
            </h2>
            <p>
              We strive to provide accurate product descriptions and images.
              However, slight variations may occur due to the handcrafted nature
              of our products.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              3. Pricing
            </h2>
            <p>
              All prices are in Indian Rupees (INR) and include applicable
              taxes. We reserve the right to change prices without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              4. Orders and Payment
            </h2>
            <p>
              All orders are subject to acceptance and availability. Payment
              must be received before order processing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              5. Intellectual Property
            </h2>
            <p>
              All content on this website, including designs, images, and text,
              is the property of Nathan Lights and protected by copyright laws.
            </p>
          </div>
        </>
      }
    />
  );
};

export default TermsConditions;
