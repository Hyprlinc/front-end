import React from 'react';
import { 
  UserIcon, 
  CameraIcon, 
  BadgeCheckIcon, 
  TrendingUpIcon, 
  MailOpenIcon, 
  Sidebar
} from 'lucide-react';


import Navbar from '../Creators/comp/Navbar';
import SideBar from '../Creators/comp/SideBar';

const CreatorDashboardHome = ({ user, stats, campaigns, socialStats }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // If user is undefined, provide a default user object
  const defaultUser = {
    name: "Anushka",
    profilePicture: "https://avatar.iran.liara.run/public"
  };

  // Mock data - in a real application, these would come from props or context
  const profileCompletionPercentage = user.profileCompletionPercentage || 85;
  const performanceMetrics = stats || {
    ongoingCampaigns: 3,
    lastMonthEarnings: 1250,
    campaignsCompleted: 5
  };
  const socialMetrics = socialStats || {
    instagramFollowers: 5420,
    youtubeViews: 125000
  };
  const campaignInvitations = campaigns || [
    {
      id: 1,
      brandName: 'TechGear',
      type: 'Product Review',
      budgetRange: '$500 - $750',
      deadline: '2024-02-15'
    },
    {
      id: 2,
      brandName: 'Boat LifeStyle',
      type: 'Sponsored Content',
      budgetRange: '$350 - $500',
      deadline: '2024-02-20'
    },
    {
        id: 3,
        brandName: 'Rangraze.in',
        type: 'Sponsored Content',
        budgetRange: '$350 - $500',
        deadline: '2024-02-20'
      }
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Main content wrapper */}  
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : ''}`}>
        {/* Navbar */}
        <Navbar 
          user={user || defaultUser} 
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-[#4778EC] shadow-md rounded-[10px] p-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="font-poppins text-[20px] font-[400] text-white mb-2">
                    Hello Anushka, Welcome back 👋
                  </h2>
                  <p className="font-poppins text-[14px] font-[400] text-white">
                    We're excited to have you on board! Here's your personalized dashboard<br />
                    where you can track your collaborations, earnings, and engagement<br />
                    insights—all in one place.
                  </p>
                </div>
                <button className="h-[50px] w-[140px] bg-white text-[#4778EC] rounded-md font-poppins hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-4 gap-6">
              {/* Campaign Summary */}
              <div className="bg-indigo-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Campaign Summary
                  </h3>
                  <TrendingUpIcon className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Active</p>
                    <p className="font-bold text-indigo-600">{performanceMetrics.ongoingCampaigns}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Completed</p>
                    <p className="font-bold text-indigo-600">{performanceMetrics.campaignsCompleted}</p>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="bg-emerald-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Earnings
                  </h3>
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Monthly</p>
                  <p className="font-bold text-emerald-600">${performanceMetrics.lastMonthEarnings}</p>
                </div>
              </div>

              {/* Portfolio */}
              <div className="bg-amber-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Portfolio
                  </h3>
                  <CameraIcon className="w-6 h-6 text-amber-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Projects</p>
                    <p className="font-bold text-amber-600">12</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Views</p>
                    <p className="font-bold text-amber-600">1.2K</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-rose-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Pricing
                  </h3>
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Base Rate</p>
                    <p className="font-bold text-rose-600">$500</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Avg. Project</p>
                    <p className="font-bold text-rose-600">$1,200</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Sidebar */}
      <SideBar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
    </div>
  );
};

export default CreatorDashboardHome;