import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Calendar, Building, User, Star, ArrowUpDown, LogIn, UserPlus, BookOpen, Users, Target, LogOut, Settings, Home } from 'lucide-react';

// Graduation Cap Logo Component
const GraduationCapLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="text-white">
    <path fill="currentColor" d="M12,3L1,9L12,15L21,12.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </svg>
);

// Animated Background Component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Gradient Mesh */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50"></div>
    
    {/* Floating geometric shapes */}
    <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"></div>
    <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse delay-1000"></div>
    <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-ping delay-500"></div>
    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500/25 rounded-full animate-pulse delay-700"></div>
    
    {/* Subtle gradient orbs */}
    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl animate-pulse duration-4000"></div>
    <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-indigo-50/15 to-purple-50/10 rounded-full blur-3xl animate-pulse delay-2000 duration-6000"></div>
  </div>
);

// User Dropdown Component
const UserDropdown = ({ user, isOpen, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
      {/* User Info */}
      <div className="px-4 py-3 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            {user?.name?.charAt(0) || user?.userName?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
            <p className="text-sm text-gray-600">@{user?.userName || 'user'}</p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="py-2">
        <button
          onClick={() => {
            window.location.href = '/createpost';
            onClose();
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
        >
          <BookOpen size={18} className="text-blue-600" />
          <span>Share Experience</span>
        </button>
        
        <div className="border-t border-white/20 my-2"></div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ isAuthenticated, user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  console.log('🎯 Header Props:', { isAuthenticated, user: user?.name || 'null' });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>
      
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <GraduationCapLogo size={32} />
          </div>
          <span className="text-2xl font-light tracking-wide">CampusConnect</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* User Avatar with Dropdown */}
              <div className="relative user-dropdown-container">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {user?.name?.charAt(0) || user?.userName?.charAt(0) || 'U'}
                </button>
                
                <UserDropdown 
                  user={user} 
                  isOpen={isDropdownOpen} 
                  onClose={() => setIsDropdownOpen(false)} 
                />
              </div>
            </>
          ) : (
            <>
              <button className="px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300">
                Features
              </button>
              <button className="px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300">
                About
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all duration-300 border border-white/20 text-sm font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="px-6 py-2.5 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-medium"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-7xl md:text-8xl font-extralight tracking-tight leading-none">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Connect
            </span>
            <span className="block text-white/90 text-6xl md:text-7xl mt-2">
              Share Success
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Bridge the gap between experience and opportunity. Get authentic placement insights 
            from seniors who've walked the path before you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Explore Stories
            </button>
            <button className="px-8 py-4 border border-white/30 text-white rounded-xl font-medium hover:bg-white/5 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Search and Filter Bar Component
const SearchFilterBar = ({ searchTerm, setSearchTerm, filters, setFilters, sortBy, setSortBy, companies, difficulties }) => {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 mb-8 -mt-16 relative z-10 mx-4">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white/80 backdrop-blur-sm placeholder-gray-500 shadow-sm"
          />
        </div>
        
        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative">
            <select 
              value={filters.company} 
              onChange={(e) => setFilters({...filters, company: e.target.value})}
              className="appearance-none bg-white/80 backdrop-blur-sm border-0 rounded-xl px-4 py-4 pr-10 text-gray-700 focus:ring-2 focus:ring-blue-500 min-w-[160px] shadow-sm"
            >
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          <div className="relative">
            <select 
              value={filters.difficulty} 
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              className="appearance-none bg-white/80 backdrop-blur-sm border-0 rounded-xl px-4 py-4 pr-10 text-gray-700 focus:ring-2 focus:ring-blue-500 min-w-[140px] shadow-sm"
            >
              <option value="">All Levels</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border-0 rounded-xl px-4 py-4 pr-10 text-gray-700 focus:ring-2 focus:ring-blue-500 min-w-[140px] shadow-sm"
            >
              <option value="newest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="company">Company</option>
              <option value="difficulty">Difficulty</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Post Card Component
const PostCard = ({ post }) => {
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
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
          Read full experience →
        </button>
      </div>
    </div>
  );
};

// Main Homepage Component
const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    company: '',
    difficulty: '',
    branch: '',
    interviewType: ''
  });

  const 
  difficulties = ['Easy', 'Medium', 'Hard'];

  // Check authentication status and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isAuth = !!token;
    
    console.log('🔍 Auth Check:', {
      token: token ? 'EXISTS' : 'NOT FOUND',
      isAuth,
      tokenLength: token?.length || 0
    });
    
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      // Try to decode JWT token to get user data
      try {
        // Check if token is a valid JWT format (has 3 parts separated by dots)
        if (token.includes('.') && token.split('.').length === 3) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('✅ JWT decoded:', payload);
          setUser({
            name: payload.name || 'User',
            userName: payload.userName || 'user',
            branch: payload.branch || 'CSE'
          });
        } else {
          // If it's not a JWT, try to get user data from localStorage or use placeholder
          const storedUser = localStorage.getItem('userData');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            console.log('✅ User data from localStorage:', userData);
            setUser(userData);
          } else {
            console.log('⚠️ Using placeholder user data');
            setUser({
              name: 'User',
              userName: 'user',
              branch: 'CSE'
            });
          }
        }
      } catch (error) {
        console.log('❌ Token decode failed:', error);
        // If token decode fails, use placeholder data
        setUser({
          name: 'User',
          userName: 'user',
          branch: 'CSE'
        });
      }
    } else {
      console.log('❌ No token found, user not authenticated');
      setUser(null);
    }
  }, []);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/v1/posts/allposts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setPosts(data.data);
          setFilteredPosts(data.data);
          
          // Extract unique companies for filter
          const uniqueCompanies = [...new Set(data.data.map(post => post.companyName))];
          setCompanies(uniqueCompanies);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter and Search Logic
  useEffect(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.topicsCovered.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCompany = !filters.company || post.companyName === filters.company;
      const matchesDifficulty = !filters.difficulty || post.difficultyLevel === filters.difficulty;
      const matchesInterviewType = !filters.interviewType || post.interviewType === filters.interviewType;
      
      return matchesSearch && matchesCompany && matchesDifficulty && matchesInterviewType;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'newest': return new Date(b.date) - new Date(a.date);
        case 'oldest': return new Date(a.date) - new Date(b.date);
        case 'company': return a.companyName.localeCompare(b.companyName);
        case 'difficulty': 
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficultyLevel] - difficultyOrder[b.difficultyLevel];
        default: return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, filters, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl">
            <h3 className="font-semibold mb-2">Unable to load experiences</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      <Header isAuthenticated={isAuthenticated} user={user} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Search and Filter Bar */}
        <SearchFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          companies={companies}
          difficulties={difficulties}
        />
        
        {/* Posts Section */}
        <div className="mb-8 px-4">
          <h2 className="text-3xl font-light text-gray-800 mb-2">
            Placement Stories
          </h2>
          <p className="text-gray-600">
            {filteredPosts.length} experience{filteredPosts.length !== 1 ? 's' : ''} shared by your seniors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
          {filteredPosts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No experiences found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;