import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl hover:border-black hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group">

      {/* ── IMAGE ── */}
      <Link to={`/product/${product._id}`} className="overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          onError={e => e.target.src = "https://placehold.co/400x300?text=No+Image"}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* category badge */}
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {product.category}
        </span>
      </Link>

      {/* ── CONTENT ── */}
      <div className="p-4 flex flex-col flex-1">

        {/* brand */}
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">
          {product.brand}
        </p>

        {/* name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="font-black text-gray-900 hover:text-black text-base leading-tight mb-2 line-clamp-2 group-hover:underline underline-offset-2">
            {product.name}
          </h3>
        </Link>

        {/* description */}
        <p className="text-gray-400 text-sm flex-1 line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* price + button */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Price</p>
            <span className="text-black font-black text-xl">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all text-sm font-bold shadow-sm hover:shadow-md"
          >
            <ShoppingCart size={15} />
            Add
          </button>
        </div>
      </div>

    </div>
  );
}