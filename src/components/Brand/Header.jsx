// import { Search, Bell, User } from 'lucide-react';

// const Header = () => {
//   return (
//     <header className="flex justify-between items-center p-4 bg-white shadow-md">
//       <div className="flex items-center">
//         <img src="/logo.png" alt="HyprLinc Logo" className="h-8 mr-4" />
//         <div className="flex items-center bg-gray-100 rounded-lg p-2">
//           <Search className="text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search influencers, campaigns, or analytics..."
//             className="ml-2 bg-transparent outline-none"
//           />
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <Bell className="text-gray-700 cursor-pointer" />
//         <User className="text-gray-700 cursor-pointer" />
//       </div>
//     </header>
//   );
// };

// export default Header;


// import { Search, Bell, User, Menu } from 'lucide-react';

// const Header = ({ toggleSidebar }) => {
//   return (
//     <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-white shadow-sm">
//       {/* Mobile Menu Button */}
//       <button 
//         onClick={toggleSidebar}
//         className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
//       >
//         <Menu className="h-6 w-6" />
//       </button>

//       {/* Search Bar - Hidden on mobile */}
//       <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
//         <div className="relative w-full">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search influencers, campaigns, or analytics..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       {/* User Controls */}
//       <div className="flex items-center space-x-4">
//         <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
//           <Bell className="h-6 w-6" />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//         </button>
        
//         <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
//           <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
//             <User className="h-5 w-5 text-gray-600" />
//           </div>
//         </button>
        
//       </div>
//     </header>
//   );
// };

// export default Header;



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