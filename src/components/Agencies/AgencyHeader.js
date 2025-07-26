import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

const AgencyHeader = ({ toggleSidebar, user }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Mobile menu button */}
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="mr-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        {/* Search Bar */}
        <div className={`flex-1 ${isMobile ? 'ml-2' : 'max-w-2xl'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder={
                isMobile 
                  ? "Search..." 
                  : "Search influencers, campaigns, or brands..."
              }
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Right Side Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4 ml-2">
          <button 
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button
            onClick={() => navigate('/agencyProfile')}
            className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Profile"
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
              />
            ) : (
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            )}
            {!isMobile && (
              <span className="text-sm font-medium text-gray-700">
                {user?.name || 'Profile'}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AgencyHeader;