import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

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

export default SearchFilterBar;
