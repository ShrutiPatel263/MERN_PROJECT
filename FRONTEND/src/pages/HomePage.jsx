import React, { useState, useEffect } from 'react';

const CampusConnectHomepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Recent');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
    fetchPosts();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/v1/posts/allposts');
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      } else {
        setError(data.message || 'Failed to fetch experiences');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to connect to server. Please ensure your backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === '' || post.difficultyLevel === selectedDifficulty;
    const matchesCompany = selectedCompany === '' || post.companyName === selectedCompany;
    return matchesSearch && matchesDifficulty && matchesCompany;
  });

  const companies = [...new Set(posts.map(post => post.companyName))];

  const getDifficultyStyles = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return { bg: 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300', text: 'text-emerald-800', dot: 'bg-emerald-500', shadow: 'shadow-emerald-100' };
      case 'Medium': return { bg: 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300', text: 'text-orange-800', dot: 'bg-orange-500', shadow: 'shadow-orange-100' };
      case 'Hard': return { bg: 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300', text: 'text-red-800', dot: 'bg-red-500', shadow: 'shadow-red-100' };
      default: return { bg: 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300', text: 'text-gray-800', dot: 'bg-gray-500', shadow: 'shadow-gray-100' };
    }
  };

  const getCompanyInitials = (company) => {
    return company.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-slate-700 font-semibold text-lg">Loading experiences...</p>
          <p className="mt-2 text-slate-500">Gathering insights from your seniors</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  CampusConnect
                </h1>
                <p className="text-xs text-indigo-500 -mt-1 font-medium">Interview Experiences</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
                Experiences
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
                Companies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
                Tips
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-xl border border-indigo-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">
                        {user?.userName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-slate-800 font-semibold">
                      {user?.userName || user?.name || 'User'}
                    </span>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-sm">
                    Share Experience
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('accessToken');
                      localStorage.removeItem('user');
                      setIsAuthenticated(false);
                      setUser(null);
                    }}
                    className="px-4 py-3 text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button className="px-5 py-3 text-slate-700 hover:text-indigo-600 font-semibold transition-colors duration-200">
                    Sign In
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200">
            <span className="mr-2">✨</span>
            Trusted by 10,000+ students
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Real Interview Experiences from
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mt-2">
              Your Seniors
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get insider insights, preparation tips, and real questions from students who've successfully navigated their interviews
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search Input */}
              <div className="md:col-span-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-800 placeholder-slate-500 bg-white/70"
                    placeholder="Search companies or roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Company Filter */}
              <div className="md:col-span-3">
                <select 
                  className="w-full px-4 py-4 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-800 bg-white/70"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option value="">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="md:col-span-3">
                <select 
                  className="w-full px-4 py-4 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-slate-800 bg-white/70"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-indigo-100">
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">{posts.length}</div>
                <div className="text-sm text-slate-600 font-medium mt-1">Total Experiences</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">{companies.length}</div>
                <div className="text-sm text-slate-600 font-medium mt-1">Companies Covered</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                  {posts.filter(p => p.results === 'Selected').length}
                </div>
                <div className="text-sm text-slate-600 font-medium mt-1">Success Stories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              Interview Experiences ({filteredPosts.length})
            </h3>
            <p className="text-slate-600 mt-2 text-lg">Learn from real student experiences and insights</p>
          </div>
          <select 
            className="px-6 py-3 bg-white/80 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium shadow-lg backdrop-blur-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Recent</option>
            <option>Oldest</option>
            <option>Company A-Z</option>
          </select>
        </div>

        {/* Posts Grid */}
        {error ? (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-3xl p-10 text-center shadow-xl">
            <div className="text-6xl mb-6">⚠️</div>
            <h3 className="text-2xl font-bold text-red-800 mb-3">Connection Error</h3>
            <p className="text-red-700 mb-6 text-lg">{error}</p>
            <button 
              onClick={fetchPosts}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-16 text-center">
            <div className="text-8xl mb-8">🎯</div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">No Experiences Found</h3>
            <p className="text-slate-600 mb-8 text-lg">Be the pioneer! Share your interview experience with juniors.</p>
            {isAuthenticated ? (
              <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
                Share Your Experience
              </button>
            ) : (
              <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
                Sign Up to Share Experience
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredPosts.map((post) => {
              const difficultyStyle = getDifficultyStyles(post.difficultyLevel);
              return (
                <div key={post._id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden group hover:transform hover:-translate-y-2">
                  <div className="p-10">
                    <div className="flex items-start justify-between mb-8">
                      {/* Company Logo & Title */}
                      <div className="flex items-start space-x-5">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-xl">{getCompanyInitials(post.companyName)}</span>
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                            {post.companyName}
                          </h3>
                          <p className="text-xl text-slate-700 font-semibold mt-1">{post.jobTitle}</p>
                          <p className="text-sm text-slate-500 mt-2 font-medium">{post.interviewType} • {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Difficulty Badge */}
                      <div className={`px-6 py-3 rounded-2xl border-2 ${difficultyStyle.bg} ${difficultyStyle.text} flex items-center space-x-3 ${difficultyStyle.shadow} shadow-lg`}>
                        <div className={`w-3 h-3 rounded-full ${difficultyStyle.dot}`}></div>
                        <span className="font-bold text-sm">{post.difficultyLevel}</span>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-8">
                      <h4 className="font-bold text-slate-800 mb-4 text-lg">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-3">
                        {(Array.isArray(post.topicsCovered) ? post.topicsCovered : [post.topicsCovered]).map((topic, index) => (
                          <span key={index} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-xl text-sm font-semibold border border-indigo-200 hover:shadow-md transition-shadow duration-200">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tips Preview */}
                    <div className="mb-8">
                      <h4 className="font-bold text-slate-800 mb-3 text-lg">Key Tips:</h4>
                      <p className="text-slate-700 line-clamp-2 text-base leading-relaxed">{post.tips}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-indigo-100">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-sm font-bold">{post.owner?.userName?.charAt(0).toUpperCase() || 'A'}</span>
                          </div>
                          <span className="text-sm text-slate-700 font-semibold">{post.owner?.userName || 'Anonymous'}</span>
                        </div>
                        {post.results && (
                          <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                            post.results === 'Selected' ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200' :
                            post.results === 'Rejected' ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200' :
                            'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {post.results === 'Selected' ? '✅ Selected' : 
                             post.results === 'Rejected' ? '❌ Not Selected' : '⏳ Waiting'}
                          </span>
                        )}
                      </div>
                      <button className="px-8 py-3 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-indigo-500 hover:to-purple-500 text-slate-700 hover:text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                        Read Full Experience →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default CampusConnectHomepage;