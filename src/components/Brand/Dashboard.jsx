// import React, { useState, useEffect } from 'react';
// import {
//   Search,
//   Bell,
//   ChevronDown,
//   LayoutDashboard,
//   Users,
//   BarChart2,
//   MessageSquare,
//   Settings,
//   Menu,
//   X,
//   User,
//   LogOut,
//   GitCompareArrows,
//   Package
// } from 'lucide-react';

// import DiscoverInfluencers from './DiscoverInfluencers';
// import CampaignManagement from './CampaignManagement';
// import Analytics from './Analytics';
// import Messages from './Messages';
// import { getBrandsInfo } from '../../services/brands/BrandsInformation';
// import ProfileMenu from './ProfileMenu';
// import Orders from './Orders'
// import { getAgencies } from '../../services/brands/EnlistAgencies';
// import DiscoverAgencies from './DiscoverAgencies';
// import BrandSidebar from './SideBar';

// const Dashboard = () => {
//   const [token, setToken] = useState("");
//   const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('Dashboard');

//   const [user, setUser] = useState({
//     brands_id: '',
//     brands_name: '',
//     email: '',
//     country: '',
//     product_categories: [],
//     target_audience_age: '',
//     market_fit_capture: '',
//     turnover: '',
//     brands_description: '',
//     brands_website: '',
//     brands_social_media: []
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('brandToken');
//     setToken(token);
//     if (!token) {
//       window.location.href = "/";
//     } else {
//       // Update to handle the API response
//       getBrandsInfo(token)
//         .then(response => {
//           setUser(response);
//         })
//         .catch(error => {
//           console.error('Error fetching brand information:', error);
//         });
//     }
//   }, []);

//   const metrics = [
//     { label: 'Total Campaigns', value: '12 Campaigns Active' },
//     { label: 'Total Reach', value: '1.2M Audience Reached' },
//     { label: 'Total Engagement', value: '35K Likes & Comments' },
//     { label: 'Influencers', value: '56 Influencers Engaged' },
//   ];

//   const recentActivity = [
//     { text: 'John Doe applied for Campaign XYZ', time: '2h ago' },
//     { text: 'Content submitted for Campaign ABC', time: '4h ago' },
//     { text: '₹25,000 released for Campaign DEF', time: '6h ago' },
//   ];

//   const pendingTasks = [
//     'Approve deliverables for Campaign ABC',
//     'Finalize influencer selection for Campaign XYZ',
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       {/* <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h1 className="text-2xl font-bold text-blue-600">HyprLinc</h1>
//         </div>

//         <nav className="p-4 space-y-2">
//           {[
//             { icon: <LayoutDashboard />, text: 'Dashboard' },
//             { icon: <Users />, text: 'Discover Influencers' },
//             { icon: <GitCompareArrows />, text: 'Campaigns' },
//             { icon: <BarChart2 />, text: 'Analytics' },
//             { icon: <Users/>, text: 'Discover Agencies' },
//             { icon: <MessageSquare />, text: 'Messages' },
//             { icon: <Settings />, text: 'Settings' },
//             { icon: <Package />, text: 'Orders' },

//           ].map((item, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveSection(item.text)}
//               className={`flex items-center w-full px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 ${activeSection === item.text
//                 ? 'bg-blue-50 text-blue-600'
//                 : 'text-gray-600'
//                 }`}
//             >
//               {item.icon}
//               <span className="ml-3">{item.text}</span>
//             </button>
//           ))}
//         </nav>
//       </div> */}
//       <BrandSidebar/>

//       {/* Main Content */}
//       <div className="ml-64 flex-1">
//         {/* Header */}
//         <header className="fixed top-0 right-0 left-64 bg-white shadow-sm z-40">
//           <div className="flex items-center justify-between px-4 py-3">
//             <div className="flex items-center flex-1">
//               <div className="max-w-lg w-full">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search influencers, campaigns, or analytics..."
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   />
//                   <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="relative p-2 text-gray-400 hover:text-gray-600">
//                 <Bell className="w-6 h-6" />
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               <ProfileMenu user={user} onProfileMenuToggle={() => setProfileMenuOpen(!isProfileMenuOpen)} />
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="pt-24 p-6">
//         <div className={`flex-1 transition-all duration-300 ${isProfileMenuOpen ? 'mr-80' : ''}`}>
//           {activeSection === 'Dashboard' && (
//             <div className="grid gap-6">
//               {/* Metrics Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {metrics.map((metric, index) => (
//                   <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
//                     <h3 className="text-gray-500 text-sm font-medium">{metric.label}</h3>
//                     <p className="mt-2 text-2xl font-semibold text-gray-900">{metric.value}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Main Content Grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Recent Activity */}
//                 <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
//                   <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
//                   <div className="space-y-4">
//                     {recentActivity.map((activity, index) => (
//                       <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
//                         <p className="text-gray-600">{activity.text}</p>
//                         <span className="text-sm text-gray-400">{activity.time}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Pending Tasks */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                   <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
//                   <div className="space-y-4">
//                     {pendingTasks.map((task, index) => (
//                       <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
//                         <div className="flex-1">
//                           <p className="text-sm text-gray-600">{task}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeSection === 'Discover Influencers' && <DiscoverInfluencers />}

