import { LegalPage } from "../Policies/PrivacyPolicy";

const ShippingPolicy = () => {
  return (
    <LegalPage
      title="Shipping Policy"
      content={
        <>
          <p className="text-white font-bold text-xl mb-4">
            Last updated: November 12, 2025
          </p>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              1. Shipping Locations
            </h2>
            <p>
              We currently ship to all locations within India. International
              shipping is not available at this time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              2. Processing Time
            </h2>
            <p>
              Orders are typically processed and shipped within 2-3 business
              days. Custom orders may take longer.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              3. Delivery Time
            </h2>
            <p>
              Standard delivery takes 5-7 business days. Express shipping (2-3
              days) is available for an additional fee.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              4. Shipping Costs
            </h2>
            <p>
              Free shipping on all orders above ₹5,000. Orders below ₹5,000
              incur a ₹500 shipping charge.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              5. Order Tracking
            </h2>
            <p>
              Once your order is shipped, you will receive a tracking number via
              email to monitor your delivery.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-3">
              6. Delivery Issues
            </h2>
            <p>
              If your order doesn't arrive within the expected timeframe, please
              contact our support team at support@nathanlights.com.
            </p>
          </div>
        </>
      }
    />
  );
}

export default ShippingPolicy;
