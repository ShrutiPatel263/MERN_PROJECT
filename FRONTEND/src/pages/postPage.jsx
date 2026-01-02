import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Briefcase, BookOpen, Calendar, Target, Zap, Trophy, AlertCircle, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
import AnimatedBackground from '../components/Common/AnimatedBackground';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/v1/posts/post/${postId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Post not found');
        }

        const data = await response.json();
        console.log('Post data:', data);
        
        // Handle different response structures
        const postData = data.data || data;
        setPost(postData);
        setLikes(postData?.likes?.length || 0);
      } catch (err) {
        setError(err.message || 'Failed to load post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleLike = async () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
            <h1 className="text-2xl font-light text-white mb-2">Post Not Found</h1>
            <p className="text-white/70 mb-6">{error || 'The post you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300 group"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-white font-medium">Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <GraduationCapLogo size={24} />
              <span className="text-xl font-light text-white">CampusBridge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                {post?.owner?.name?.charAt(0) || post?.userName?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{post?.owner?.name || post?.userName || 'Anonymous'}</h1>
                <p className="text-white/70">@{post?.owner?.userName || post?.userName || 'user'} • {post?.owner?.branch || post?.branch || 'Student'}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getDifficultyColor(post?.difficultyLevel)}`}>
              {post?.difficultyLevel || 'N/A'} Level
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            <div>
              <p className="text-white/70 text-sm mb-1">Interview Date</p>
              <p className="text-white font-semibold flex items-center space-x-2">
                <Calendar size={16} />
                <span>{post?.date ? new Date(post.date).toLocaleDateString() : 'N/A'}</span>
              </p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Interview Type</p>
              <p className="text-white font-semibold">{post?.interviewType || 'N/A'}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Result</p>
              <p className="text-white font-semibold">{post?.results || 'Not mentioned'}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm mb-1">Engagement</p>
              <p className="text-white font-semibold">{likes} Likes</p>
            </div>
          </div>
        </div>

        {/* Company & Role */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Building className="text-blue-400" size={28} />
                <h2 className="text-3xl font-bold text-white">{post?.companyName || 'Company'}</h2>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-blue-400" size={20} />
                <p className="text-xl text-white/90">{post?.jobTitle || 'Job Title'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-white">Key Topics Covered</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {post?.topicsCovered && post.topicsCovered.length > 0 ? (
              post.topicsCovered.map((topic, index) => (
                <span key={index} className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
                  {topic}
                </span>
              ))
            ) : (
              <p className="text-white/70">No topics specified</p>
            )}
          </div>
        </div>

        {/* Round Details */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="text-yellow-400" size={24} />
            <h3 className="text-xl font-bold text-white">Interview Process</h3>
          </div>
          <p className="text-white/90 leading-relaxed whitespace-pre-wrap text-base">
            {post?.roundDetails || 'No details provided'}
          </p>
        </div>

        {/* Tips & Advice */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="text-purple-400" size={24} />
            <h3 className="text-xl font-bold text-white">Tips & Advice</h3>
          </div>
          <p className="text-white/90 leading-relaxed whitespace-pre-wrap text-base">
            {post?.tips || 'No tips provided'}
          </p>
        </div>

        {/* Study Material Links */}
        {post?.materialLinks && post.materialLinks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="text-amber-400" size={24} />
              <h3 className="text-xl font-bold text-white">Study Material & Resources</h3>
            </div>
            <div className="space-y-3">
              {post.materialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 hover:text-blue-200 transition-colors duration-300 break-all hover:bg-blue-500/30"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
