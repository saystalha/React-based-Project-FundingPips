import React from 'react'

const Faqs = () => {
  const faqs = [
    { q: 'Which markets does FundingPips support?', a: 'FundingPips provides data and trading tools for stocks, forex, and major crypto assets (market availability may vary by region).'},
    { q: 'How fast are quotes and order executions?', a: 'Quotes update in near real-time; order execution speed depends on your broker/exchange integration. We optimize routing for low-latency where supported.'},
    { q: 'Is my trading data secure?', a: 'Yes — we use encryption in transit and at rest, plus account protections such as 2FA and session controls.' },
    { q: 'Can I try the platform before committing?', a: 'Yes. Create a free account to explore market data, charts, and portfolio tracking. Live trading requires account verification.' },
  ]

  return (
    <section className="bg-card rounded-lg p-12 mb-8 animate-fade-in shadow-lg">
      <h2 className="text-center text-electric text-4xl font-bold mb-12">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="bg-[#21212180] border-l-4 border-mint rounded p-6 mb-4 transition-colors duration-300 hover:bg-[#212121b3]"
          >
            <h4 className="text-mint font-bold mb-2 text-lg">
              Q: {faq.q}
            </h4>
            <p className="text-muted leading-relaxed">
              A: {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Faqs