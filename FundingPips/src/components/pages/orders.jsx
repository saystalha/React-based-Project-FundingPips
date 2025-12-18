import React, { useState } from 'react'

// --- Project-Relevant Counter Component ---
const PositionAdjuster = ({ symbol = 'AAPL', min = 1, max = 100 }) => {
  // The state for the counter (current position size/quantity)
  const [positionSize, setPositionSize] = useState(min);

  // Implement the Increment action
  const handleIncrement = () => {
    setPositionSize(prevSize => Math.min(prevSize + 5, max)); // Increment by 5
  };

  // Implement the Decrement action
  const handleDecrement = () => {
    setPositionSize(prevSize => Math.max(prevSize - 5, min)); // Decrement by 5
  };

  // Implement the Reset action
  const handleReset = () => {
    setPositionSize(min);
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-white/10 shadow-xl space-y-3">
      <h3 className="text-lg font-semibold text-white">
        Adjust {symbol} Position
      </h3>
      <div className="flex items-center justify-between space-x-4">
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          disabled={positionSize <= min}
          className="p-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 disabled:opacity-50 transition-colors font-mono text-xl"
        >
          -
        </button>

        {/* Counter Value */}
        <div className="flex flex-col items-center flex-grow">
          <span className="text-4xl font-extrabold text-electric font-mono">
            {positionSize}
          </span>
          <span className="text-xs text-muted uppercase tracking-wider">
            Shares/Quantity
          </span>
        </div>

        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          disabled={positionSize >= max}
          className="p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 disabled:opacity-50 transition-colors font-mono text-xl"
        >
          +
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-2 text-sm text-muted hover:text-white transition-colors border border-transparent hover:border-white/20 rounded"
      >
        Reset Quantity ({min})
      </button>
    </div>
  );
};
// ------------------------------------------

const Orders = () => {
  const [activeTab, setActiveTab] = useState('open') // 'open' or 'history'

  // Enhanced mock data (Omitted for brevity in this response but kept in the code)
  const orders = [
    { id: 'ORD-7782', time: '14:30:00', symbol: 'AAPL', side: 'Buy', type: 'Limit', qty: 50, filled: 10, price: 180.50, status: 'Partial' },
    { id: 'ORD-7783', time: '14:28:15', symbol: 'TSLA', side: 'Sell', type: 'Stop Loss', qty: 10, filled: 0, price: 230.00, status: 'Open' },
    { id: 'ORD-7781', time: '12:00:00', symbol: 'BTC-USD', side: 'Buy', type: 'Market', qty: 1.5, filled: 1.5, price: 42100, status: 'Filled' },
    { id: 'ORD-7780', time: '09:15:00', symbol: 'NVDA', side: 'Buy', type: 'Limit', qty: 20, filled: 0, price: 475.00, status: 'Cancelled' },
    { id: 'ORD-7779', time: 'Yesterday', symbol: 'EUR/USD', side: 'Sell', type: 'Limit', qty: 5000, filled: 5000, price: 1.0950, status: 'Filled' },
  ]

  // Filter logic based on tabs (Omitted for brevity in this response but kept in the code)
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'open') return order.status === 'Open' || order.status === 'Partial'
    return order.status === 'Filled' || order.status === 'Cancelled'
  })

  return (
    <div className="w-full animate-fade-in space-y-6">
      
      {/* Header Section and New Counter Component Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Title and Description */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-electric">Order Management</h2>
          <p className="text-muted mt-1">Manage your active limit orders and view history.</p>
        </div>
        
        {/* Right: The Position Adjuster Component */}
        <div className="lg:col-span-1">
            <PositionAdjuster symbol="NVDA" min={10} max={250} />
        </div>
      </div>
      
      {/* Cancel All Button (Moved for cleaner layout) */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-colors text-sm font-medium">
          Cancel All Open Orders
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          onClick={() => setActiveTab('open')}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'open' ? 'text-electric' : 'text-muted hover:text-white'
          }`}
        >
          Open Orders
          {activeTab === 'open' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-electric"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'history' ? 'text-electric' : 'text-muted hover:text-white'
          }`}
        >
          Order History
          {activeTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-electric"></div>}
        </button>
      </div>

      {/* Table Container (Unchanged) */}
      <div className="bg-card rounded-lg border border-white/5 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-xs uppercase text-muted font-semibold tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Symbol</th>
                <th className="p-4">Side</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Qty / Filled</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-center">Status</th>
                {activeTab === 'open' && <th className="p-4 text-center">Action</th>}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors group">
                    {/* ID & Time */}
                    <td className="p-4">
                      <div className="text-white font-mono">{o.id}</div>
                      <div className="text-muted text-xs">{o.time}</div>
                    </td>

                    {/* Symbol */}
                    <td className="p-4 font-bold text-white">
                      {o.symbol}
                    </td>

                    {/* Side */}
                    <td className="p-4">
                      <span className={o.side === 'Buy' ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
                        {o.side.toUpperCase()}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="p-4 text-muted">
                      {o.type}
                    </td>

                    {/* Progress Bar / Qty */}
                    <td className="p-4 text-right min-w-[140px]">
                      <div className="text-white font-mono mb-1">
                        {o.filled} / {o.qty}
                      </div>
                      <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-electric h-full" 
                          style={{ width: `${(o.filled / o.qty) * 100}%` }}
                        ></div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 text-right text-white font-mono">
                      ${o.price.toLocaleString()}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${
                        o.status === 'Filled' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        o.status === 'Cancelled' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                        'bg-electric/10 text-electric border-electric/20'
                      }`}>
                        {o.status}
                      </span>
                    </td>

                    {/* Action Button (Only for Open Orders) */}
                    {activeTab === 'open' && (
                      <td className="p-4 text-center">
                        <button className="text-xs text-red-400 hover:text-red-300 hover:underline">
                          Cancel
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-muted">
                    No {activeTab} orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders 