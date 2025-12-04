import React from 'react'

const Portfolio = () => {
  // Enhanced Mock Data
  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', qty: 25, avg: 150.20, market: 189.84, type: 'Stock' },
    { symbol: 'TSLA', name: 'Tesla Inc.', qty: 8, avg: 210.50, market: 236.50, type: 'Stock' },
    { symbol: 'BTC-USD', name: 'Bitcoin', qty: 0.25, avg: 38500.00, market: 43800.00, type: 'Crypto' },
    { symbol: 'ETH-USD', name: 'Ethereum', qty: 4.5, avg: 1800.00, market: 2250.00, type: 'Crypto' },
    { symbol: 'NVDA', name: 'NVIDIA Corp', qty: 10, avg: 410.00, market: 480.00, type: 'Stock' },
  ]

  // Calculate Portfolio Totals
  const totalValue = holdings.reduce((acc, h) => acc + (h.market * h.qty), 0)
  const totalCost = holdings.reduce((acc, h) => acc + (h.avg * h.qty), 0)
  const totalPnL = totalValue - totalCost
  const totalPnLPercent = (totalPnL / totalCost) * 100

  return (
    <div className="w-full animate-fade-in space-y-8">
      
      {/* 1. Portfolio Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance Card */}
        <div className="md:col-span-2 bg-gradient-to-r from-card to-gray-900 p-6 rounded-xl border border-white/5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-electric/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-muted text-sm font-medium uppercase tracking-wider mb-1">Total Portfolio Value</h2>
            <div className="text-4xl font-bold text-white mb-4">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-muted text-xs block">Total Profit/Loss</span>
                <span className={`text-sm font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                 <span className="text-muted text-xs block">Return</span>
                 <span className={`text-sm font-bold ${totalPnLPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                   {totalPnLPercent >= 0 ? '▲' : '▼'} {totalPnLPercent.toFixed(2)}%
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-card p-6 rounded-xl border border-white/5 flex flex-col justify-center gap-3 shadow-lg">
          <h3 className="text-white font-semibold mb-2">Quick Actions</h3>
          <button className="w-full py-3 bg-electric text-white rounded-lg font-medium hover:bg-blue-600 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            Deposit Funds
          </button>
          <button className="w-full py-3 bg-transparent border border-white/20 text-white rounded-lg font-medium hover:bg-white/5 transition-all">
            Withdraw
          </button>
        </div>
      </div>

      {/* 2. Holdings Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Your Assets</h3>
          <div className="text-sm text-electric cursor-pointer hover:underline">Download Report</div>
        </div>

        <div className="bg-card rounded-xl border border-white/5 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-xs uppercase text-muted font-semibold tracking-wider">
                  <th className="p-5">Asset</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Balance</th>
                  <th className="p-5 text-right">Avg. Cost</th>
                  <th className="p-5 text-right">Total Return</th>
                  <th className="p-5 text-center">Allocation</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {holdings.map((h, i) => {
                  const currentValue = h.market * h.qty
                  const pl = currentValue - (h.avg * h.qty)
                  const plPercent = (pl / (h.avg * h.qty)) * 100
                  const allocation = (currentValue / totalValue) * 100

                  return (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      
                      {/* Asset Column */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-electric/10 flex items-center justify-center text-electric font-bold text-xs border border-electric/20">
                            {h.symbol[0]}
                          </div>
                          <div>
                            <div className="text-white font-bold">{h.symbol}</div>
                            <div className="text-muted text-xs">{h.name}</div>
                          </div>
                        </div>
                      </td>

                      {/* Market Price */}
                      <td className="p-5 text-right text-white font-mono">
                        ${h.market.toLocaleString()}
                      </td>

                      {/* Balance (Qty & Value) */}
                      <td className="p-5 text-right">
                        <div className="text-white font-bold font-mono">${currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="text-muted text-xs">{h.qty} {h.symbol}</div>
                      </td>

                      {/* Avg Cost */}
                      <td className="p-5 text-right text-muted font-mono">
                        ${h.avg.toLocaleString()}
                      </td>

                      {/* P&L */}
                      <td className="p-5 text-right">
                        <div className={`font-bold font-mono ${pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {pl >= 0 ? '+' : ''}${pl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </div>
                        <div className={`text-xs ${pl >= 0 ? 'text-green-500/70' : 'text-red-500/70'}`}>
                          {plPercent.toFixed(2)}%
                        </div>
                      </td>

                      {/* Allocation Bar */}
                      <td className="p-5 align-middle">
                        <div className="w-24 mx-auto">
                           <div className="flex justify-between text-[10px] text-muted mb-1">
                             <span>{allocation.toFixed(1)}%</span>
                           </div>
                           <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-electric h-full" style={{ width: `${allocation}%` }}></div>
                           </div>
                        </div>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio