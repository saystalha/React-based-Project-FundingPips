import React, { useState } from 'react'

const Markets = () => {
  const [activeTab, setActiveTab] = useState('All')

  // Enhanced Mock Data with Categories
  const marketData = [
    { symbol: 'BTC-USD', name: 'Bitcoin', price: 43800.50, change: 2.84, volume: '28.5B', cap: '850B', category: 'Crypto' },
    { symbol: 'ETH-USD', name: 'Ethereum', price: 2250.20, change: -1.12, volume: '12.1B', cap: '270B', category: 'Crypto' },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.30, change: 1.24, volume: '54.2M', cap: '2.9T', category: 'Stocks' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 236.50, change: -2.11, volume: '105M', cap: '750B', category: 'Stocks' },
    { symbol: 'EUR/USD', name: 'Euro / USD', price: 1.0823, change: -0.02, volume: '150B', cap: '-', category: 'Forex' },
    { symbol: 'GBP/JPY', name: 'GBP / JPY', price: 183.40, change: 0.45, volume: '80B', cap: '-', category: 'Forex' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 480.15, change: 3.50, volume: '42M', cap: '1.2T', category: 'Stocks' },
    { symbol: 'SOL-USD', name: 'Solana', price: 65.40, change: 8.20, volume: '2.5B', cap: '28B', category: 'Crypto' },
  ]

  // Filter Logic
  const filteredData = activeTab === 'All' 
    ? marketData 
    : marketData.filter(item => item.category === activeTab)

  return (
    <div className="w-full animate-fade-in space-y-6">
      
      {/* 1. Header & Market Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold text-electric">Markets</h2>
          <p className="text-muted mt-1">Live global market data and liquidity.</p>
        </div>
        
        {/* Top Gainer Card */}
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-4 rounded-lg flex justify-between items-center">
          <div>
            <div className="text-xs text-green-400 font-bold uppercase">Top Gainer</div>
            <div className="text-white font-bold text-lg">Solana (SOL)</div>
          </div>
          <div className="text-right">
            <div className="text-white font-mono">$65.40</div>
            <div className="text-green-400 text-sm font-bold">+8.20%</div>
          </div>
        </div>

        {/* Top Loser Card */}
        <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-4 rounded-lg flex justify-between items-center">
          <div>
            <div className="text-xs text-red-400 font-bold uppercase">Top Loser</div>
            <div className="text-white font-bold text-lg">Tesla (TSLA)</div>
          </div>
          <div className="text-right">
            <div className="text-white font-mono">$236.50</div>
            <div className="text-red-400 text-sm font-bold">-2.11%</div>
          </div>
        </div>
      </div>

      {/* 2. Category Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
        {['All', 'Crypto', 'Stocks', 'Forex'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-electric text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                : 'bg-white/5 text-muted hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Main Market Table */}
      <div className="bg-card rounded-lg border border-white/5 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-xs uppercase text-muted font-semibold tracking-wider">
                <th className="p-5">Instrument</th>
                <th className="p-5 text-right">Price</th>
                <th className="p-5 text-right">24h Change</th>
                <th className="p-5 text-right hidden md:table-cell">Volume</th>
                <th className="p-5 text-right hidden lg:table-cell">Market Cap</th>
                <th className="p-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  
                  {/* Symbol & Name */}
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      {/* Placeholder Icon */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        item.change >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.symbol[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white">{item.symbol}</div>
                        <div className="text-muted text-xs">{item.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-5 text-right text-white font-mono font-medium">
                    ${item.price.toLocaleString()}
                  </td>

                  {/* Change % */}
                  <td className="p-5 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                      item.change >= 0 
                        ? 'text-green-400 bg-green-400/10' 
                        : 'text-red-400 bg-red-400/10'
                    }`}>
                      {item.change >= 0 ? '+' : ''}{item.change}%
                    </span>
                  </td>

                  {/* Volume (Hidden on Mobile) */}
                  <td className="p-5 text-right text-muted hidden md:table-cell">
                    {item.volume}
                  </td>

                  {/* Market Cap (Hidden on Tablet/Mobile) */}
                  <td className="p-5 text-right text-muted hidden lg:table-cell">
                    {item.cap}
                  </td>

                  {/* Action Button */}
                  <td className="p-5 text-center">
                    <button className="px-4 py-1.5 text-xs font-semibold text-electric border border-electric/30 rounded hover:bg-electric hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                      Trade
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Markets