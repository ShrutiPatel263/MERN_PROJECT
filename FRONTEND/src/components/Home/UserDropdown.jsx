import React, { useState, useEffect } from 'react';
import { LogOut, BookOpen, BarChart3 } from 'lucide-react';

const UserDropdown = ({ user, isOpen, onClose }) => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-4 w-72 bg-gradient-to-br from-slate-800/80 via-slate-800/75 to-slate-900/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-50 overflow-hidden">
      {/* User Profile Section */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500/40 to-purple-500/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-medium text-lg border border-white/10 shadow-lg">
            {user?.name?.charAt(0) || user?.userName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white/95 text-sm">{user?.name || 'User'}</p>
            <p className="text-xs text-white/50 truncate">@{user?.userName || 'user'}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-3 px-2">
        <button
          onClick={() => {
            window.location.href = '/createpost';
            onClose();
          }}
          className="w-full px-4 py-3 text-left text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
            <BookOpen size={16} className="text-blue-300" />
          </div>
          <span className="font-light tracking-wide">Share Experience</span>
        </button>
        <button
          onClick={() => {
            window.location.href = '/analysis';
            onClose();
          }}
          className="w-full px-4 py-3 text-left text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 flex items-center space-x-3 group mt-2"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 rounded-lg flex items-center justify-center transition-all duration-200">
            <BarChart3 size={16} className="text-purple-300" />
          </div>
          <span className="font-light tracking-wide">View Insights</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 mx-2"></div>

      {/* Logout Button */}
      <div className="py-3 px-2">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-left text-sm text-white/70 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
        >
          <div className="w-9 h-9 bg-red-500/10 group-hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-all duration-200">
            <LogOut size={16} className="text-red-400" />
          </div>
          <span className="font-light tracking-wide">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
