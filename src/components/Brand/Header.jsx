import { Search, Bell, Menu } from 'lucide-react';
import ProfileMenu from './ProfileMenu'; 

const Header = ({ toggleSidebar, user }) => { 
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-white shadow-sm">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search influencers, campaigns, or analytics..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Replace User Controls with ProfileMenu */}
      <ProfileMenu 
        user={user}
        onProfileMenuToggle={() => console.log('Profile menu toggled')}
      />
    </header>
  );
};

export default Header;