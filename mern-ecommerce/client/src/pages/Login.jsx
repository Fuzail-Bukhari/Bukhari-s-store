import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
            Welcome<br/>Back.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
            Pakistan's premier fashion destination. Login to continue shopping.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-4">
          {[{v:"90+",l:"Products"},{v:"14+",l:"Brands"},{v:"50K+",l:"Customers"}].map(s => (
            <div key={s.l} className="border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-black">{s.v}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{s.l}</p>
            </div>
          ))}
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
            <h2 className="text-4xl font-black text-black mb-2">Sign In</h2>
            <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

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
                  placeholder="••••••••"
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
                <><div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"/> Signing in...</>
              ) : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100"/>
            <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-100"/>
          </div>

          {/* Register link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Don't have an account?</p>
            <Link to="/register"
              className="w-full block text-center border-2 border-black text-black py-3.5 rounded-xl font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Create Account →
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