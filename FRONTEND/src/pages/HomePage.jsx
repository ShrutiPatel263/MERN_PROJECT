import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Home/Header';
import SearchFilterBar from '../components/Home/SearchFilterBar';
import HomePostCard from '../components/Home/HomePostCard';

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
        <div id="posts" className="mb-8 px-4">
          <h2 className="text-3xl font-light text-gray-800 mb-2">
            Placement Stories
          </h2>
          <p className="text-gray-600">
            {filteredPosts.length} experience{filteredPosts.length !== 1 ? 's' : ''} shared by your seniors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
          {filteredPosts.map(post => (
            <HomePostCard key={post._id} post={post} />
          ))}
        </div>

        {/* About Section (target for Learn More / About nav) */}
        <div id="about" className="mt-16 px-4 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-8 border border-gray-100 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">About CampusBridge</h3>
            <p className="text-gray-600">CampusBridge is a community-driven platform where seniors share placement experiences, interview tips, and real-world insights to help the next generation succeed. Browse placement stories, filter by company or difficulty, and learn from peers who've been there.</p>
          </div>
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