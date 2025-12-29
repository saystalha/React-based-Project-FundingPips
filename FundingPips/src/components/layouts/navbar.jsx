import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Trash2,
  ChevronDown,
  User,
} from "lucide-react"; // Standard professional icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, profile } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      navigate("/signin");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you absolutely sure? This will permanently delete your account and all associated data."
      )
    ) {
      try {
        await deleteUser(auth.currentUser);
        navigate("/signup");
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          alert(
            "Security Sensitive: Please logout and login again before deleting your account."
          );
        }
      }
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Markets", path: "/markets" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Analytics", path: "/analytics" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Firm", path: "/Firm" },
  ];

  return (
    <nav className="bg-[#0a0a0a] border-b border-white/5 px-8 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto flex justify-between items-center min-h-[80px]">
        {/* Left: Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-electric flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-3xl">📈</span> FundingPips
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Auth / Profile */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/signin"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-electric hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div
              className="relative"
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* Role badges: show when user is signed in */}
              {/* Role badges: show conditionally based on role */}
              <div className="hidden md:flex items-center gap-2 mr-4">
                {profile && profile.role === "admin" ? (
                  // Show ONLY this if admin
                  <span className="px-3 py-1 text-xs font-semibold bg-yellow-600 text-black rounded-full shadow-lg shadow-yellow-600/20">
                    Admin Dashboard
                  </span>
                ) : (
                  // Show ONLY this if standard user (trader)
                  <span className="px-3 py-1 text-xs font-semibold bg-white/5 text-white rounded-full">
                    User Dashboard
                  </span>
                )}
              </div>
              {/* Profile Trigger Button */}
              <button
                onMouseEnter={() => setShowDropdown(true)}
                className="flex items-center gap-3 p-1.5 pr-3 bg-white/5 border border-white/10 rounded-full hover:border-electric/50 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-electric to-blue-400 flex items-center justify-center text-white shadow-inner">
                  <User size={16} />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-none mb-1">
                    Trader
                  </p>
                  <p className="text-xs text-white font-medium max-w-[100px] truncate leading-none">
                    {user.email}
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Professional Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl py-3 z-[60] backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      Account Session
                    </p>
                    <p className="text-sm font-medium text-white truncate mt-1">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-electric/10 hover:text-electric transition-all"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-electric/10 hover:text-electric transition-all"
                    >
                      <Settings size={16} /> Settings
                    </Link>
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/5">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500/80 hover:bg-red-500/10 hover:text-red-500 font-medium transition-all"
                    >
                      <Trash2 size={16} /> Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
