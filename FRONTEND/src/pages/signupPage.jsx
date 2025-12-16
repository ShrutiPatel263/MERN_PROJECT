import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserCheck, GraduationCap, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Graduation Cap Logo Component
const GraduationCapLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="text-white">
    <path fill="currentColor" d="M12,3L1,9L12,15L21,12.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </svg>
);

// Animated Background Component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
    
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/5 via-blue-50/5 to-indigo-100/10"></div>
    
    {/* Floating particles */}
    <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"></div>
    <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse delay-1000"></div>
    <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-white/10 rounded-full animate-ping delay-500"></div>
    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500/25 rounded-full animate-pulse delay-700"></div>
    
    {/* Gradient orbs */}
    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse duration-4000"></div>
    <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000 duration-6000"></div>
  </div>
);

// Input Field Component
const InputField = ({ label, icon: Icon, error, className = "", ...props }) => (
  <div className="space-y-2">
    <label className="block text-white/90 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
      <input
        {...props}
        className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''} ${className}`}
      />
    </div>
    {error && <p className="text-red-300/90 text-sm">{error}</p>}
  </div>
);

// Password Field Component
const PasswordField = ({ label, name, value, onChange, showPassword, togglePassword, error, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-white/90 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
    {error && <p className="text-red-300/90 text-sm">{error}</p>}
  </div>
);

// Success Screen Component
const SuccessScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6 relative overflow-hidden">
    <AnimatedBackground />
    
    <div className="relative z-10 max-w-md w-full">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/20">
        <div className="w-20 h-20 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/30">
          <CheckCircle className="text-emerald-400" size={40} />
        </div>
        <h2 className="text-2xl font-light text-white mb-3">Welcome to CampusConnect!</h2>
        <p className="text-white/70 mb-8 leading-relaxed">
          Your account has been created successfully. You can now explore placement experiences and connect with your seniors.
        </p>
        <Link to="/login" className="w-full inline-block text-center bg-white text-gray-900 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
          Continue to Sign In
        </Link>
      </div>
    </div>
  </div>
);

// Main Sign Up Component
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    branch: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const branches = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    const emailRegex = /^[^\s@]+@vgecg\.ac\.in$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid vgecg.ac.in email';
    }

    if (!formData.userName || formData.userName.length < 3) {
      newErrors.userName = 'Username must be at least 3 characters long';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.branch) {
      newErrors.branch = 'Please select your branch';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userName: formData.userName,
          branch: formData.branch
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          console.log('Registration successful, redirect to login');
        }, 2000);
      } else {
        setErrors({ submit: data.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors duration-300 group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <GraduationCapLogo size={32} />
              <span className="text-2xl font-light text-white tracking-wide">CampusConnect</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-light text-white mb-2">Join the Community</h1>
          <p className="text-white/60">Connect with seniors and share your journey</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6">
            <InputField
              label="Full Name"
              icon={User}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.name}
            />

            <InputField
              label="College Email"
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.name@vgecg.ac.in"
              error={errors.email}
            />

            <InputField
              label="Username"
              icon={UserCheck}
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Choose a unique username"
              error={errors.userName}
            />

            {/* Branch Field */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">
                Branch
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 appearance-none ${errors.branch ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
                >
                  <option value="" className="bg-gray-900 text-white">Select your branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch} className="bg-gray-900 text-white">{branch}</option>
                  ))}
                </select>
              </div>
              {errors.branch && <p className="text-red-300/90 text-sm">{errors.branch}</p>}
            </div>

            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              placeholder="Create a secure password"
              error={errors.password}
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              showPassword={showConfirmPassword}
              togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            {errors.submit && (
              <div className="flex items-center space-x-3 text-red-300/90 text-sm bg-red-500/10 border border-red-400/20 rounded-xl p-4">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-white text-gray-900 font-medium py-4 rounded-xl transition-all duration-300 ${
                loading 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 shadow-lg'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <p className="text-white/60">
                Already have an account?{' '}
                <Link to="/login" className="text-white hover:text-white/80 font-medium transition-colors duration-300 underline underline-offset-2">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
            By creating an account, you join a community dedicated to sharing knowledge and experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;