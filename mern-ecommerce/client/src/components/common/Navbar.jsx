import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── LOGO ── */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-2xl font-black text-black uppercase tracking-tight">Bukhari's</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest -mt-0.5">Store</span>
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div className="hidden md:flex items-center gap-1">

          <Link to="/"
            className="text-gray-500 hover:text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm uppercase tracking-wider">
            Home
          </Link>

          {user && (
            <Link to="/orders"
              className="text-gray-500 hover:text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm uppercase tracking-wider">
              Orders
            </Link>
          )}

          {user?.isAdmin && (
            <Link to="/admin"
              className="text-gray-500 hover:text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm uppercase tracking-wider flex items-center gap-1">
              <LayoutDashboard size={15} /> Admin
            </Link>
          )}
        </div>

        {/* ── DESKTOP RIGHT ── */}
        <div className="hidden md:flex items-center gap-3">

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <div className="flex items-center gap-2 border-2 border-gray-200 group-hover:border-black text-gray-600 group-hover:text-black px-4 py-2 rounded-full transition-all font-semibold text-sm">
              <ShoppingCart size={17} />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              {/* User name */}
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-xs font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-black font-bold text-sm">{user.name}</span>
              </div>
              {/* Logout */}
              <button onClick={logout}
                className="border-2 border-gray-200 hover:border-black text-gray-500 hover:text-black p-2 rounded-full transition-all"
                title="Logout">
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login"
                className="text-black font-bold px-4 py-2 rounded-full border-2 border-gray-200 hover:border-black transition text-sm uppercase tracking-wider">
                Login
              </Link>
              <Link to="/register"
                className="bg-black text-white font-bold px-5 py-2 rounded-full hover:bg-gray-800 transition text-sm uppercase tracking-wider shadow-sm">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* ── MOBILE RIGHT ── */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-black" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-black">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="text-black border-2 border-gray-200 hover:border-black p-1.5 rounded-lg transition">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t-2 border-black px-6 py-5 flex flex-col gap-1 shadow-xl">

          <Link to="/" onClick={() => setMenuOpen(false)}
            className="text-black font-bold py-3 border-b border-gray-100 flex items-center gap-3 hover:pl-2 transition-all text-sm uppercase tracking-wider">
            🏠 Home
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)}
            className="text-black font-bold py-3 border-b border-gray-100 flex items-center justify-between hover:pl-2 transition-all text-sm uppercase tracking-wider">
            <span>🛒 Cart</span>
            {cartItems.length > 0 && (
              <span className="bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-black">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)}
                className="text-black font-bold py-3 border-b border-gray-100 flex items-center gap-3 hover:pl-2 transition-all text-sm uppercase tracking-wider">
                📦 My Orders
              </Link>

              {user.isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}
                  className="text-black font-bold py-3 border-b border-gray-100 flex items-center gap-3 hover:pl-2 transition-all text-sm uppercase tracking-wider">
                  ⚙️ Admin Dashboard
                </Link>
              )}

              <div className="flex items-center justify-between pt-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-black text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">Logged in</p>
                  </div>
                </div>
                <button onClick={() => { logout(); setMenuOpen(false); }}
                  className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition flex items-center gap-1">
                  <LogOut size={13} /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-4 mt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="text-center border-2 border-black text-black py-3 rounded-full font-black text-sm uppercase tracking-wider hover:bg-gray-100 transition">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="text-center bg-black text-white py-3 rounded-full font-black text-sm uppercase tracking-wider hover:bg-gray-800 transition">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}