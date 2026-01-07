import React, { useState } from 'react';
import { ArrowLeft, Building, Briefcase, BookOpen, Calendar, Target, FileText, Trophy, AlertCircle, Zap, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import InputField from '../components/Auth/InputField';
import SelectField from '../components/Auth/SelectField';
import TextareaField from '../components/Auth/TextareaField';
import MultiInputField from '../components/Auth/MultiInputField';
import SuccessScreen from '../components/Auth/SuccessScreen';
import { API_ENDPOINTS } from '../config/api';

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
      const response = await fetch(API_ENDPOINTS.CREATE_POST, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
    return (
      <SuccessScreen 
        title="Experience Shared!"
        message="Your placement experience has been successfully posted and will help fellow students in their journey."
        linkTo="/"
        linkText="View All Posts"
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-300 group">
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <GraduationCapLogo size={24} />
              <span className="text-xl font-light text-white">CampusBridge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-3">Share Your Experience</h1>
          <p className="text-white/70 text-lg">Help fellow students by sharing your placement journey</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
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
                  icon={Zap}
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
                  icon={LinkIcon}
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
              <div className="flex items-center space-x-3 text-red-300/90 text-sm bg-red-500/10 border border-red-400/20 rounded-xl p-4 mt-6">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-4 border border-white/20 text-white rounded-xl font-medium hover:bg-white/5 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex-1 bg-white text-gray-900 font-medium py-4 rounded-xl transition-all duration-300 ${
                  loading 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 shadow-lg'
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