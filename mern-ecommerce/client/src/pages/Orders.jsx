import { useEffect, useState } from "react";
import api from "../utils/api";
import Loader from "../components/common/Loader";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/myorders")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
      {orders.length === 0 ? <p className="text-gray-500 text-center py-20">No orders yet.</p> : (
        orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow p-6 mb-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-400">Order ID: {order._id}</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.isDelivered ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                {order.isDelivered ? "Delivered" : "Processing"}
              </span>
            </div>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex gap-4 items-center py-2 border-t">
                <img src={item.image} className="w-14 h-14 rounded object-cover" alt={item.name} />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity} × ${item.price}</p>
                </div>
              </div>
            ))}
            <p className="text-right font-bold text-indigo-600 mt-3">Total: ${order.totalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
}