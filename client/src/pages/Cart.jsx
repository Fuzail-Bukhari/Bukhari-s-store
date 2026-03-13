import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import { ShoppingCart, ArrowLeft, Tag } from "lucide-react";

export default function Cart() {
  const { cartItems, totalPrice } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HEADER ── */}
      <div className="border-b-2 border-black bg-white sticky top-[65px] z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-400 hover:text-black transition">
              <ArrowLeft size={20}/>
            </Link>
            <div className="w-px h-5 bg-gray-200"/>
            <h1 className="text-xl font-black text-black uppercase tracking-wider">Your Cart</h1>
            {cartItems.length > 0 && (
              <span className="bg-black text-white text-xs font-black px-2.5 py-1 rounded-full">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <Link to="/" className="text-sm font-bold text-gray-400 hover:text-black transition uppercase tracking-wider">
            Continue Shopping →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* ── EMPTY STATE ── */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <div className="w-24 h-24 border-4 border-gray-200 rounded-full flex items-center justify-center">
              <ShoppingCart size={36} className="text-gray-300"/>
            </div>
            <div className="text-center">
              <p className="font-black text-black text-2xl mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Looks like you haven't added anything yet.</p>
            </div>
            <Link to="/"
              className="bg-black text-white px-8 py-3 rounded-full font-black uppercase tracking-wider hover:bg-gray-800 transition shadow-md">
              Shop Now →
            </Link>
          </div>

        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── CART ITEMS ── */}
            <div className="lg:col-span-2">
              {cartItems.map(item => <CartItem key={item._id} item={item} />)}
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div className="lg:col-span-1">
              <div className="bg-black text-white rounded-2xl p-6 sticky top-40">

                <h2 className="font-black text-lg uppercase tracking-widest mb-5 border-b border-white/10 pb-4">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Items ({totalItems})</span>
                    <span className="font-bold">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Delivery</span>
                    <span className="font-bold text-green-400">
                      {totalPrice >= 5000 ? "FREE" : "Rs. 200"}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="font-black uppercase tracking-wider">Total</span>
                    <span className="font-black text-xl">
                      Rs. {(totalPrice >= 5000 ? totalPrice : totalPrice + 200).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Free delivery progress */}
                {totalPrice < 5000 && (
                  <div className="mb-5 bg-white/10 rounded-xl p-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1"><Tag size={10}/> Add Rs. {(5000 - totalPrice).toLocaleString()} more</span>
                      <span>Free delivery!</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className="bg-white h-1.5 rounded-full transition-all duration-500"
                        style={{width: `${Math.min((totalPrice / 5000) * 100, 100)}%`}}
                      />
                    </div>
                  </div>
                )}

                {totalPrice >= 5000 && (
                  <div className="mb-5 bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-center">
                    <p className="text-green-400 text-xs font-bold">🎉 You got FREE delivery!</p>
                  </div>
                )}

                <Link to="/checkout"
                  className="w-full block text-center bg-white text-black py-4 rounded-xl font-black uppercase tracking-wider hover:bg-gray-100 transition text-sm shadow-lg">
                  Proceed to Checkout →
                </Link>

                <Link to="/"
                  className="w-full block text-center text-gray-400 hover:text-white py-3 font-bold text-sm transition mt-2 uppercase tracking-wider">
                  ← Continue Shopping
                </Link>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}