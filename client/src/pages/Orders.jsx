import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { Package, ShoppingBag, CheckCircle, Clock } from "lucide-react";

export default function Orders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/myorders")
      .then(res => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"/>
    </div>
  );

  if (orders.length === 0) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-5">
      <ShoppingBag size={48} className="text-gray-200"/>
      <p className="font-black text-xl text-black">No orders yet</p>
      <p className="text-gray-400 text-sm">Your placed orders will appear here</p>
      <Link to="/" className="bg-black text-white px-8 py-3 rounded-full font-black uppercase tracking-wider hover:bg-gray-800 transition">
        Shop Now →
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="border-b-2 border-black bg-white sticky top-[65px] z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Package size={20} className="text-black"/>
          <h1 className="text-xl font-black text-black uppercase tracking-wider">My Orders</h1>
          <span className="ml-auto bg-black text-white text-xs font-black px-3 py-1 rounded-full">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        {orders.map((order) => {
          const totalItems = order.orderItems.reduce((a, i) => a + i.quantity, 0);
          return (
            <div key={order._id} className="bg-white border-2 border-gray-100 hover:border-black rounded-2xl overflow-hidden transition-all">

              {/* Order Header */}
              <div className="bg-gray-50 border-b border-gray-100 px-5 py-4 flex flex-wrap items-center gap-3 justify-between">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Order ID</p>
                  <p className="font-black text-black text-sm font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Date</p>
                  <p className="font-bold text-black text-sm">
                    {new Date(order.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Items</p>
                  <p className="font-bold text-black text-sm">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                  <p className="font-black text-black text-sm">Rs. {order.totalPrice.toLocaleString()}</p>
                </div>
                {/* Status badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  order.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.isDelivered
                    ? <><CheckCircle size={12}/> Delivered</>
                    : <><Clock size={12}/> Processing</>
                  }
                </div>
              </div>

              {/* Order Items */}
              <div className="px-5 py-4 space-y-3">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={e => e.target.src = "https://placehold.co/56x56?text=Img"}
                      className="w-14 h-14 object-cover rounded-xl border-2 border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-black text-sm truncate">{item.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Rs. {item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-black text-black text-sm flex-shrink-0">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                  <span>📦 Cash on Delivery</span>
                  <span>•</span>
                  <span>📍 {order.shippingAddress?.city}, Pakistan</span>
                </div>
                <p className="font-black text-black text-sm">
                  Total: <span className="text-base">Rs. {order.totalPrice.toLocaleString()}</span>
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}