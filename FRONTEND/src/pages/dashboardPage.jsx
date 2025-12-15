import React, { useState, useEffect } from 'react';
import { User, LogOut, Plus, Edit, Trash2, Calendar, Building, Target, BookOpen, Users, ArrowUpDown } from 'lucide-react';

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

// User Profile Card Component
const UserProfileCard = ({ user, onLogout }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-semibold text-xl shadow-lg">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user?.name || 'User'}</h2>
          <p className="text-gray-600">@{user?.userName || 'username'}</p>
          <p className="text-sm text-gray-500">{user?.branch || 'Branch'}</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200"
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

// Post Card Component
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

// Main Dashboard Component
const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Fetch user data and posts
    fetchUserData();
    fetchUserPosts();
  }, []);

  const fetchUserData = async () => {
    try {
      // In a real app, you'd have an endpoint to get current user data
      // For now, we'll use the token to decode user info
      const token = localStorage.getItem('authToken');
      if (token) {
        // You could decode the JWT token here to get user info
        // For now, we'll use placeholder data
        setUser({
          name: 'John Doe',
          userName: 'johndoe',
          branch: 'CSE',
          email: 'john@vgecg.ac.in'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/v1/posts/allposts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        // Filter posts by current user (in a real app, you'd have a user-specific endpoint)
        setUserPosts(data.data.slice(0, 5)); // Show first 5 posts as example
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  const handleEditPost = (postId) => {
    // Navigate to edit post page
    console.log('Edit post:', postId);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/posts/deletepost/${postId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (response.ok) {
          setUserPosts(prev => prev.filter(post => post._id !== postId));
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <GraduationCapLogo size={32} />
              </div>
              <span className="text-2xl font-light tracking-wide text-gray-800">CampusConnect</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300"
              >
                Browse Posts
              </button>
              <button 
                onClick={() => window.location.href = '/createpost'}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus size={16} />
                <span>New Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* User Profile */}
        <UserProfileCard user={user} onLogout={handleLogout} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={BookOpen}
            title="Posts Shared"
            value={userPosts.length}
            color="blue"
          />
          <StatsCard
            icon={Users}
            title="Helpful Votes"
            value="24"
            color="green"
          />
          <StatsCard
            icon={Building}
            title="Companies"
            value="8"
            color="purple"
          />
          <StatsCard
            icon={Target}
            title="Success Rate"
            value="85%"
            color="orange"
          />
        </div>

        {/* Recent Posts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-light text-gray-800">Your Recent Posts</h2>
            <button 
              onClick={() => window.location.href = '/createpost'}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
              <Plus size={16} />
              <span>Share New Experience</span>
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6">
              <h3 className="font-semibold mb-2">Unable to load your posts</h3>
              <p>{error}</p>
            </div>
          )}

          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userPosts.map(post => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-6">Share your first placement experience to help fellow students</p>
              <button 
                onClick={() => window.location.href = '/createpost'}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Share Your Experience
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
