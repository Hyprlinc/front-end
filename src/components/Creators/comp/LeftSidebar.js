import React from "react";
import logo from "../../../assets/logo.png";
import homeIcon from "../../../assets/icons/Home.png";
import homeActive from "../../../assets/icons/homeblue.png";
import profileManagemnt from "../../../assets/icons/profile_management.png";
import profileManagementActive from "../../../assets/icons/profileblue.png";
import collabsIcon from "../../../assets/icons/collaborations.png";
import collabsActive from "../../../assets/icons/collabotationsblue.png";
import earnings from "../../../assets/icons/earnings.png";
import earningsActive from "../../../assets/icons/earningsblue.png";
import portfolioIcon from "../../../assets/icons/portfolio.png";
import portfolioActive from "../../../assets/icons/portfolioblue.png";
import settingsIcon from "../../../assets/icons/settings.png";
import settingsActive from "../../../assets/icons/settingsblue.png";
import supportIcon from "../../../assets/icons/support.png";
import supportActive from "../../../assets/icons/supportblue.png";

const LeftSidebar = ({ 
  isOpen, 
  activeSection, 
  setActiveSection, 
  isAvailable, 
  setIsAvailable,
  toggleSidebar
}) => {
  const handleItemClick = (itemId) => {
    setActiveSection(itemId);
    // Close sidebar on mobile when a menu item is clicked
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`fixed md:relative z-20 w-72 h-full bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 p-6 flex flex-col text-white shadow-xl overflow-y-auto transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Close Button (Mobile Only) */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>

      {/* Logo */}
      <div className="mb-4 flex justify-center transition-transform hover:scale-105">
        <img
          style={{ height: "5rem", width: "auto" }}
          src={logo}
          alt="Logo"
          className="h-12 w-auto filter drop-shadow-lg"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 flex-1">
        {[
          {
            id: "home",
            icon: homeIcon,
            activeIcon: homeActive,
            label: "Home",
          },
          {
            id: "profile-mngm",
            icon: profileManagemnt,
            activeIcon: profileManagementActive,
            label: "Profile Management",
          },
          {
            id: "collabs",
            icon: collabsIcon,
            activeIcon: collabsActive,
            label: "Collaborations",
          },
          {
            id: "earnings",
            icon: earnings,
            activeIcon: earningsActive,
            label: "Earnings",
          },
          {
            id: "portfolio",
            icon: portfolioIcon,
            activeIcon: portfolioActive,
            label: "Portfolio",
          },
          {
            id: "settings",
            icon: settingsIcon,
            activeIcon: settingsActive,
            label: "Settings",
          },
          {
            id: "support",
            icon: supportIcon,
            activeIcon: supportActive,
            label: "Support",
          },
        ].map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              activeSection === item.id
                ? "bg-blue-600 shadow-md shadow-blue-500/20"
                : "hover:bg-gray-700 hover:translate-x-1"
            }`}
            onClick={() => handleItemClick(item.id)}
          >
            <div className={`w-6 h-6 flex items-center justify-center ${
              activeSection === item.id ? 'filter brightness-0 invert' : ''
            }`}>
              <img
                src={activeSection === item.id ? item.activeIcon : item.icon}
                alt={item.label}
                className="w-5 h-5"
              />
            </div>
            <span className="text-sm font-medium">{item.label}</span>
            {activeSection === item.id && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-6 space-y-4">
        {/* Availability Toggle */}
        <div className="relative">
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isAvailable ? "bg-green-500/20" : "bg-red-500/20"
          }`}></div>
          <button
            className={`relative w-full py-2 px-4 rounded-full font-semibold text-sm flex items-center justify-center space-x-2 transition-all ${
              isAvailable
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } shadow-md ${
              isAvailable ? "shadow-green-500/30" : "shadow-red-500/30"
            }`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            <div className={`w-2 h-2 rounded-full ${
              isAvailable ? "bg-green-300" : "bg-red-300"
            }`}></div>
            <span>{isAvailable ? "Available for Collab" : "Unavailable"}</span>
          </button>
        </div>

        {/* Facebook Login Button */}
        <button
          onClick={() => window.location.href = "http://localhost:5000/api/v1/fbAuth/auth/facebook"}
          className="w-full flex items-center justify-center space-x-2 bg-[#1877F2] hover:bg-[#166FE5] text-white py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-sm font-medium">Login with Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;