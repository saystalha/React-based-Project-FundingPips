import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please provide both email and password')
      return
    }

    setLoading(true)
    // Simulate API Call
    setTimeout(() => {
      localStorage.setItem('auth_token', 'demo_token_' + Date.now())
      setLoading(false)
      navigate('/')
    }, 900)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-charcoal to-black">
      
      <div className="w-full max-w-5xl animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden border border-white/5">
          
          {/* Left Side: Promo Panel (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-card to-gray-900 relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-electric/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back to <span className="text-electric">FundingPips</span>
              </h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Sign in to manage your portfolio, execute trades, and access advanced market analysis tools.
              </p>
              
              <ul className="space-y-4 text-muted">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center text-electric">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  </div>
                  Real-time Portfolio & P&L Tracking
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center text-electric">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  Instant Order Execution
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center text-electric">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  Secure & Encrypted Connection
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex flex-col justify-center p-8 md:p-12 bg-card w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
              <p className="text-muted text-sm">Access your trading dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors text-white placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted">Password</label>
                  <Link to="#" className="text-xs font-semibold text-electric hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors text-white placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-electric focus:ring-electric border-gray-600 rounded bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-electric hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

            </form>

            <div className="mt-8 text-center text-sm text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-electric hover:text-white transition-colors">
                Create account
              </Link>
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-xs text-muted/60">
          <p>Demo Credentials: demo@fundingpips.example / demo123</p>
          <p className="mt-1">&copy; 2025 FundingPips. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}

export default SignIn