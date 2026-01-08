import React from 'react';

const FooterSignature = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left Section - Branding */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">CampusBridge</h3>
            <p className="text-white/70 text-sm">Bridging experiences, building careers</p>
          </div>
          
          {/* Right Section - Developer Info */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-2 mb-3">
              <span className="text-white/70 text-sm">Crafted with</span>
              <span className="text-red-400 animate-pulse text-lg">❤️</span>
              <span className="text-white/70 text-sm">by</span>
              <a 
                href="https://github.com/ShrutiPatel263" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 hover:from-blue-300 hover:via-indigo-300 hover:to-purple-300 transition-all text-sm"
              >
                Shruti Patel
              </a>
            </div>
            <p className="text-xs text-white/60 mb-4">
              Full Stack Developer • VGEC Ahmedabad • 2027
            </p>
            <div className="flex justify-center md:justify-end space-x-4">
              <a 
                href="https://github.com/ShrutiPatel263" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors text-sm font-medium hover:underline"
              >
                GitHub
              </a>
              <span className="text-white/40">•</span>
              <a 
                href="https://linkedin.com/in/shrutipatel26" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors text-sm font-medium hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-white/40">•</span>
              <a 
                href="mailto:shrutipatel1126@gmail.com" 
                className="text-white/70 hover:text-white transition-colors text-sm font-medium hover:underline"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <p className="text-center text-xs text-white/50">
            © 2025 CampusBridge. All rights reserved. • Version 1.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSignature;

