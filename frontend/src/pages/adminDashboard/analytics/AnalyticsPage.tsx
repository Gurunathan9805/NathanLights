import products from "../../../data/products";

interface AnalyticsPageProps {
  // Add any props if needed
}

const AnalyticsPage = () => {
  const monthlyRevenue = [45000, 52000, 48000, 61000, 58000, 67000];
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  return (
    <div>
      {/* Revenue Chart */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-6">Revenue Overview</h2>
        <div className="h-64 flex items-end justify-between gap-2 md:gap-4 overflow-x-auto">
          {monthlyRevenue.map((revenue, idx) => (
            <div
              key={months[idx]}
              className="flex-1 min-w-[60px] md:min-w-0 flex flex-col items-center"
            >
              <div
                className="w-full bg-amber-500 rounded-t-lg hover:bg-amber-600 transition cursor-pointer"
                style={{
                  height: `${(revenue / Math.max(...monthlyRevenue)) * 100}%`,
                }}
                title={`${months[idx]}: ₹${revenue.toLocaleString()}`}
              ></div>
              <p className="text-gray-400 text-sm mt-2">{months[idx]}</p>
              <p className="text-white text-xs font-semibold">
                ₹{(revenue / 1000).toFixed(0)}k
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Sales by Category
          </h2>
          <div className="space-y-4">
            {[
              { name: "LED Lights", value: 35, color: "bg-blue-500" },
              { name: "Pendant Lights", value: 28, color: "bg-purple-500" },
              { name: "Table Lamps", value: 20, color: "bg-green-500" },
              { name: "Outdoor", value: 12, color: "bg-amber-500" },
              { name: "Wall Lights", value: 5, color: "bg-red-500" },
            ].map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{cat.name}</span>
                  <span className="text-white font-semibold">{cat.value}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`${cat.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${cat.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Top Performing Products
          </h2>
          <div className="space-y-4">
            {products
              .sort((a: any, b: any) => b.sold - a.sold)
              .slice(0, 5)
              .map((product: any, idx: any) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">
                      {idx + 1}
                    </span>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded shrink-0"
                    onError={handleImageError}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {product.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {product.sold} units sold
                    </p>
                  </div>
                  <p className="text-amber-400 font-bold text-sm whitespace-nowrap">
                    ₹{(product.sold * product.price).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-gray-400 text-sm mb-2">Average Order Value</h3>
          <p className="text-white text-3xl font-bold mb-2">
            ₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : "0"}
          </p>
          <p className="text-green-500 text-sm">+8.5% from last month</p>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-gray-400 text-sm mb-2">Conversion Rate</h3>
          <p className="text-white text-3xl font-bold mb-2">3.2%</p>
          <p className="text-green-500 text-sm">+0.5% from last month</p>
        </div>
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-gray-400 text-sm mb-2">Customer Satisfaction</h3>
          <p className="text-white text-3xl font-bold mb-2">4.6/5</p>
          <p className="text-green-500 text-sm">Based on 234 reviews</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
