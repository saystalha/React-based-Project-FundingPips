import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import Firestore functions
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
// Import Firebase Authentication functions
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  
  // New state for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
  };

  const passwordStrength = useMemo(() => {
    const pwd = formData.password || "";
    if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /\d/.test(pwd))
      return "Strong";
    if (pwd.length >= 8) return "Medium";
    if (pwd.length > 0) return "Weak";
    return "";
  }, [formData.password]);

  const getStrengthColor = (strength) => {
    if (strength === "Strong") return "text-green-400";
    if (strength === "Medium") return "text-yellow-400";
    return "text-red-400";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      const user = userCredential.user;

      try {
        await setDoc(
          doc(db, "Users", user.uid),
          {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim().toLowerCase(),
            uid: user.uid,
            createdAt: serverTimestamp(),
            role: "trader",
          },
          { merge: true }
        );
        navigate("/dashboard");
      } catch (firestoreError) {
        setErrors({
          submit: "Account created, but profile setup failed. Please contact support.",
        });
      }
    } catch (authError) {
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "The email address is not valid.",
        "auth/weak-password": "The password is too weak.",
      };
      setErrors({
        submit: errorMessages[authError.code] || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper component for the Eye Icon
  const EyeIcon = ({ visible }) => (
    visible ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-charcoal to-black">
      <div className="w-full max-w-5xl animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden border border-white/5">
          {/* Left Side: Promo Panel */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-card to-gray-900 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Join <span className="text-electric">FundingPips</span> Today
              </h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Create your trading account to start tracking markets with institutional-grade tools.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex flex-col justify-center p-8 md:p-12 bg-card w-full">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-muted text-sm">Start your trading journey for free</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.submit && (
                <div className="text-red-400 text-sm text-center font-medium bg-red-900/20 p-2 rounded-lg">
                  {errors.submit}
                </div>
              )}

              {/* Name Row */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-medium text-muted">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric text-white border-white/10`}
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
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric text-white border-white/10`}
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
                  className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric text-white border-white/10`}
                />
                {errors.email && <div className="text-red-400 text-xs">{errors.email}</div>}
              </div>

              {/* Password with Toggle */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric text-white border-white/10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
                <div className="flex justify-between items-center h-4">
                  {errors.password && <div className="text-red-400 text-xs">{errors.password}</div>}
                  {passwordStrength && !errors.password && (
                    <div className={`text-xs font-bold ml-auto ${getStrengthColor(passwordStrength)}`}>
                      Strength: {passwordStrength}
                    </div>
                  )}
                </div>
              </div>

              {/* Confirm Password with Toggle */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-electric text-white border-white/10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <EyeIcon visible={showConfirmPassword} />
                  </button>
                </div>
                {errors.confirmPassword && <div className="text-red-400 text-xs">{errors.confirmPassword}</div>}
              </div>

              {/* Terms */}
              <div className="space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-5 w-5 appearance-none rounded border border-gray-600 bg-gray-800 checked:bg-electric"
                  />
                  <span className="text-sm text-muted">I agree to the Terms and Privacy Policy</span>
                </label>
                {errors.agreeTerms && <div className="text-red-400 text-xs ml-8">{errors.agreeTerms}</div>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-bold text-white bg-electric hover:bg-blue-600 disabled:opacity-50 transition-all"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-muted">
              Already have an account? <Link to="/signin" className="font-bold text-electric">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;