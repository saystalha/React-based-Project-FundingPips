import React from 'react'

const Trades = () => {
  // Enhanced mock data
  const trades = [
    { id: 12345, date: '2025-11-30', time: '14:30:22', symbol: 'AAPL', qty: 10, price: 182.30, side: 'Buy', status: 'Filled', pnl: null },
    { id: 12344, date: '2025-11-29', time: '09:15:00', symbol: 'TSLA', qty: 5, price: 236.50, side: 'Sell', status: 'Filled', pnl: '+125.00' },
    { id: 12343, date: '2025-11-28', time: '11:45:10', symbol: 'BTC-USD', qty: 0.5, price: 42100.00, side: 'Buy', status: 'Filled', pnl: null },
    { id: 12342, date: '2025-11-28', time: '10:00:00', symbol: 'EUR/USD', qty: 1000, price: 1.0920, side: 'Sell', status: 'Filled', pnl: '-15.40' },
    { id: 12341, date: '2025-11-27', time: '16:55:40', symbol: 'NVDA', qty: 12, price: 480.20, side: 'Buy', status: 'Filled', pnl: null },
  ]

  return (
    <div className="w-full animate-fade-in">
      
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-electric">Trade History</h2>
          <p className="text-muted mt-1">A log of all your executed market orders.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-card border border-white/10 rounded text-sm text-white hover:border-electric transition-colors">
             Export CSV
           </button>
           <button className="px-4 py-2 bg-card border border-white/10 rounded text-sm text-white hover:border-electric transition-colors">
             Filter Date
           </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-card rounded-lg border border-white/5 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="bg-white/5 text-xs uppercase text-muted font-semibold tracking-wider">
                <th className="p-4">Date & Time</th>
                <th className="p-4">Symbol</th>
                <th className="p-4">Side</th>
                <th className="p-4 text-right">Qty</th>
                <th className="p-4 text-right">Avg Price</th>
                <th className="p-4 text-right">Realized P&L</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-sm divide-y divide-white/5">
              {trades.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                  
                  {/* Date Column */}
                  <td className="p-4">
                    <div className="text-white font-medium">{t.date}</div>
                    <div className="text-muted text-xs">{t.time}</div>
                  </td>

                  {/* Symbol Column */}
                  <td className="p-4 font-bold text-white">
                    {t.symbol}
                  </td>

                  {/* Side Column (Buy/Sell Badge) */}
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      t.side === 'Buy' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {t.side.toUpperCase()}
                    </span>
                  </td>

                  {/* Qty Column */}
                  <td className="p-4 text-right text-muted font-mono">
                    {t.qty}
                  </td>

                  {/* Price Column */}
                  <td className="p-4 text-right text-white font-mono">
                    ${t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* P&L Column */}
                  <td className={`p-4 text-right font-mono font-bold ${
                    !t.pnl ? 'text-muted' : 
                    t.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {t.pnl || '--'}
                  </td>

                  {/* Status Column */}
                  <td className="p-4 text-center">
                    <span className="text-xs text-muted/80 bg-white/5 px-2 py-1 rounded">
                      {t.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-white/5 p-4 flex justify-between items-center text-xs text-muted border-t border-white/5">
          <span>Showing 5 of 142 trades</span>
          <div className="flex gap-1">
             <button className="px-2 py-1 hover:text-white disabled:opacity-50" disabled>Previous</button>
             <button className="px-2 py-1 text-white">1</button>
             <button className="px-2 py-1 hover:text-white">2</button>
             <button className="px-2 py-1 hover:text-white">3</button>
             <button className="px-2 py-1 hover:text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trades