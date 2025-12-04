import React from 'react'

const Analytics = () => {
  // Mock data for the "CSS Bar Chart"
  const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100]

  return (
    <div className="w-full space-y-6 animate-fade-in">
      
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-electric">Performance Analytics</h2>
          <p className="text-muted mt-1">Detailed breakdown of your trading performance.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-card text-white text-sm rounded border border-white/10 hover:border-electric transition-colors">
            Last 7 Days
          </button>
          <button className="px-4 py-2 bg-electric text-white text-sm rounded shadow-lg shadow-electric/20 hover:bg-blue-600 transition-colors">
            Last 30 Days
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-card p-5 rounded-lg border border-white/5 shadow-lg">
          <div className="text-muted text-sm font-medium mb-1">Net Profit</div>
          <div className="text-3xl font-bold text-white">$12,450.00</div>
          <div className="text-green-400 text-xs mt-2 font-mono flex items-center gap-1">
            ▲ +15.3% <span className="text-muted/60">vs last month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-card p-5 rounded-lg border border-white/5 shadow-lg">
          <div className="text-muted text-sm font-medium mb-1">Win Rate</div>
          <div className="text-3xl font-bold text-white">68%</div>
          <div className="text-electric text-xs mt-2 font-mono">
            42 Wins / 20 Losses
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-card p-5 rounded-lg border border-white/5 shadow-lg">
          <div className="text-muted text-sm font-medium mb-1">Profit Factor</div>
          <div className="text-3xl font-bold text-white">2.45</div>
          <div className="text-muted/60 text-xs mt-2">
            Gross Profit / Gross Loss
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-card p-5 rounded-lg border border-white/5 shadow-lg">
          <div className="text-muted text-sm font-medium mb-1">Avg R:R</div>
          <div className="text-3xl font-bold text-white">1:2.5</div>
          <div className="text-green-400 text-xs mt-2">
            Optimal Risk Management
          </div>
        </div>
      </div>

      {/* Main Chart Section (FIXED) */}
      <div className="bg-card p-6 rounded-lg border border-white/5 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Equity Curve (Projected)</h3>
          <div className="flex gap-2 text-xs text-muted">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-electric"></span> Equity</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-600"></span> Balance</span>
          </div>
        </div>
        
        {/* CSS-Only Bar Chart Visualization */}
        <div className="h-64 flex items-end justify-between gap-2 px-2">
          {chartData.map((height, index) => (
            // FIX: Added 'h-full' here so the wrapper takes up the full 64 units height
            <div key={index} className="w-full h-full flex flex-col justify-end group relative">
              
              {/* Tooltip on Hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                ${height * 120}
              </div>
              
              {/* The Bar */}
              {/* Added fallback 'bg-blue-600' in case 'bg-electric' is not loading */}
              <div 
                className="bg-electric/80 hover:bg-electric transition-all duration-300 w-full rounded-t-sm"
                style={{ height: `${height}%` }}
              ></div>
            </div>
          ))}
        </div>
        
        {/* X-Axis Labels */}
        <div className="flex justify-between text-xs text-muted mt-3 px-1 font-mono">
          <span>01 Dec</span>
          <span>05 Dec</span>
          <span>10 Dec</span>
          <span>15 Dec</span>
          <span>20 Dec</span>
          <span>25 Dec</span>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trading Stats */}
        <div className="bg-card p-6 rounded-lg border border-white/5">
          <h4 className="text-electric font-semibold mb-4 border-b border-white/10 pb-2">Trading Statistics</h4>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Total Trades</span>
              <span className="text-white font-mono">142</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Average Win</span>
              <span className="text-green-400 font-mono">+$450.20</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Average Loss</span>
              <span className="text-red-400 font-mono">-$185.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Largest Win</span>
              <span className="text-green-400 font-mono">+$2,100.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Largest Loss</span>
              <span className="text-red-400 font-mono">-$850.00</span>
            </div>
          </div>
        </div>

        {/* Market Breakdown */}
        <div className="bg-card p-6 rounded-lg border border-white/5">
          <h4 className="text-electric font-semibold mb-4 border-b border-white/10 pb-2">Asset Allocation</h4>
          <div className="space-y-4 mt-6">
            
            {/* Asset 1 */}
            <div>
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>Forex (EUR/USD, GBP/JPY)</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-electric h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            {/* Asset 2 */}
            <div>
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>Crypto (BTC, ETH)</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            {/* Asset 3 */}
            <div>
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>Indices (US30, NAS100)</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-teal-400 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics