import React, { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import InputField from '../components/Auth/InputField';
import PasswordField from '../components/Auth/PasswordField';
import SuccessScreen from '../components/Auth/SuccessScreen';
import { API_ENDPOINTS } from '../config/api';

// Main Login Component
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      
      console.log('🔍 Login Response:', {
        ok: response.ok,
        success: data.success,
        hasToken: !!data.data?.accessToken,
        hasUser: !!data.data?.user,
        data: data
      });

      if (response.ok && data.success) {
        const userData = data.data?.user || { name: 'User' };
        const token = data.data?.accessToken;
        
        setUser(userData);
        setSuccess(true);
        
        // Store token if provided
        if (token) {
          localStorage.setItem('authToken', token);
          console.log('✅ Token stored:', token.substring(0, 20) + '...');
        } else {
          console.log('⚠️ No token in response');
        }
        
        // Store user data if provided
        if (userData) {
          localStorage.setItem('userData', JSON.stringify(userData));
          console.log('✅ User data stored:', userData);
        } else {
          console.log('⚠️ No user data in response');
        }
        
        // Redirect after success screen
        setTimeout(() => {
          navigate('/'); // Redirect to homepage (SPA)
          console.log('Login successful, redirect to homepage');
        }, 2000);
      } else {
        console.log('❌ Login failed:', data);
        setErrors({ submit: data.message || 'Invalid email or password. Please try again.' });
      }
    } catch (error) {
      console.error('❌ Login error:', error);
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
        title="Welcome Back!"
        message="Successfully signed in. Redirecting you to your dashboard..."
        linkTo="/"
        linkText="Go to Dashboard"
      />
    );
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
              <span className="text-2xl font-light text-white tracking-wide">CampusBridge</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-light text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6">
            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your email"
              error={errors.email}
              autoComplete="email"
            />

            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              placeholder="Enter your password"
              error={errors.password}
              onKeyPress={handleKeyPress}
            />

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                Forgot password?
              </Link>
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
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <p className="text-white/60">
                Don't have an account?{' '}
                <Link to="/register" className="text-white hover:text-white/80 font-medium transition-colors duration-300 underline underline-offset-2 inline-flex items-center space-x-1">
                  <span>Sign Up</span>
                  <UserPlus size={14} />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
             connect with the CampusBridge community
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;