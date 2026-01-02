import React from 'react';

const SelectField = ({ label, icon: Icon, options, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-white/90 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none" size={18} />}
      <select
        {...props}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 appearance-none ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
      >
        <option value="" className="bg-gray-900 text-white">Select an option</option>
        {options && options.map(option => (
          <option key={option} value={option} className="bg-gray-900 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
    {error && <p className="text-red-300/90 text-sm">{error}</p>}
  </div>
);

export default SelectField;
