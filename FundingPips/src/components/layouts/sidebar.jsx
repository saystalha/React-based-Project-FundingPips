import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const menuItems = [
    { name: 'Portfolio Summary', icon: '💼', path: '/portfolio' },
    { name: 'Watchlist', icon: '⭐', path: '/watchlist' },
    { name: 'Orders & Trades', icon: '🧾', path: '/orders' },
    { name: 'Market News', icon: '📰', path: '/markets' }, // Linked to Markets for now
  ]

  return (
    <aside className="hidden lg:block w-64 min-h-screen bg-gradient-to-b from-card to-[#262626] text-white border-r-2 border-mint p-6">
      
      {/* Title */}
      <p className="font-bold text-electric mb-6 flex items-center gap-2">
        📊 Trading Tools
      </p>

      {/* Menu List */}
      <ul className="list-none space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link 
              to={item.path}
              className="flex items-center p-3 rounded-md border-l-4 border-[#2563eb1f] bg-card text-white cursor-pointer transition-colors duration-200 hover:text-electric hover:border-electric hover:bg-white/5"
            >
              <span className="text-electric mr-2">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar