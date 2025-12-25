import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Added GoogleAuthProvider and signInWithPopup
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // --- GOOGLE SIGN IN HANDLER ---
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      const errorMap = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Account temporarily locked.',
      };
      setError(errorMap[err.code] || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Password reset link sent! Check your inbox.');
      setError('');
    } catch (err) {
      setError('Could not send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-charcoal to-black text-white">
      <div className="w-full max-w-5xl animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden border border-white/5 bg-card">
          
          {/* Left Side: Promo Panel */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-card to-gray-900 relative">
             <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
              <p className="text-muted text-lg leading-relaxed">Access your trading dashboard and institutional-grade tools.</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Sign In</h1>
            </div>

            {error && <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
            {message && <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">{message}</div>}

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 mb-6 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm font-semibold"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted">Or continue with email</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:border-electric outline-none"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted">Password</label>
                  <button type="button" onClick={handleForgotPassword} className="text-xs font-semibold text-electric hover:text-white">Forgot password?</button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:border-electric outline-none"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold bg-electric hover:bg-blue-600 disabled:opacity-50 transition-all"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-muted">
              Don't have an account? <Link to="/signup" className="font-bold text-electric hover:text-white">Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;