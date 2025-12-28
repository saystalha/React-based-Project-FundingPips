import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";

// Layouts
import Navbar from "./components/layouts/navbar";
import Footer from "./components/layouts/footer";
import Sidebar from "./components/layouts/sidebar";

// Pages
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Firm from "./components/pages/Firm";
import Dashboard from "./components/pages/dashboard";
import AdminDashboard from "./components/pages/adminDashboard";
import UserDashboard from "./components/pages/userDashboard";
import Accounts from "./components/pages/accounts";
import Transactions from "./components/pages/transactions";
import Analytics from "./components/pages/analytics";
import SignIn from "./components/pages/signin";
import SignUp from "./components/pages/signup";
import Markets from "./components/pages/markets";
import Portfolio from "./components/pages/portfolio";
import Orders from "./components/pages/orders";
import Trades from "./components/pages/trades";
import Watchlist from "./components/pages/watchlist";
import FirmTracker from "./components/pages/FirmTracker";
import FirmDetails from "./components/pages/FirmDetails";

// --- PROTECTED ROUTE COMPONENT ---
// This wrapper checks if a user is logged in. If not, it redirects to /signin
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// --- ADMIN ROUTE ---
// Allows access only if authenticated and role === 'admin'
const AdminRoute = ({ user, profile, children }) => {
  if (!user) return <Navigate to="/signin" replace />;
  if (!profile || profile.role !== "admin")
    return <Navigate to="/dashboard" replace />;
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // 1. Setup Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // fetch user profile from Firestore (role, name, etc.)
      if (currentUser) {
        (async () => {
          try {
            const docRef = doc(db, "Users", currentUser.uid);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              setProfile(snap.data());
            } else {
              setProfile(null);
            }
          } catch (err) {
            console.error("Failed to fetch user profile:", err);
            setProfile(null);
          } finally {
            setLoading(false);
          }
        })();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    // 2. Cleanup listener
    return () => unsubscribe();
  }, [auth]);

  // 3. Prevent UI flicker while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric"></div>
          <p className="text-muted text-sm animate-pulse">
            Initializing FundingPips...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider value={{ user, profile }}>
      <div
        id="app-root"
        className="flex flex-col min-h-screen w-full bg-gradient-to-br from-charcoal to-card text-white"
      >
        {/* Navbar always visible, logic inside handles login/logout buttons */}
        <Navbar />

        <div className="flex flex-1 gap-0 overflow-y-auto">
          {/* SIDEBAR: Only visible if user is signed in */}
          {user && <Sidebar />}

          <div className="flex-1 p-8 w-full">
            <Routes>
              {/* PUBLIC ROUTES: Accessible by anyone */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* PROTECTED ROUTES: Only accessible if signed in */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute user={user}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <ProtectedRoute user={user}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin-only routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute user={user} profile={profile}>
                    <Navigate to="/admin/dashboard" replace />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute user={user} profile={profile}>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/markets"
                element={
                  <ProtectedRoute user={user}>
                    <Markets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <ProtectedRoute user={user}>
                    <Portfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute user={user}>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trades"
                element={
                  <ProtectedRoute user={user}>
                    <Trades />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute user={user}>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accounts"
                element={
                  <ProtectedRoute user={user}>
                    <Accounts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute user={user}>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute user={user}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Firm"
                element={
                  <ProtectedRoute user={user}>
                    <Firm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/FirmTracker"
                element={
                  <ProtectedRoute user={user}>
                    <FirmTracker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/firm/:id"
                element={
                  <ProtectedRoute user={user}>
                    <FirmDetails />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
