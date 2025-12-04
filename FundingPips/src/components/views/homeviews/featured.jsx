import React from 'react'

const Featured = () => {
  const features = [
    { icon: '⚡', title: 'Real-time Quotes', desc: 'Live market data and fast price updates for stocks, forex, and crypto.' },
    { icon: '📈', title: 'Advanced Charts', desc: 'Interactive charts with indicators, drawing tools and multiple timeframes.' },
    { icon: '🧭', title: 'Portfolio Management', desc: 'Track positions, P&L, allocations and historical performance.' },
    { icon: '🚀', title: 'Smart Order Routing', desc: 'Fast order placement with market and limit options and order history.' },
  ]

  return (
    <section className="bg-card rounded-lg p-12 mb-8 animate-pop-in shadow-lg">
      <h2 className="text-center text-electric text-4xl font-bold mb-12">
        Platform Highlights
      </h2>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="bg-[#212121b3] border-l-4 border-mint rounded p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/5"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-electric font-bold text-lg mb-3">
              {feature.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Featured