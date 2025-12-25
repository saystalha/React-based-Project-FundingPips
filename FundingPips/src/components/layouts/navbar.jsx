import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  deleteUser 
} from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  // --- DELETE ACCOUNT LOGIC ---
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you absolutely sure? This will permanently delete your account and all associated data."
    );

    if (confirmDelete && auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
        alert("Account deleted successfully.");
        navigate('/signup');
      } catch (error) {
        console.error("Delete error:", error.code);
        if (error.code === 'auth/requires-recent-login') {
          alert("For security reasons, please log out and log back in before deleting your account.");
        } else {
          alert("Failed to delete account. Please try again later.");
        }
      }
    }
  };

  return (
    <nav className="bg-card border-b-2 border-mint px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center min-h-[80px]">
        <Link to="/" className="text-2xl font-bold text-electric">📈 FundingPips</Link>

        <div className="hidden md:flex items-center gap-8">
          {/* ... nav links ... */}

          {!user ? (
            <div className="flex gap-3">
              <Link to="/signin" className="px-4 py-2 text-electric border border-electric/20 rounded-md">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 bg-electric text-white font-bold rounded-md">Create Account</Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onMouseEnter={() => setShowDropdown(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-white/10 rounded-md hover:border-electric transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-electric flex items-center justify-center text-[10px] text-white">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white max-w-[150px] truncate">{user.email}</span>
              </button>

              {showDropdown && (
                <div 
                  onMouseLeave={() => setShowDropdown(false)}
                  className="absolute right-0 mt-2 w-52 bg-gray-900 border border-white/10 rounded-lg shadow-xl py-2 animate-fade-in z-[60]"
                >
                  <div className="px-4 py-2 border-b border-white/5 mb-2">
                    <p className="text-xs text-muted">Signed in as</p>
                    <p className="text-sm font-bold text-electric truncate">{user.email}</p>
                  </div>
                  
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-white hover:bg-electric/10">Dashboard</Link>
                  <Link to="/portfolio" className="block px-4 py-2 text-sm text-white hover:bg-electric/10">Settings</Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 mt-1"
                  >
                    Logout
                  </button>

                  {/* DELETE BUTTON */}
                  <div className="mt-2 pt-2 border-t border-white/5">
                    <button 
                      onClick={handleDeleteAccount}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 font-semibold"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;