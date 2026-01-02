import React from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

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

export default PasswordField;
