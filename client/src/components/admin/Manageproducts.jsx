import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Trash2, PlusCircle } from "lucide-react";

const empty = { name: "", price: "", description: "", image: "", category: "", countInStock: "" };

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const fetchProducts = () => api.get("/products").then((r) => setProducts(r.data));

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await api.put(`/products/${editId}`, form);
        toast.success("Product updated!");
      } else {
        await api.post("/products", form);
        toast.success("Product created!");
      }
      setForm(empty);
      setEditId(null);
      fetchProducts();
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    toast.success("Deleted!");
    fetchProducts();
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, price: p.price, description: p.description, image: p.image, category: p.category, countInStock: p.countInStock });
    setEditId(p._id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Products</h1>
      <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["name", "price", "image", "category", "countInStock"].map((field) => (
          <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        ))}
        <textarea placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:col-span-2" rows={2} />
        <button onClick={handleSubmit}
          className="sm:col-span-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 font-semibold flex items-center justify-center gap-2">
          <PlusCircle size={18} /> {editId ? "Update Product" : "Add Product"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
            <img src={p.image || "https://via.placeholder.com/60"} className="w-16 h-16 object-cover rounded-lg" alt={p.name} />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{p.name}</p>
              <p className="text-indigo-600 font-bold">${p.price}</p>
            </div>
            <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
            <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}