import React, { useState, useEffect } from 'react';
import GraduationCapLogo from '../Common/GraduationCapLogo';
import UserDropdown from './UserDropdown';
import AnimatedBackground from '../Common/AnimatedBackground';

const Header = ({ isAuthenticated, user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  console.log('🎯 Header Props:', { isAuthenticated, user: user?.name || 'null' });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsDropdownOpen(false);
      }
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isMobileMenuOpen]);

  return (
    <header className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>
      
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 backdrop-blur-sm">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="p-1.5 sm:p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
              <GraduationCapLogo size={24} />
            </div>
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-light tracking-wide">CampusBridge</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* User Avatar with Dropdown */}
              <div className="relative user-dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {user?.name?.charAt(0) || user?.userName?.charAt(0) || 'U'}
                </button>
                
                <UserDropdown 
                  user={user} 
                  isOpen={isDropdownOpen} 
                  onClose={() => setIsDropdownOpen(false)} 
                />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300"
              >
                Features
              </button>
              <button
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all duration-300 border border-white/20 text-sm font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="px-6 py-2.5 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-medium"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="relative user-dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
              >
                {user?.name?.charAt(0) || user?.userName?.charAt(0) || 'U'}
              </button>
              <UserDropdown 
                user={user} 
                isOpen={isDropdownOpen} 
                onClose={() => setIsDropdownOpen(false)} 
              />
            </div>
          ) : (
            <>
              <button 
                onClick={() => window.location.href = '/login'}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-xs sm:text-sm font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white/90 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {!isAuthenticated && isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 z-30">
            <div className="flex flex-col py-4 px-4 space-y-3">
              <button
                onClick={() => {
                  document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-left text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-left text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="px-4 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm font-medium text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] sm:min-h-[80vh] px-4 sm:px-6 md:px-8 text-center pt-8 sm:pt-0">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-tight leading-tight sm:leading-none">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Connect
            </span>
            <span className="block text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 sm:mt-2">
              Share Success
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed px-2">
            Bridge the gap between experience and opportunity. Get authentic placement insights 
            from seniors who've walked the path before you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-12 px-4">
            <button
              onClick={() => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Explore Stories
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white rounded-xl font-medium hover:bg-white/5 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
