
import React, { useState } from 'react';
import { MessageSquare, Bell, ChevronDown, LogOut, Settings, User, HelpCircle } from 'lucide-react';
import defaultAvatar from '../../assets/images/avatar.jpg';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, onProfileMenuToggle }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("agency_token","agencyId");
      sessionStorage.clear();
      navigate("/agencyLogin");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-end">
        {/* Right side icons and profile button */}
        <div className="flex items-center gap-3">
          {/* Messages Button with Badge */}
          <div className="relative">
            <button 
              className="flex items-center justify-center h-10 w-10 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all relative"
              onClick={() => setUnreadMessages(0)}
            >
              <MessageSquare className="w-5 h-5 text-gray-600" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadMessages > 9 ? '9+' : unreadMessages}
                </span>
              )}
            </button>
          </div>

          {/* Notifications Button with Badge */}
          <div className="relative">
            <button 
              className="flex items-center justify-center h-10 w-10 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all relative"
              onClick={() => setUnreadNotifications(0)}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                onProfileMenuToggle();
                setShowDropdown(!showDropdown);
              }}
              className="flex items-center bg-gray-50 rounded-lg h-10 px-2 hover:bg-gray-100 transition-all"
            >
              <img 
                src={defaultAvatar} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-2 text-left hidden md:block">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                  {/* {user.agency_name || 'User Name'} */}
                </p>
                <p className="text-xs text-gray-500">Agency Account</p>
              </div>
              <ChevronDown className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${showDropdown ? 'transform rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user.agency_name || 'User Name'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || 'user@example.com'}
                  </p>
                </div>
                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4 mr-3 text-gray-500" />
                    Settings
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                    Help
                  </a>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-gray-500" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfileMenu;