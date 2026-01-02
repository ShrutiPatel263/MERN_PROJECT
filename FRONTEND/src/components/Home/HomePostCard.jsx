import React from 'react';
import { Building, BookOpen, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePostCard = ({ post }) => {
  const navigate = useNavigate();
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-white/20 hover:border-blue-200/50 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
            {post.owner?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{post.owner?.name || 'Anonymous'}</h3>
            <p className="text-sm text-gray-500">@{post.owner?.userName || 'user'}</p>
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getDifficultyColor(post.difficultyLevel)}`}>
          {post.difficultyLevel}
        </span>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Building className="text-blue-600" size={18} />
          <h2 className="text-xl font-bold text-gray-800">{post.companyName}</h2>
        </div>
        <p className="text-gray-600 font-medium">{post.jobTitle}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen className="text-blue-600" size={16} />
          <span className="text-sm font-medium text-gray-700">Key Topics</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.topicsCovered?.slice(0, 3).map((topic, index) => (
            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
              {topic}
            </span>
          ))}
          {post.topicsCovered?.length > 3 && (
            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100">
              +{post.topicsCovered.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
            {post.interviewType}
          </span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {post.tips.length > 120 ? `${post.tips.substring(0, 120)}...` : post.tips}
        </p>
        <button 
          onClick={() => navigate(`/post/${post._id}`)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
        >
          Read full experience →
        </button>
      </div>
    </div>
  );
};

export default HomePostCard;
