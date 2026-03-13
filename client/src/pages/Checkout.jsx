import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, ShoppingBag, Package, CheckCircle } from "lucide-react";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({ street: "", city: "", phone: "", country: "Pakistan" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = address, 2 = review

  const deliveryFee = totalPrice >= 5000 ? 0 : 200;
  const grandTotal  = totalPrice + deliveryFee;
  const totalItems  = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleNext = () => {
    if (!address.street.trim()) return toast.error("Please enter your street address");
    if (!address.city.trim())   return toast.error("Please enter your city");
    if (!address.phone.trim())  return toast.error("Please enter your phone number");
    setStep(2);
  };

  const handleOrder = async () => {
    if (!user) return toast.error("Please login first");
    setLoading(true);
    try {
      await api.post("/orders", {
        orderItems: cartItems.map(i => ({
          product:  i._id,
          name:     i.name,
          price:    i.price,
          quantity: i.quantity,
          image:    i.image,
        })),
        shippingAddress: address,
        totalPrice: grandTotal,
      });
      clearCart();
      toast.success("🎉 Order placed successfully!");
      navigate("/orders");
    } catch {
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-5">
      <ShoppingBag size={48} className="text-gray-200"/>
      <p className="font-black text-xl text-black">Your cart is empty</p>
      <Link to="/" className="bg-black text-white px-8 py-3 rounded-full font-black uppercase tracking-wider hover:bg-gray-800 transition">
        Shop Now →
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ── TOP BAR ── */}
      <div className="border-b-2 border-black bg-white sticky top-[65px] z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => step === 2 ? setStep(1) : navigate("/cart")}
              className="text-gray-400 hover:text-black transition">
              <ArrowLeft size={20}/>
            </button>
            <div className="w-px h-5 bg-gray-200"/>
            <h1 className="text-xl font-black text-black uppercase tracking-wider">Checkout</h1>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${step >= 1 ? "text-black" : "text-gray-300"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-400"}`}>1</div>
              Address
            </div>
            <div className={`w-8 h-px ${step >= 2 ? "bg-black" : "bg-gray-200"}`}/>
            <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${step >= 2 ? "text-black" : "text-gray-300"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-400"}`}>2</div>
              Review
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ══════ LEFT ══════ */}
        <div className="lg:col-span-2">

          {/* ── STEP 1: ADDRESS ── */}
          {step === 1 && (
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={18} className="text-black"/>
                <h2 className="font-black text-black uppercase tracking-wider">Delivery Address</h2>
              </div>

              <div className="space-y-4">
                {/* Name (auto from user) */}
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                  <input
                    value={user?.name || ""}
                    disabled
                    className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-gray-400 font-semibold text-sm cursor-not-allowed"
                  />
                </div>

                {/* Street */}
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Street Address *</label>
                  <input
                    placeholder="e.g. House 12, Street 5, DHA Phase 2"
                    value={address.street}
                    onChange={e => setAddress({...address, street: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors"
                  />
                </div>

                {/* City + Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">City *</label>
                    <input
                      placeholder="e.g. Lahore"
                      value={address.city}
                      onChange={e => setAddress({...address, city: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Phone *</label>
                    <input
                      placeholder="e.g. 0300-1234567"
                      value={address.phone}
                      onChange={e => setAddress({...address, phone: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Country</label>
                  <input
                    value="Pakistan 🇵🇰"
                    disabled
                    className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-gray-400 font-semibold text-sm cursor-not-allowed"
                  />
                </div>

                {/* Payment method */}
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Payment Method</label>
                  <div className="border-2 border-black bg-black text-white rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black"/>
                    </div>
                    <span className="font-black text-sm">Cash on Delivery (COD)</span>
                    <span className="ml-auto text-gray-400 text-xs">Only option</span>
                  </div>
                </div>
              </div>

              <button onClick={handleNext}
                className="w-full mt-6 bg-black text-white py-4 rounded-xl font-black uppercase tracking-wider hover:bg-gray-800 active:scale-95 transition-all shadow-lg">
                Continue to Review →
              </button>
            </div>
          )}

          {/* ── STEP 2: REVIEW ── */}
          {step === 2 && (
            <div className="space-y-4">

              {/* Address Summary */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16}/>
                    <h3 className="font-black text-black text-sm uppercase tracking-wider">Delivery To</h3>
                  </div>
                  <button onClick={() => setStep(1)}
                    className="text-xs font-bold text-gray-400 hover:text-black border border-gray-200 hover:border-black px-3 py-1 rounded-full transition">
                    Edit
                  </button>
                </div>
                <p className="font-black text-black">{user?.name}</p>
                <p className="text-gray-500 text-sm">{address.street}, {address.city}, Pakistan</p>
                <p className="text-gray-500 text-sm">{address.phone}</p>
              </div>

              {/* Items Review */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Package size={16}/>
                  <h3 className="font-black text-black text-sm uppercase tracking-wider">Order Items ({totalItems})</h3>
                </div>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item._id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <img src={item.image} alt={item.name}
                        onError={e => e.target.src = "https://placehold.co/50x50?text=Img"}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-100"/>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-black text-sm truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs">
                          Rs. {item.price.toLocaleString()} × {item.quantity}
                          {item.selectedSize && <span className="ml-2 bg-gray-100 px-1.5 py-0.5 rounded font-bold">{item.selectedSize}</span>}
                        </p>
                      </div>
                      <p className="font-black text-black text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Place Order */}
              <button onClick={handleOrder} disabled={loading}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
                  loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800 active:scale-95"
                }`}>
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Placing Order...</>
                ) : (
                  <><CheckCircle size={18}/> Place Order • Rs. {grandTotal.toLocaleString()}</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* ══════ RIGHT — SUMMARY ══════ */}
        <div className="lg:col-span-1">
          <div className="bg-black text-white rounded-2xl p-6 sticky top-40">
            <h2 className="font-black text-sm uppercase tracking-widest mb-5 border-b border-white/10 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                <span className="font-bold">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Delivery</span>
                <span className={`font-bold ${deliveryFee === 0 ? "text-green-400" : ""}`}>
                  {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment</span>
                <span className="font-bold text-xs">Cash on Delivery</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-black uppercase tracking-wider">Grand Total</span>
                <span className="font-black text-xl">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Free delivery note */}
            {deliveryFee === 0 ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-center mb-4">
                <p className="text-green-400 text-xs font-black">🎉 Free Delivery Applied!</p>
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-3 mb-4">
                <p className="text-gray-400 text-xs text-center">
                  Add <span className="text-white font-black">Rs. {(5000 - totalPrice).toLocaleString()}</span> more for free delivery
                </p>
              </div>
            )}

            {/* Security note */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              {["✅ 100% Secure Checkout", "📦 Cash on Delivery", "↩️ Easy 7-day Returns"].map(f => (
                <p key={f} className="text-gray-400 text-xs font-semibold">{f}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}