import React from 'react';

const AnimatedBackground = ({ variant = "dark" }) => {
  if (variant === "light") {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50"></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500/25 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl animate-pulse duration-4000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-indigo-50/15 to-purple-50/10 rounded-full blur-3xl animate-pulse delay-2000 duration-6000"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/5 via-blue-50/5 to-indigo-100/10"></div>
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-white/10 rounded-full animate-ping delay-500"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500/25 rounded-full animate-pulse delay-700"></div>
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse duration-4000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000 duration-6000"></div>
    </div>
  );
};

export default AnimatedBackground;
