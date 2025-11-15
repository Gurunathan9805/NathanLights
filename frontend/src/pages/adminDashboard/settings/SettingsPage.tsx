import { useState } from "react";

const SettingsPage = () => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSettingChange = (key: any, value: any) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
  };

  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("New password must be at least 6 characters long!");
      return;
    }
    alert("Password updated successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Store Settings</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="store-name"
              className="text-gray-400 text-sm block mb-2"
            >
              Store Name
            </label>
            <input
              id="store-name"
              type="text"
              value={localSettings.storeName}
              onChange={(e) => handleSettingChange("storeName", e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="store-email"
              className="text-gray-400 text-sm block mb-2"
            >
              Store Email
            </label>
            <input
              id="store-email"
              type="email"
              value={localSettings.storeEmail}
              onChange={(e) =>
                handleSettingChange("storeEmail", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="store-phone"
              className="text-gray-400 text-sm block mb-2"
            >
              Store Phone
            </label>
            <input
              id="store-phone"
              type="tel"
              value={localSettings.storePhone}
              onChange={(e) =>
                handleSettingChange("storePhone", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="store-address"
              className="text-gray-400 text-sm block mb-2"
            >
              Store Address
            </label>
            <textarea
              id="store-address"
              value={localSettings.storeAddress}
              onChange={(e) =>
                handleSettingChange("storeAddress", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              rows={3}
            />
          </div>
          <button
            onClick={handleSaveSettings}
            className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Shipping Settings</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="free-shipping"
              className="text-gray-400 text-sm block mb-2"
            >
              Free Shipping Threshold (₹)
            </label>
            <input
              id="free-shipping"
              type="number"
              value={localSettings.freeShippingThreshold}
              onChange={(e) =>
                handleSettingChange(
                  "freeShippingThreshold",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="shipping-cost"
              className="text-gray-400 text-sm block mb-2"
            >
              Standard Shipping Cost (₹)
            </label>
            <input
              id="shipping-cost"
              type="number"
              value={localSettings.standardShippingCost}
              onChange={(e) =>
                handleSettingChange(
                  "standardShippingCost",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="processing-time"
              className="text-gray-400 text-sm block mb-2"
            >
              Processing Time (days)
            </label>
            <input
              id="processing-time"
              type="text"
              value={localSettings.processingTime}
              onChange={(e) =>
                handleSettingChange("processingTime", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="delivery-time"
              className="text-gray-400 text-sm block mb-2"
            >
              Delivery Time (days)
            </label>
            <input
              id="delivery-time"
              type="text"
              value={localSettings.deliveryTime}
              onChange={(e) =>
                handleSettingChange("deliveryTime", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSaveSettings}
            className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Notification Settings
        </h2>
        <div className="space-y-4">
          {[
            {
              id: "email-orders",
              label: "Email notifications for new orders",
              checked: true,
            },
            {
              id: "email-stock",
              label: "Email notifications for low stock",
              checked: true,
            },
            {
              id: "email-messages",
              label: "Email notifications for customer messages",
              checked: false,
            },
            { id: "daily-sales", label: "Daily sales report", checked: true },
            {
              id: "weekly-analytics",
              label: "Weekly analytics summary",
              checked: false,
            },
          ].map((setting) => (
            <label
              key={setting.id}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-gray-300">{setting.label}</span>
              <input
                id={setting.id}
                type="checkbox"
                defaultChecked={setting.checked}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500 focus:ring-2"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Account Security</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="current-password"
              className="text-gray-400 text-sm block mb-2"
            >
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="text-gray-400 text-sm block mb-2"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="text-gray-400 text-sm block mb-2"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
