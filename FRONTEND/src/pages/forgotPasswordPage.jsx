import React, { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import InputField from '../components/Auth/InputField';
import PasswordField from '../components/Auth/PasswordField';
import SuccessScreen from '../components/Auth/SuccessScreen';
import { API_ENDPOINTS } from '../config/api';

// Main Forgot Password Component
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateEmail = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateEmail()) return;

    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          newPassword,
          confirmPassword
        }),
      });

      const data = await response.json();
      
      console.log('🔍 Forgot Password Response:', {
        ok: response.ok,
        success: data.success,
        message: data.message
      });

      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        setErrors({ submit: data.message || 'Failed to reset password. Please try again.' });
      }
    } catch (error) {
      console.error('❌ Forgot Password error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (success) {
    return (
      <SuccessScreen 
        title="Password Reset Successfully!"
        message="Your password has been reset. You can now sign in with your new password."
        linkTo="/login"
        linkText="Back to Sign In"
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors duration-300 group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Sign In</span>
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
              <GraduationCapLogo size={32} />
              <span className="text-2xl font-light text-white tracking-wide">CampusBridge</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-light text-white mb-2">Reset Your Password</h1>
          <p className="text-white/60">Enter your email and new password to reset your account</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6">
            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }));
                }
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter your registered email"
              error={errors.email}
              autoComplete="email"
            />

            {/* New Password Field */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) {
                      setErrors(prev => ({ ...prev, newPassword: '' }));
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 ${errors.newPassword ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
                  placeholder="Create a new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-300/90 text-sm">{errors.newPassword}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) {
                      setErrors(prev => ({ ...prev, confirmPassword: '' }));
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 ${errors.confirmPassword ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-300/90 text-sm">{errors.confirmPassword}</p>}
            </div>

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
                  <span>Resetting Password...</span>
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
            Enter your email and choose a new password to regain access to your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
