// import { LayoutDashboard, Search, ClipboardList, BarChart, MessageCircle, Settings } from 'lucide-react';

// const Sidebar = () => {
//   const menuItems = [
//     { icon: <LayoutDashboard />, label: 'Dashboard' },
//     { icon: <Search />, label: 'Discover Influencers' },
//     { icon: <ClipboardList />, label: 'Campaigns' },
//     { icon: <BarChart />, label: 'Analytics' },
//     { icon: <MessageCircle />, label: 'Messages' },
//     { icon: <Settings />, label: 'Settings' },
//   ];

//   return (
//     <aside className="w-64 bg-white shadow-md p-4">
//       <nav>
//         <ul>
//           {menuItems.map((item, index) => (
//             <li key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
//               {item.icon}
//               <span>{item.label}</span>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;





// import React from "react";
// import logo from "../../assets/logo/logoForSidebar.png";
// import {
//   LayoutDashboard,
//   Users,
//   GitCompareArrows,
//   BarChart2,
//   MessageSquare,
//   Settings,
//   Package
// } from "lucide-react";

// const BrandSidebar = ({ 
//   isOpen, 
//   activeSection, 
//   setActiveSection, 
//   toggleSidebar
// }) => {
//   const handleItemClick = (section) => {
//     setActiveSection(section);
//     if (window.innerWidth < 768) {
//       toggleSidebar();
//     }
//   };

//   return (
//     <div
//       className={`fixed md:relative z-20 w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 p-6 flex flex-col text-white shadow-xl overflow-y-auto transition-transform duration-300 ${
//         isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//       }`}
//     >
//       {/* Close Button (Mobile Only) */}
//       <button 
//         onClick={toggleSidebar}
//         className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none"
//       >
//         <svg 
//           xmlns="http://www.w3.org/2000/svg" 
//           className="h-6 w-6" 
//           fill="none" 
//           viewBox="0 0 24 24" 
//           stroke="currentColor"
//         >
//           <path 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth={2} 
//             d="M6 18L18 6M6 6l12 12" 
//           />
//         </svg>
//       </button>

//       {/* Logo */}
//       <div className="mb-4 flex justify-center transition-transform hover:scale-105">
//         <img
//           src={logo}
//           alt="Logo"
//           className="w-28 filter drop-shadow-lg"
//         />
//       </div>

//       {/* Navigation Menu */}
//       <nav className="space-y-2 flex-1">
//         {[
//           { 
//             icon: <LayoutDashboard className="w-5 h-5" />, 
//             text: 'Dashboard',
//             id: 'dashboard'
//           },
//           { 
//             icon: <Users className="w-5 h-5" />, 
//             text: 'Discover Influencers',
//             id: 'discover-influencers'
//           },
//           { 
//             icon: <GitCompareArrows className="w-5 h-5" />, 
//             text: 'Campaigns',
//             id: 'campaigns'
//           },
//           { 
//             icon: <BarChart2 className="w-5 h-5" />, 
//             text: 'Analytics',
//             id: 'analytics'
//           },
//           { 
//             icon: <Users className="w-5 h-5" />, 
//             text: 'Discover Agencies',
//             id: 'discover-agencies'
//           },
//           { 
//             icon: <MessageSquare className="w-5 h-5" />, 
//             text: 'Messages',
//             id: 'messages'
//           },
//           { 
//             icon: <Settings className="w-5 h-5" />, 
//             text: 'Settings',
//             id: 'settings'
//           },
//           { 
//             icon: <Package className="w-5 h-5" />, 
//             text: 'Orders',
//             id: 'orders'
//           },
//         ].map((item) => (
//           <div
//             key={item.id}
//             className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
//               activeSection === item.id
//                 ? "bg-blue-600 shadow-md shadow-blue-500/20"
//                 : "hover:bg-gray-700 hover:translate-x-1"
//             }`}
//             onClick={() => handleItemClick(item.id)}
//           >
//             <div className={`w-6 h-6 flex items-center justify-center ${
//               activeSection === item.id ? 'text-white' : 'text-gray-300'
//             }`}>
//               {item.icon}
//             </div>
//             <span className="text-sm font-medium">{item.text}</span>
//             {activeSection === item.id && (
//               <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
//             )}
//           </div>
//         ))}
//       </nav>

//       {/* Bottom Section */}
//       <div className="mt-auto pt-4 border-t border-gray-700">
//         <div className="p-3 text-center text-sm text-gray-400">
//           Need help? <a href="#" className="text-blue-400 hover:underline">Contact Support</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandSidebar;



import React from "react";
import logo from "../../assets/logo/logoForSidebar.png";
import {
  LayoutDashboard,
  Users,
  GitCompareArrows,
  BarChart2,
  MessageSquare,
  Settings,
  Package,
  X
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const BrandSidebar = ({ 
  isOpen, 
  activeSection, 
  setActiveSection, 
  toggleSidebar
}) => {
  const isMobile = useIsMobile();

  const handleItemClick = (section) => {
    setActiveSection(section);
    if (isMobile) {
      toggleSidebar();
    }
  };

  const menuItems = [
    { 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      text: 'Dashboard',
      id: 'dashboard'
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      text: 'Discover Influencers',
      id: 'discover-influencers'
    },
    { 
      icon: <GitCompareArrows className="w-5 h-5" />, 
      text: 'Campaigns',
      id: 'campaigns'
    },
    { 
      icon: <BarChart2 className="w-5 h-5" />, 
      text: 'Analytics',
      id: 'analytics'
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      text: 'Discover Agencies',
      id: 'discover-agencies'
    },
    { 
      icon: <MessageSquare className="w-5 h-5" />, 
      text: 'Messages',
      id: 'messages'
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      text: 'Settings',
      id: 'settings'
    },
    { 
      icon: <Package className="w-5 h-5" />, 
      text: 'Orders',
      id: 'orders'
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 z-50 w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 p-6 flex flex-col text-white shadow-xl overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:relative`}
    >
      {/* Close Button (Mobile Only) */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Logo */}
      <div className="mb-8 flex justify-center transition-transform hover:scale-105">
        <img
          src={logo}
          alt="Logo"
          className="w-28 filter drop-shadow-lg"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              activeSection === item.id
                ? "bg-blue-600 shadow-md shadow-blue-500/20"
                : "hover:bg-gray-700 hover:translate-x-1"
            }`}
          >
            <div className={`w-6 h-6 flex items-center justify-center ${
              activeSection === item.id ? 'text-white' : 'text-gray-300'
            }`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.text}</span>
            {activeSection === item.id && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="p-3 text-center text-sm text-gray-400">
          Need help? <a href="#" className="text-blue-400 hover:underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default BrandSidebar;