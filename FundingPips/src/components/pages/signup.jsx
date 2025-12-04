import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const passwordStrength = useMemo(() => {
    const pwd = formData.password || ''
    if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) return 'Strong'
    if (pwd.length >= 8) return 'Medium'
    if (pwd.length > 0) return 'Weak'
    return ''
  }, [formData.password])

  // Helper to get color class based on strength
  const getStrengthColor = (strength) => {
    if (strength === 'Strong') return 'text-green-400'
    if (strength === 'Medium') return 'text-yellow-400'
    return 'text-red-400'
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.includes('@')) newErrors.email = 'Enter a valid email'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      setTimeout(() => {
        localStorage.setItem('auth_token', 'demo_token_' + Date.now())
        setLoading(false)
        navigate('/')
      }, 900)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-charcoal to-black">
      
      <div className="w-full max-w-5xl animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden border border-white/5">
          
          {/* Left Side: Promo Panel */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-card to-gray-900 relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-electric/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Join <span className="text-electric">FundingPips</span> Today
              </h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Create your trading account to start tracking markets, building a portfolio, and executing strategies with institutional-grade tools.
              </p>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                <strong className="text-electric block mb-4 uppercase text-xs tracking-wider font-bold">Included Benefits</strong>
                <ul className="space-y-4 text-muted text-sm">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">✓</div>
                    Real-time market data feed
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">✓</div>
                    Secure account protection & 2FA
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">✓</div>
                    Advanced portfolio analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex flex-col justify-center p-8 md:p-12 bg-card w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-muted text-sm">Start your trading journey for free</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-medium text-muted">First Name</label>
                  <input 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="John" 
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric transition-colors text-white placeholder-gray-600 ${errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-electric'}`} 
                  />
                  {errors.firstName && <div className="text-red-400 text-xs">{errors.firstName}</div>}
                </div>

                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-medium text-muted">Last Name</label>
                  <input 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Doe" 
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric transition-colors text-white placeholder-gray-600 ${errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-electric'}`} 
                  />
                  {errors.lastName && <div className="text-red-400 text-xs">{errors.lastName}</div>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Email Address</label>
                <input 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="you@company.com" 
                  className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric transition-colors text-white placeholder-gray-600 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-electric'}`} 
                />
                {errors.email && <div className="text-red-400 text-xs">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Create a password" 
                  className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric transition-colors text-white placeholder-gray-600 ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-electric'}`} 
                />
                <div className="flex justify-between items-center h-4">
                  {errors.password && <div className="text-red-400 text-xs">{errors.password}</div>}
                  {passwordStrength && !errors.password && (
                    <div className={`text-xs font-bold ml-auto ${getStrengthColor(passwordStrength)}`}>
                      Strength: {passwordStrength}
                    </div>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Confirm Password</label>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Repeat your password" 
                  className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric transition-colors text-white placeholder-gray-600 ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-electric'}`} 
                />
                {errors.confirmPassword && <div className="text-red-400 text-xs">{errors.confirmPassword}</div>}
              </div>

              {/* Terms Checkbox */}
              <div className="space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      name="agreeTerms" 
                      checked={formData.agreeTerms} 
                      onChange={handleChange} 
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-600 bg-gray-800 transition-all checked:border-electric checked:bg-electric focus:ring-2 focus:ring-electric focus:ring-offset-1 focus:ring-offset-gray-900"
                    />
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm text-muted select-none mt-0.5">
                    I agree to the <Link to="#" className="text-electric hover:text-white transition-colors">Terms</Link> and <Link to="#" className="text-electric hover:text-white transition-colors">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeTerms && <div className="text-red-400 text-xs ml-8">{errors.agreeTerms}</div>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full flex justify-center py-3 px-4 mt-2 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-electric hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

            </form>

            <div className="mt-8 text-center text-sm text-muted">
              Already have an account?{' '}
              <Link to="/signin" className="font-bold text-electric hover:text-white transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp