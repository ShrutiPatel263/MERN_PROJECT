import React, { useState } from 'react';
import { ArrowLeft, Building, Briefcase, BookOpen, Calendar, Target, FileText, Link, Trophy, CheckCircle, AlertCircle, Plus, X, Users } from 'lucide-react';

// Graduation Cap Logo Component
const GraduationCapLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="text-white">
    <path fill="currentColor" d="M12,3L1,9L12,15L21,12.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </svg>
);

// Animated Background Component
const AnimatedBackground = () => (
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

// Input Field Component
const InputField = ({ label, icon: Icon, error, className = "", ...props }) => (
  <div className="space-y-2">
    <label className="block text-gray-700 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        {...props}
        className={`w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 focus:bg-white/80 transition-all duration-300 ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''} ${className}`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

// Select Field Component
const SelectField = ({ label, icon: Icon, options, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-gray-700 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <select
        {...props}
        className={`w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 focus:bg-white/80 transition-all duration-300 appearance-none ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option} value={option} className="bg-white text-gray-700">
            {option}
          </option>
        ))}
      </select>
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

// Textarea Field Component
const TextareaField = ({ label, icon: Icon, error, rows = 4, ...props }) => (
  <div className="space-y-2">
    <label className="block text-gray-700 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-4 text-gray-400" size={18} />
      <textarea
        {...props}
        rows={rows}
        className={`w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 focus:bg-white/80 transition-all duration-300 resize-none ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

// Multi-Input Field Component (for topics and links)
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
      <label className="block text-gray-700 text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`w-full pl-12 pr-12 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50 focus:bg-white/80 transition-all duration-300 ${error ? 'border-red-400/60 focus:ring-red-400/30' : ''}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addValue}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Plus size={14} />
        </button>
      </div>
      
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {values.map((value, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
            >
              <span>{value}</span>
              <button
                type="button"
                onClick={() => removeValue(index)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Success Screen Component
const SuccessScreen = () => (
  <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
    <AnimatedBackground />
    
    <div className="relative z-10 max-w-md w-full">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/30">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-emerald-600" size={40} />
        </div>
        <h2 className="text-2xl font-light text-gray-800 mb-3">Experience Shared!</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your placement experience has been successfully posted and will help fellow students in their journey.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View All Posts
        </button>
      </div>
    </div>
  </div>
);

// Main Create Post Component
const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    topicsCovered: [],
    interviewType: '',
    roundDetails: '',
    date: '',
    tips: '',
    materialLinks: [],
    difficultyLevel: '',
    results: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const interviewTypes = ['Technical', 'HR', 'Technical + HR', 'Group Discussion', 'Case Study', 'Coding Round', 'Aptitude Test'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];
  const resultOptions = ['Selected', 'Not Selected', 'Waitlisted', 'Process Ongoing'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (name, values) => {
    setFormData(prev => ({ ...prev, [name]: values }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (formData.topicsCovered.length === 0) newErrors.topicsCovered = 'At least one topic is required';
    if (!formData.interviewType) newErrors.interviewType = 'Interview type is required';
    if (!formData.roundDetails.trim()) newErrors.roundDetails = 'Round details are required';
    if (!formData.date) newErrors.date = 'Interview date is required';
    if (!formData.tips.trim()) newErrors.tips = 'Tips are required';
    if (!formData.difficultyLevel) newErrors.difficultyLevel = 'Difficulty level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/posts/createpost', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assuming token-based auth
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
          console.log('Post created successfully');
        }, 2000);
      } else {
        setErrors({ submit: data.message || 'Failed to create post. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
      console.error('Create post error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300 group">
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <GraduationCapLogo size={24} />
              <span className="text-xl font-light text-gray-800">CampusConnect</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-3">Share Your Experience</h1>
          <p className="text-gray-600 text-lg">Help fellow students by sharing your placement journey</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <InputField
                  label="Company Name"
                  icon={Building}
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g., Google, Microsoft, TCS"
                  error={errors.companyName}
                />

                <InputField
                  label="Job Title"
                  icon={Briefcase}
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer, Data Analyst"
                  error={errors.jobTitle}
                />

                <MultiInputField
                  label="Topics Covered"
                  icon={BookOpen}
                  values={formData.topicsCovered}
                  onChange={(values) => handleArrayChange('topicsCovered', values)}
                  placeholder="e.g., Data Structures, Algorithms, System Design"
                  error={errors.topicsCovered}
                />

                <SelectField
                  label="Interview Type"
                  icon={Users}
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  options={interviewTypes}
                  error={errors.interviewType}
                />

                <InputField
                  label="Interview Date"
                  icon={Calendar}
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <TextareaField
                  label="Round Details"
                  icon={FileText}
                  name="roundDetails"
                  value={formData.roundDetails}
                  onChange={handleChange}
                  placeholder="Describe the interview rounds, format, and process..."
                  rows={4}
                  error={errors.roundDetails}
                />

                <TextareaField
                  label="Tips & Advice"
                  icon={Target}
                  name="tips"
                  value={formData.tips}
                  onChange={handleChange}
                  placeholder="Share your preparation tips, what worked well, and advice for others..."
                  rows={4}
                  error={errors.tips}
                />

                <MultiInputField
                  label="Study Material Links (Optional)"
                  icon={Link}
                  values={formData.materialLinks}
                  onChange={(values) => handleArrayChange('materialLinks', values)}
                  placeholder="https://example.com/study-material"
                />

                <SelectField
                  label="Difficulty Level"
                  icon={Target}
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  options={difficultyLevels}
                  error={errors.difficultyLevel}
                />

                <SelectField
                  label="Result (Optional)"
                  icon={Trophy}
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  options={resultOptions}
                />
              </div>
            </div>

            {errors.submit && (
              <div className="flex items-center space-x-3 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-4 mt-6">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex-1 bg-blue-600 text-white font-medium py-4 rounded-xl transition-all duration-300 ${
                  loading 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 shadow-lg'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sharing Experience...</span>
                  </div>
                ) : (
                  'Share Experience'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;