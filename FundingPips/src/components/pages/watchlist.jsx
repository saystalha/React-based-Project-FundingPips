import React from 'react'

const Watchlist = () => {
  // Enhanced mock data to make it look "comprehensive"
  const watchlistData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '189.84', change: '+1.25%', marketCap: '2.95T', isPositive: true },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: '485.09', change: '-0.45%', marketCap: '1.20T', isPositive: false },
    { symbol: 'BTC-USD', name: 'Bitcoin', price: '42,150.00', change: '+2.10%', marketCap: '820B', isPositive: true },
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: '1.09', change: '-0.05%', marketCap: '-', isPositive: false },
    { symbol: 'XAU/USD', name: 'Gold Spot', price: '2,035.40', change: '+0.80%', marketCap: '13T', isPositive: true },
  ]

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-electric mb-2">Market Watchlist</h2>
          <p className="text-muted">Real-time tracking of your favorite assets.</p>
        </div>
        <button className="px-4 py-2 bg-electric/10 text-electric border border-electric/20 rounded hover:bg-electric hover:text-white transition-colors">
          + Add Asset
        </button>
      </div>

      {/* Grid Header (Labels) */}
      <div className="grid grid-cols-4 gap-4 px-4 py-2 text-sm text-muted font-semibold uppercase tracking-wider">
        <div className="col-span-1">Asset</div>
        <div className="text-right">Price</div>
        <div className="text-right">24h Change</div>
        <div className="text-right">Mkt Cap</div>
      </div>

      {/* Watchlist Items */}
      <div className="space-y-3">
        {watchlistData.map((item, index) => (
          <div 
            key={index} 
            className="grid grid-cols-4 gap-4 items-center p-4 bg-card rounded-lg border-l-4 border-transparent hover:border-electric hover:translate-x-1 transition-all duration-300 shadow-md"
          >
            {/* Symbol & Name */}
            <div className="col-span-1">
              <div className="font-bold text-white text-lg">{item.symbol}</div>
              <div className="text-sm text-muted">{item.name}</div>
            </div>

            {/* Price */}
            <div className="text-right font-mono text-white font-medium">
              ${item.price}
            </div>

            {/* Change % (Green or Red) */}
            <div className={`text-right font-mono font-bold ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {item.change}
            </div>

            {/* Market Cap */}
            <div className="text-right text-muted text-sm font-mono">
              {item.marketCap}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watchlist