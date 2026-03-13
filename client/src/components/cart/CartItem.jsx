import { Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { increment, decrement, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white border-2 border-gray-100 hover:border-black transition-all p-4 rounded-2xl mb-3 group">

      {/* Image */}
      <img
        src={item.image || "https://placehold.co/80x80?text=Img"}
        alt={item.name}
        onError={e => e.target.src = "https://placehold.co/80x80?text=Img"}
        className="w-20 h-20 object-cover rounded-xl border-2 border-gray-100"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-0.5">{item.brand || item.category}</p>
        <h3 className="font-black text-black text-sm leading-tight truncate">{item.name}</h3>
        {item.selectedSize && (
          <span className="inline-block mt-1 bg-gray-100 text-black text-xs font-bold px-2 py-0.5 rounded-full">
            Size: {item.selectedSize}
          </span>
        )}
        <p className="text-black font-black text-base mt-1">Rs. {item.price.toLocaleString()}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
        <button onClick={() => decrement(item._id)}
          className="w-9 h-9 font-black text-black hover:bg-black hover:text-white transition text-lg">
          −
        </button>
        <span className="w-9 h-9 flex items-center justify-center font-black text-black border-x-2 border-gray-200 text-sm">
          {item.quantity}
        </span>
        <button onClick={() => increment(item._id)}
          className="w-9 h-9 font-black text-black hover:bg-black hover:text-white transition text-lg">
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[90px]">
        <p className="text-gray-400 text-xs uppercase tracking-wider">Subtotal</p>
        <p className="font-black text-black text-base">Rs. {(item.price * item.quantity).toLocaleString()}</p>
      </div>

      {/* Remove */}
      <button onClick={() => removeFromCart(item._id)}
        className="ml-1 p-2 rounded-xl border-2 border-gray-100 text-gray-300 hover:border-black hover:text-black transition-all group-hover:border-gray-200">
        <Trash2 size={18} />
      </button>

    </div>
  );
}