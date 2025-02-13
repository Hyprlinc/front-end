import React from 'react';
import { 
  UserIcon, 
  CameraIcon, 
  BadgeCheckIcon, 
  TrendingUpIcon, 
  MailOpenIcon 
} from 'lucide-react';

const CreatorDashboardHome = ({ user, stats, campaigns, socialStats }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-end">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center bg-gray-50 rounded-lg h-[48px] w-[160px] p-2 hover:bg-gray-100 transition-all"
            >
              <img 
                src={user.profilePicture || "https://avatar.iran.liara.run/public"} 
                alt="Profile" 
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-900">{user.name || "Anushka"}</p>
                <p className="text-xs text-gray-500">Influencer</p>
              </div>
            </button>
          </div>
        </nav>

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

      {/* Sidebar - Modified */}
      {isSidebarOpen && (
        <div className="h-screen w-80 bg-white shadow-xl fixed right-0 top-0 flex flex-col">
          <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Profile</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <img 
                src={user.profilePicture || "https://avatar.iran.liara.run/public"} 
                alt="Profile" 
                className="w-[100px] h-[100px] rounded-full mb-4"
              />
              <h3 className="text-lg font-medium text-blue-600">{user.name || "Anushka"}</h3>
              <p className="text-gray-500">@{user.username || "anushka"}</p>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between items-center px-4 py-4 bg-gray-50 rounded-lg mb-6">
              <div className="text-center">
                <p className="font-semibold">80</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">300</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">20</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboardHome;