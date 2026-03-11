import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/admin/products" className="bg-white rounded-2xl shadow p-8 flex items-center gap-4 hover:shadow-lg hover:border-indigo-400 border-2 border-transparent transition">
          <Package size={40} className="text-indigo-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Manage Products</h2>
            <p className="text-gray-500 text-sm">Add, edit or delete products</p>
          </div>
        </Link>
        <div className="bg-white rounded-2xl shadow p-8 flex items-center gap-4 opacity-60 cursor-not-allowed">
          <ShoppingBag size={40} className="text-indigo-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Manage Orders</h2>
            <p className="text-gray-500 text-sm">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}