import React, { useState, useEffect } from 'react';
import { BookOpen, Building, Target, Users, Plus, LogOut } from 'lucide-react';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import UserProfileCard from '../components/Dashboard/UserProfileCard';
import StatsCard from '../components/Dashboard/StatsCard';
import PostCard from '../components/Dashboard/PostCard';

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
              <span className="text-2xl font-light tracking-wide text-gray-800">CampusBridge</span>
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
