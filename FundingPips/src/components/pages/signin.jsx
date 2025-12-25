import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Import Firebase Auth functions
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For success messages (reset email)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // --- SIGN IN HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.code);
      // Map Firebase codes to user-friendly messages
      const errorMap = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Account temporarily locked due to many failed attempts.',
      };
      setError(errorMap[err.code] || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- PASSWORD RESET HANDLER ---
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first to reset your password.');
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Password reset link sent! Check your inbox.');
      setError('');
    } catch (err) {
      setError('Could not send reset email. Verify your email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-charcoal to-black">
      <div className="w-full max-w-5xl animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden border border-white/5">
          
          {/* Left Side: Promo Panel */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-card to-gray-900 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">Securely access your trading tools and dashboard.</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex flex-col justify-center p-8 md:p-12 bg-card w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Success Message for Reset Email */}
            {message && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:border-electric outline-none"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted">Password</label>
                  {/* Password Reset Button */}
                  <button 
                    type="button" // Important: set type to button so it doesn't submit the form
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-electric hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:border-electric outline-none"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white bg-electric hover:bg-blue-600 disabled:opacity-50 transition-all"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-electric hover:text-white">Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;