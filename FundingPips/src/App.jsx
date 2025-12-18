import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/navbar";
import Footer from "./components/layouts/footer";
import Sidebar from "./components/layouts/sidebar";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Firm from "./components/pages/Firm";
import Dashboard from "./components/pages/dashboard";
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

const App = () => {
  return (
    <div
      id="app-root"
      className="flex flex-col min-h-screen w-full bg-gradient-to-br from-charcoal to-card text-white"
    >
      <Navbar />

      <div className="flex flex-1 gap-4 overflow-y-auto">
        <Sidebar />

        <div className="flex-1 p-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
            <Route path="/Firm" element={<Firm />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/FirmTracker" element={<FirmTracker />} />
            {/* dynamic route */}
            <Route path="/firm/:id" element={<FirmDetails />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