//           {activeSection === 'Campaigns' && <CampaignManagement />}

//           {activeSection === 'Analytics' && <Analytics />}

//           {activeSection === 'Discover Agencies' && <DiscoverAgencies/>}

//           {activeSection === 'Messages' && <Messages />}

//           {activeSection === 'Settings' && (
//             <div className="text-center p-8">
//               <h2 className="text-2xl font-semibold text-gray-700">Settings Section</h2>
//               <p className="text-gray-500 mt-2">Settings and configuration interface will be displayed here</p>
//             </div>
//           )}
//           {activeSection === 'Orders' && <Orders />}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import { Search, Bell, User, BarChart2, Users, GitCompareArrows, MessageSquare } from 'lucide-react';
import BrandSidebar from './SideBar';
import Header from './Header';
import { useIsMobile } from '../hooks/use-mobile';
import DiscoverInfluencers from './DiscoverInfluencers';
import CampaignManagement from './CampaignManagement';
import Analytics from './Analytics';
import Messages from './Messages';
import DiscoverAgencies from './DiscoverAgencies';
import Orders from './Orders';
import { getBrandsInfo } from '../../services/brands/BrandsInformation';

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const token = localStorage.getItem('brandToken');
    setToken(token);
    if (!token) {
      window.location.href = "/";
    } else {
      getBrandsInfo(token)
        .then(response => {
          setUser(response);
        })
        .catch(console.error);
    }
  }, []);

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

  const metrics = [
    { label: 'Total Campaigns', value: '12 Campaigns Active' },
    { label: 'Total Reach', value: '1.2M Audience Reached' },
    { label: 'Total Engagement', value: '35K Likes & Comments' },
    { label: 'Influencers', value: '56 Influencers Engaged' },
  ];

  const recentActivity = [
    { text: 'John Doe applied for Campaign XYZ', time: '2h ago' },
    { text: 'Content submitted for Campaign ABC', time: '4h ago' },
    { text: '₹25,000 released for Campaign DEF', time: '6h ago' },
  ];

  const pendingTasks = [
    'Approve deliverables for Campaign ABC',
    'Finalize influencer selection for Campaign XYZ',
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <BrandSidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 `}>
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          user={user}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg rounded-xl p-4 mb-6">
                <div className="items-center">
                  <h2 className="text-xl md:text-2xl font-medium text-white">
                    Welcome back, {user?.brandsName || "User"}👋
                  </h2>
                  <p className="text-white mt-2">Here's what's happening with your campaigns today.</p>
                </div>
              </div>

              {/* Metrics Grid - Minimalist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200 relative overflow-hidden"
                  >
                    {/* Accent bar */}
                    <div className={`absolute top-0 left-0 w-1 h-full ${index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-purple-500' :
                        index === 2 ? 'bg-green-500' : 'bg-amber-500'
                      }`}></div>

                    <div className="ml-3">
                      <h3 className="text-gray-500 text-sm font-medium">{metric.label}</h3>
                      <p className="mt-1 text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>

                    {/* Floating icon */}
                    <div className="absolute right-4 top-4 opacity-40">
                      {index === 0 ? <BarChart2 className="w-6 h-6" /> :
                        index === 1 ? <Users className="w-6 h-6" /> :
                          index === 2 ? <GitCompareArrows className="w-6 h-6" /> :
                            <MessageSquare className="w-6 h-6" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                  <div className="divide-y divide-gray-100">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="py-3 flex justify-between items-center">
                        <p className="text-gray-600">{activity.text}</p>
                        <span className="text-sm text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Tasks */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Tasks</h2>
                  <div className="space-y-3">
                    {pendingTasks.map((task, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-gray-700">{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'discover-influencers' && <DiscoverInfluencers />}
          {activeSection === 'campaigns' && <CampaignManagement />}
          {activeSection === 'analytics' && <Analytics />}
          {activeSection === 'discover-agencies' && <DiscoverAgencies />}
          {activeSection === 'messages' && <Messages />}
          {activeSection === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
              <p className="text-gray-600 mt-2">Configure your account settings here</p>
            </div>
          )}
          {activeSection === 'orders' && <Orders />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;