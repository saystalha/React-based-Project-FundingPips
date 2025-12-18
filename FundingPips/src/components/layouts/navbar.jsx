import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Markets', path: '/markets' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Orders', path: '/orders' },
    { name: 'Trades', path: '/trades' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Watchlist', path: '/watchlist' },
    { name: 'Firm', path: '/Firm' },
  ]

  return (
    <nav className="bg-card border-b-2 border-mint shadow-[0_2px_8px_rgba(0,0,0,0.25)] px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center min-h-[80px]">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-electric hover:text-white transition-colors duration-200"
        >
          📈 FundingPips
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className="text-white hover:text-electric transition-colors duration-200 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}

          {/* Auth Buttons (Desktop) */}
          <div className="flex gap-3 pl-8 border-l border-[#262626]">
            <Link
              to="/signin"
              className="px-4 py-2 text-electric border border-electric/20 rounded-md hover:bg-electric/10 hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-electric text-white font-bold rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-mint text-2xl focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-[#262626] py-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className="block text-white hover:text-mint transition-colors duration-300 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[#262626]">
            <Link
              to="/signin"
              className="text-center px-4 py-2 text-electric border border-electric/20 rounded-md hover:bg-electric/10 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-center px-4 py-2 bg-electric text-white font-bold rounded-md hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar