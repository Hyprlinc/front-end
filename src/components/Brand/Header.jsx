import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <img src="/logo.png" alt="HyprLinc Logo" className="h-8 mr-4" />
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search influencers, campaigns, or analytics..."
            className="ml-2 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="text-gray-700 cursor-pointer" />
        <User className="text-gray-700 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;