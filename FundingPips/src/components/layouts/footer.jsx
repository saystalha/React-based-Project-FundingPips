import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-card to-[#262626] text-muted border-t-2 border-mint mt-auto p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Container */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <h3 className="text-electric font-bold text-lg mb-2">FundingPips</h3>
            <p className="text-sm">Real-time trading, portfolio and market insights</p>
          </div>

          {/* Contact Section */}
          <div>
            <p className="font-bold text-electric mb-2">Contact</p>
            <div className="text-sm space-y-1">
              <p>📧 support@fundingpips.example</p>
              <p>📱 +1 (555) 123-4567</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <p className="font-bold text-electric mb-2">Quick Links</p>
            <ul className="text-sm list-none space-y-2">
              <li>
                <a href="#" className="text-mint no-underline hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-mint no-underline hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-mint no-underline hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 text-center text-xs opacity-80">
          <small>© {new Date().getFullYear()} FundingPips. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer