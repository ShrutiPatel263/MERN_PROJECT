import React, { useState } from 'react';
import { X } from 'lucide-react';

const MultiInputField = ({ label, icon: Icon, values, onChange, placeholder, error }) => {
  const [currentValue, setCurrentValue] = useState('');

  const addValue = () => {
    if (currentValue.trim() && !values.includes(currentValue.trim())) {
      onChange([...values, currentValue.trim()]);
      setCurrentValue('');
    }
  };

  const removeValue = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValue();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-white/90 text-sm font-medium">
        {label}
      </label>
      <div className="space-y-3">
        <div className="relative">
          {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />}
          <div className="flex gap-2">
            <input
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className={`flex-1 ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 focus:border-white/40 focus:bg-white/10 transition-all duration-300 ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
            />
            <button
              type="button"
              onClick={addValue}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 flex-shrink-0"
            >
              Add
            </button>
          </div>
        </div>
        {values.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {values.map((value, index) => (
              <div key={index} className="flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-lg px-3 py-2">
                <span className="text-white text-sm">{value}</span>
                <button
                  type="button"
                  onClick={() => removeValue(index)}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-300/90 text-sm">{error}</p>}
    </div>
  );
};

export default MultiInputField;
