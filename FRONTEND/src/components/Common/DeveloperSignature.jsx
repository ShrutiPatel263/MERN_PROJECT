import React, { useState } from 'react';

const DeveloperSignature = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="fixed bottom-[220px] sm:bottom-[240px] md:bottom-[200px] right-4 sm:right-6 z-[100] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Compact Badge */}
      <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 text-white px-3 sm:px-4 py-2 rounded-full shadow-xl border border-white/10 backdrop-blur-sm flex items-center space-x-2 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <span className="text-xs sm:text-sm font-medium">Built by Shruti</span>
        <span className="text-base sm:text-lg">💻</span>
      </div>
      
      {/* Expanded Card on Hover */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 p-4 w-56 sm:w-64 transform transition-all duration-300">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">SP</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm sm:text-base">Shruti Patel</h4>
              <p className="text-xs text-gray-500">Full Stack Developer</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Crafted with 💙 to help students ace placements
          </p>
          <div className="flex space-x-2">
            <a 
              href="https://github.com/ShrutiPatel263" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperSignature;

