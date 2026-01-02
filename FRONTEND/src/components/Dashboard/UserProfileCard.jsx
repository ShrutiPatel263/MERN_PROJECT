import React from 'react';
import { LogOut } from 'lucide-react';

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

export default UserProfileCard;
