import React from 'react'

const About = () => {
  return (
    <div className="w-full animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="bg-card rounded-lg p-12 text-center shadow-lg border border-white/5">
        <h1 className="text-4xl font-bold text-electric mb-4">About FundingPips</h1>
        <p className="text-muted max-w-2xl mx-auto text-lg">
          We are dedicated to providing traders with the capital, technology, and support they need to succeed in the global markets.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Our Mission */}
        <div className="bg-[#21212180] border-l-4 border-mint rounded p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-muted leading-relaxed">
            Our mission is to democratize access to financial markets. We believe that talent shouldn't be limited by capital. By providing funding to profitable traders, we align our success with yours.
          </p>
        </div>

        {/* Our Vision */}
        <div className="bg-[#21212180] border-l-4 border-electric rounded p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
          <p className="text-muted leading-relaxed">
            To build the world's most transparent and trader-centric proprietary trading firm, offering institutional-grade tools, lightning-fast execution, and fair evaluation criteria.
          </p>
        </div>

      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-card p-6 rounded text-center border border-white/5">
          <div className="text-3xl font-bold text-electric mb-1">10k+</div>
          <div className="text-sm text-muted">Funded Traders</div>
        </div>
        <div className="bg-card p-6 rounded text-center border border-white/5">
          <div className="text-3xl font-bold text-electric mb-1">$5M+</div>
          <div className="text-sm text-muted">Payouts Processed</div>
        </div>
        <div className="bg-card p-6 rounded text-center border border-white/5">
          <div className="text-3xl font-bold text-electric mb-1">180+</div>
          <div className="text-sm text-muted">Countries Supported</div>
        </div>
      </div>

    </div>
  )
}

export default About