import { LegalPage } from "../Policies/PrivacyPolicy";

const ReturnPolicy = () => {
  return (
    <LegalPage
      title="Return & Refund Policy"
      content={
        <>
          <p className="text-white font-bold text-xl mb-4">
            Last updated: November 12, 2025
          </p>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              1. Return Window
            </h2>
            <p>
              You may return unused products within 30 days of delivery for a
              full refund. Products must be in original packaging and condition.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              2. Return Process
            </h2>
            <p>
              Contact our support team at returns@nathanlights.com with your
              order number and reason for return. We will provide return
              shipping instructions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              3. Refund Processing
            </h2>
            <p>
              Refunds will be processed within 7-10 business days after we
              receive the returned product. Refunds will be credited to the
              original payment method.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              4. Damaged or Defective Products
            </h2>
            <p>
              If you receive a damaged or defective product, contact us
              immediately. We will arrange for a replacement or full refund at
              no cost to you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              5. Non-Returnable Items
            </h2>
            <p>
              Custom-made products and clearance items are not eligible for
              returns unless defective.
            </p>
          </div>
        </>
      }
    />
  );
}

export default ReturnPolicy;
