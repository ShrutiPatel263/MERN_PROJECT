import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../Common/AnimatedBackground';

const SuccessScreen = ({ 
  title = "Success!", 
  message = "Operation completed successfully.", 
  linkTo = "/login",
  linkText = "Continue"
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6 relative overflow-hidden">
    <AnimatedBackground />
    
    <div className="relative z-10 max-w-md w-full">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/20">
        <div className="w-20 h-20 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/30">
          <CheckCircle className="text-emerald-400" size={40} />
        </div>
        <h2 className="text-2xl font-light text-white mb-3">{title}</h2>
        <p className="text-white/70 mb-8 leading-relaxed">
          {message}
        </p>
        <Link to={linkTo} className="w-full inline-block text-center bg-white text-gray-900 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
          {linkText}
        </Link>
      </div>
    </div>
  </div>
);

export default SuccessScreen;
