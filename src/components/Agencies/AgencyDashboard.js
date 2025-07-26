import React, { useEffect, useState } from 'react';
import {
  Search, Bell, User, Home, Users, Briefcase, MessageSquare,
  FolderOpen, BarChart2, Settings, User2, Package
} from 'lucide-react';


import { useNavigate } from 'react-router-dom';
import DiscoverInfluencersInAgency from '../Agencies/DiscoverInfluencersInAgency'
import DiscoverCampaignsInAgency from './DiscoverCampaignsInAgency'
import Messages from './Messages';
import AgencyProfile from './AgencyProfile';
import Orders from './Orders';
import { useIsMobile } from '../hooks/use-mobile';
import { AgenciesMessagesProvider } from './Context/MessagesContext';
import AgencySidebar from './AgencySidebar';
import AgencyHeader from './AgencyHeader';


const DashboardLayout = () => {

  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState({});
  const isMobile = useIsMobile();

  // useEffect(() => {
  //   const token = localStorage.getItem('agency_token');
  //   setToken(token);
  //   if (!token) {
  //     window.location.href = "/";
  //   } else {
  //     getBrandsInfo(token)
  //       .then(response => {
  //         setUser(response);
  //       })
  //       .catch(console.error);
  //   }
  // }, []);

  // Close sidebar when switching to mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'discover-influencers', label: 'Discover Influencers', icon: Users },
    { id: 'discover-campaigns', label: 'Campaign Management', icon: Briefcase },
    { id: 'profile', label: 'Profile Management', icon: User2 },
    { id: 'campaigns', label: 'Campaigns', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AgencySidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AgencyHeader 
        toggleSidebar={toggleSidebar}
        // user={user}
      />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Content will be rendered based on activeSection */}
          <div className="max-w-7xl mx-auto">
            {activeSection === 'dashboard' && <DashboardHome />}
            {activeSection === 'profile' && <AgencyProfile/>}
            {activeSection === 'discover-influencers' && <DiscoverInfluencersInAgency />}
            {activeSection === 'discover-campaigns' &&  <DiscoverCampaignsInAgency/>}
            {activeSection === 'messages' && <AgenciesMessagesProvider> <Messages/>  </AgenciesMessagesProvider>}
            {activeSection === 'orders' && <Orders/>}
          </div>
        </main>
      </div>
    </div>
  );
};

// Dashboard Home Component
// const DashboardHome = () => {
//   const stats = [
//     { label: 'Active Campaigns', value: '12' },
//     { label: 'Influencers Collaborated', value: '45' },
//     { label: 'Brands Connected', value: '28' },
//     { label: 'Earnings This Month', value: '₹1,25,000' }
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
//             <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
//         <div className="space-y-4">
//           {/* Activity items will be mapped here */}
//           <div className="flex items-start space-x-3">
//             <div className="flex-1">
//               <p className="text-sm text-gray-600">
//                 New campaign application received from <span className="font-medium">Sarah Johnson</span>
//               </p>
//               <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const DashboardHome = () => {
  const stats = [
    { 
      label: 'Active Campaigns', 
      value: '12',
      icon: '📊',
      trend: 'up',
      change: '2 from last week'
    },
    { 
      label: 'Influencers Collaborated', 
      value: '45',
      icon: '👥',
      trend: 'up',
      change: '5 from last month'
    },
    { 
      label: 'Brands Connected', 
      value: '28',
      icon: '🏢',
      trend: 'steady',
      change: 'No change'
    },
    { 
      label: 'Earnings This Month', 
      value: '₹1,25,000',
      icon: '💰',
      trend: 'up',
      change: '₹15,000 from last month'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'application',
      message: 'New campaign application received from Sarah Johnson',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment of ₹25,000 received from Nike India',
      time: '5 hours ago',
      read: true
    },
    {
      id: 3,
      type: 'approval',
      message: 'Your campaign "Summer Collection" was approved',
      time: '1 day ago',
      read: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header with welcome message */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="mt-3 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          Create New Campaign
        </button>
      </div>

      {/* Quick Stats with cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-blue-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className={`mt-4 flex items-center text-sm ${
              stat.trend === 'up' ? 'text-green-500' : 
              stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
              <span className="ml-1">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity with better cards */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id} 
              className={`flex items-start p-4 rounded-lg transition-all duration-200 ${
                !activity.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`flex-shrink-0 mt-1 mr-3 ${
                activity.type === 'application' ? 'text-blue-500' :
                activity.type === 'payment' ? 'text-green-500' :
                'text-purple-500'
              }`}>
                {activity.type === 'application' ? '📩' : 
                 activity.type === 'payment' ? '💸' : '✅'}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${
                  !activity.read ? 'font-semibold text-gray-800' : 'text-gray-600'
                }`}>
                  {activity.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
              {!activity.read && (
                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional section for quick actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <span className="text-2xl mb-2">📋</span>
            <span className="text-sm font-medium">New Brief</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
            <span className="text-2xl mb-2">👥</span>
            <span className="text-sm font-medium">Find Influencers</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm font-medium">Reports</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
            <span className="text-2xl mb-2">⚙️</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default DashboardLayout;