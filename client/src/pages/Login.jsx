import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGLoading(true);
      try {
        const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(r => r.json());

        const { data } = await api.post("/auth/google", {
          credential: null,
          googleUser: userInfo,
        });
        login(data.user, data.token);
        toast.success(`Welcome, ${data.user.name}!`);
        navigate("/");
      } catch {
        toast.error("Google login failed");
      } finally {
        setGLoading(false);
      }
    },
    onError: () => toast.error("Google login failed"),
  });

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-12">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Bukhari's</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Store</p>
        </div>
        <div>
          <div className="w-12 h-1 bg-white rounded-full mb-6"/>
          <h2 className="text-5xl font-black leading-tight mb-4">Welcome<br/>Back.</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
            Sign in to access your orders, wishlist, and exclusive deals.
          </p>
          <div className="mt-8 space-y-3">
            {["🛍️ 90+ premium products","🚚 Free delivery above Rs. 5,000","📦 Easy order tracking","🎁 Exclusive member deals"].map(p => (
              <div key={p} className="flex items-center gap-3 text-gray-400 text-sm font-semibold">
                <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"/>
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-gray-600 text-xs uppercase tracking-widest">Don't have an account?</p>
          <Link to="/register" className="inline-block mt-2 text-white font-black text-sm uppercase tracking-wider hover:text-gray-300 transition">
            Create Account →
          </Link>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 text-center">
            <Link to="/"><h1 className="text-3xl font-black uppercase tracking-tight text-black">Bukhari's Store</h1></Link>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-black text-black mb-2">Sign In</h2>
            <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
          </div>

          {/* Google Button */}
          <button
            onClick={() => handleGoogle()}
            disabled={gLoading}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3.5 font-bold text-sm text-gray-700 hover:border-black hover:bg-gray-50 transition-all mb-6 disabled:opacity-50">
            {gLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin"/>
            ) : (
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.8 39.6 16.4 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
              </svg>
            )}
            {gLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-100"/>
            <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-100"/>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                <input type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors" required/>
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                <input type={showPass ? "text" : "password"} placeholder="Your password" value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-black text-black font-semibold text-sm transition-colors" required/>
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition">
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                loading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800 active:scale-95 shadow-lg"
              }`}>
              {loading ? (
                <><div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"/> Signing In...</>
              ) : "Sign In →"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-4">Don't have an account?</p>
            <Link to="/register"
              className="w-full block text-center border-2 border-black text-black py-3.5 rounded-xl font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all">
              Create Account →
            </Link>
          </div>
          <div className="text-center mt-6">
            <Link to="/" className="text-gray-300 hover:text-black text-xs font-bold uppercase tracking-widest transition">← Back to Store</Link>
          </div>
        </div>
      </div>
    </div>
  );
}