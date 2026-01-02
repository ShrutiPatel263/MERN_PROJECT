import React from 'react';
import { Building, Edit, Trash2, Calendar, BookOpen } from 'lucide-react';

const PostCard = ({ post, onEdit, onDelete }) => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <Building className="text-blue-600" size={20} />
          <h3 className="text-xl font-bold text-gray-800">{post.companyName}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(post.difficultyLevel)}`}>
            {post.difficultyLevel}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(post._id)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600 font-medium mb-2">{post.jobTitle}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
            {post.interviewType}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <BookOpen className="text-blue-600" size={16} />
          <span className="text-sm font-medium text-gray-700">Topics</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.topicsCovered?.slice(0, 3).map((topic, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
              {topic}
            </span>
          ))}
          {post.topicsCovered?.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">
              +{post.topicsCovered.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {post.tips.length > 100 ? `${post.tips.substring(0, 100)}...` : post.tips}
      </p>
    </div>
  );
};

export default PostCard;
