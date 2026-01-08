import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, Building2, Briefcase, Target, Calendar, Award, BookOpen, BarChart3, PieChart as PieChartIcon, Home } from 'lucide-react';
import GraduationCapLogo from '../components/Common/GraduationCapLogo';
import AnimatedBackground from '../components/Common/AnimatedBackground';
import { API_ENDPOINTS } from '../config/api';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#84cc16'];

const AnalysisPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isAuth = !!token;
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      try {
        if (token.includes('.') && token.split('.').length === 3) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({
            name: payload.name || 'User',
            userName: payload.userName || 'user',
            branch: payload.branch || 'CSE'
          });
        }
      } catch (error) {
        setUser({
          name: 'User',
          userName: 'user',
          branch: 'CSE'
        });
      }
    }
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.ALL_POSTS);
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setPosts(data.data);
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

  // Analyze data
  const analyzeData = () => {
    if (posts.length === 0) return null;

    // Most frequent companies
    const companyCount = {};
    posts.forEach(post => {
      companyCount[post.companyName] = (companyCount[post.companyName] || 0) + 1;
    });
    const topCompanies = Object.entries(companyCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Most frequent roles
    const roleCount = {};
    posts.forEach(post => {
      roleCount[post.jobTitle] = (roleCount[post.jobTitle] || 0) + 1;
    });
    const topRoles = Object.entries(roleCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Difficulty distribution
    const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
    posts.forEach(post => {
      if (difficultyCount.hasOwnProperty(post.difficultyLevel)) {
        difficultyCount[post.difficultyLevel]++;
      }
    });
    const difficultyData = Object.entries(difficultyCount)
      .map(([name, value]) => ({ name, value }));

    // Interview type distribution
    const interviewTypeCount = {};
    posts.forEach(post => {
      interviewTypeCount[post.interviewType] = (interviewTypeCount[post.interviewType] || 0) + 1;
    });
    const interviewTypeData = Object.entries(interviewTypeCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Results distribution
    const resultsCount = {};
    posts.forEach(post => {
      if (post.results) {
        resultsCount[post.results] = (resultsCount[post.results] || 0) + 1;
      }
    });
    const resultsData = Object.entries(resultsCount)
      .map(([name, value]) => ({ name, value }));

    // Most common topics
    const topicCount = {};
    posts.forEach(post => {
      if (post.topicsCovered && Array.isArray(post.topicsCovered)) {
        post.topicsCovered.forEach(topic => {
          topicCount[topic] = (topicCount[topic] || 0) + 1;
        });
      }
    });
    const topTopics = Object.entries(topicCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Timeline data (interviews by month)
    const timelineCount = {};
    posts.forEach(post => {
      if (post.date) {
        const date = new Date(post.date);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        timelineCount[monthYear] = (timelineCount[monthYear] || 0) + 1;
      }
    });
    const timelineData = Object.entries(timelineCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        const dateA = new Date(a.name);
        const dateB = new Date(b.name);
        return dateA - dateB;
      });

    // Success rate by company
    const companyResults = {};
    posts.forEach(post => {
      if (!companyResults[post.companyName]) {
        companyResults[post.companyName] = { total: 0, selected: 0 };
      }
      companyResults[post.companyName].total++;
      if (post.results === 'Selected') {
        companyResults[post.companyName].selected++;
      }
    });
    const successRateByCompany = Object.entries(companyResults)
      .filter(([_, data]) => data.total >= 2) // Only companies with 2+ interviews
      .map(([name, data]) => ({
        name,
        successRate: ((data.selected / data.total) * 100).toFixed(1),
        total: data.total
      }))
      .sort((a, b) => parseFloat(b.successRate) - parseFloat(a.successRate))
      .slice(0, 8);

    // Success rate by difficulty
    const difficultyResults = {};
    posts.forEach(post => {
      if (!difficultyResults[post.difficultyLevel]) {
        difficultyResults[post.difficultyLevel] = { total: 0, selected: 0 };
      }
      difficultyResults[post.difficultyLevel].total++;
      if (post.results === 'Selected') {
        difficultyResults[post.difficultyLevel].selected++;
      }
    });
    const successRateByDifficulty = Object.entries(difficultyResults)
      .map(([name, data]) => ({
        name,
        successRate: ((data.selected / data.total) * 100).toFixed(1),
        total: data.total
      }));

    // Company vs Difficulty matrix
    const companyDifficultyMatrix = {};
    posts.forEach(post => {
      const key = `${post.companyName}_${post.difficultyLevel}`;
      companyDifficultyMatrix[key] = (companyDifficultyMatrix[key] || 0) + 1;
    });

    return {
      topCompanies,
      topRoles,
      difficultyData,
      interviewTypeData,
      resultsData,
      topTopics,
      timelineData,
      successRateByCompany,
      successRateByDifficulty
    };
  };

  const insights = analyzeData();

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                  <GraduationCapLogo size={32} />
                </div>
                <span className="text-2xl font-light tracking-wide text-white">CampusBridge</span>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300"
              >
                <Home size={16} />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                  <GraduationCapLogo size={32} />
                </div>
                <span className="text-2xl font-light tracking-wide text-white">CampusBridge</span>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300"
              >
                <Home size={16} />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl">
            <h3 className="font-semibold mb-2">Unable to load analysis</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!insights || posts.length === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                  <GraduationCapLogo size={32} />
                </div>
                <span className="text-2xl font-light tracking-wide text-white">CampusBridge</span>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300"
              >
                <Home size={16} />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-xl">
            <h3 className="font-semibold mb-2">No data available</h3>
            <p>There are no placement experiences to analyze yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Simple Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <GraduationCapLogo size={32} />
              </div>
              <span className="text-2xl font-light tracking-wide text-white">CampusBridge</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-300"
              >
                <Home size={16} />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <BarChart3 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Placement Insights</h1>
              <p className="text-white/70 mt-1">Data-driven analysis to help you prepare better</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-blue-400" size={16} />
              <span>Total Experiences: <strong>{posts.length}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="text-purple-400" size={16} />
              <span>Unique Companies: <strong>{insights.topCompanies.length}</strong></span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Most Frequent Companies */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="text-blue-400" size={20} />
              <h2 className="text-xl font-bold text-white">Top Companies</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={insights.topCompanies}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                />
                <YAxis tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Most Frequent Roles */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="text-purple-400" size={20} />
              <h2 className="text-xl font-bold text-white">Top Job Roles</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={insights.topRoles}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                />
                <YAxis tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Difficulty Distribution */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="text-amber-400" size={20} />
              <h2 className="text-xl font-bold text-white">Difficulty Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={insights.difficultyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {insights.difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Interview Type Distribution */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="text-green-400" size={20} />
              <h2 className="text-xl font-bold text-white">Interview Types</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={insights.interviewTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {insights.interviewTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Results Distribution */}
          {insights.resultsData.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="text-indigo-400" size={20} />
                <h2 className="text-xl font-bold text-white">Selection Results</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={insights.resultsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {insights.resultsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Most Common Topics */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="text-pink-400" size={20} />
              <h2 className="text-xl font-bold text-white">Most Covered Topics</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={insights.topTopics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }} />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#ec4899" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Full Width Charts */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Timeline */}
          {insights.timelineData.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-cyan-400" size={20} />
                <h2 className="text-xl font-bold text-white">Interview Timeline</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={insights.timelineData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Success Rate by Company */}
          {insights.successRateByCompany.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-emerald-400" size={20} />
                <h2 className="text-xl font-bold text-white">Success Rate by Company</h2>
                <span className="text-sm text-gray-500">(Companies with 2+ interviews)</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={insights.successRateByCompany}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                    label={{ value: 'Success Rate (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value}%`, 'Success Rate']}
                  />
                  <Bar dataKey="successRate" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Success Rate by Difficulty */}
          {insights.successRateByDifficulty.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="text-orange-400" size={20} />
                <h2 className="text-xl font-bold text-white">Success Rate by Difficulty Level</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={insights.successRateByDifficulty}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                    label={{ value: 'Success Rate (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value}%`, 'Success Rate']}
                  />
                  <Bar dataKey="successRate" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;

