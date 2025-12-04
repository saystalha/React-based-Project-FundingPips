import React from 'react'

const HeroSection = () => {
  return (
    <section className="bg-card rounded-lg p-16 text-center mb-8 animate-slide-up shadow-2xl">
      
      {/* Main Title */}
      <h1 className="text-5xl font-bold text-electric mb-4">
        FundingPips
      </h1>

      {/* Subtitle (Updated: Removed highlight on real-time quotes) */}
      <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 leading-tight">
        Trade smarter — real-time quotes, portfolio insights, and advanced charts
      </h2>

      {/* Description Paragraph */}
      <p className="text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
        Monitor markets, place orders, and manage your portfolio with speed and confidence. Start trading with FundingPips today.
      </p>

      {/* Call to Action Button */}
      <button className="bg-electric text-white font-bold py-3 px-8 rounded-md transition-all duration-200 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1">
        Explore Markets
      </button>
      
    </section>
  )
}

export default HeroSection