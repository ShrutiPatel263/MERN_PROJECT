import React from 'react';

const TextareaField = ({ label, icon: Icon, error, rows = 4, ...props }) => (
  <div className="space-y-2">
    <label className="block text-white/90 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-4 text-white/50" size={18} />}
      <textarea
        {...props}
        rows={rows}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none text-sm sm:text-base ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
      />
    </div>
    {error && <p className="text-red-300/90 text-sm">{error}</p>}
  </div>
);

export default TextareaField;
