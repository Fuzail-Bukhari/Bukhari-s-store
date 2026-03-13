import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [form, setForm]         = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-12">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Bukhari's</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Store</p>
        </div>

        {/* Center text */}
        <div>
          <div className="w-12 h-1 bg-white rounded-full mb-6"/>
          <h2 className="text-5xl font-black leading-tight mb-4">
            Join the<br/>Family.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
            Create your account and start shopping Pakistan's finest fashion brands today.
          </p>

          {/* Perks */}
          <div className="mt-8 space-y-3">
            {[
              "🛍️ Access to 90+ premium products",
              "🚚 Free delivery above Rs. 5,000",
              "📦 Track your orders easily",
              "🎁 Exclusive deals and discounts",
            ].map(p => (
              <div key={p} className="flex items-center gap-3 text-gray-400 text-sm font-semibold">
                <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"/>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-gray-600 text-xs uppercase tracking-widest">
            Already have an account?
          </p>
          <Link to="/login"
            className="inline-block mt-2 text-white font-black text-sm uppercase tracking-wider hover:text-gray-300 transition">
            Sign In →
          </Link>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <Link to="/">
              <h1 className="text-3xl font-black uppercase tracking-tight text-black">Bukhari's Store</h1>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-black text-black mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm">Fill in your details to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Khan"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition">
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
              {/* Password strength bar */}
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                        form.password.length >= i * 3
                          ? i <= 1 ? "bg-red-400"
                          : i <= 2 ? "bg-yellow-400"
                          : i <= 3 ? "bg-blue-400"
                          : "bg-green-400"
                          : "bg-gray-100"
                      }`}/>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {form.password.length < 3 ? "Too short"
                      : form.password.length < 6 ? "Weak"
                      : form.password.length < 9 ? "Good"
                      : "Strong ✓"}
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-2 ${
                loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 active:scale-95 shadow-lg"
              }`}>
              {loading ? (
                <><div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"/> Creating Account...</>
              ) : "Create Account →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100"/>
            <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-100"/>
          </div>

          {/* Login link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Already have an account?</p>
            <Link to="/login"
              className="w-full block text-center border-2 border-black text-black py-3.5 rounded-xl font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Sign In →
            </Link>
          </div>

          {/* Back to store */}
          <div className="text-center mt-6">
            <Link to="/" className="text-gray-300 hover:text-black text-xs font-bold uppercase tracking-widest transition">
              ← Back to Store
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}