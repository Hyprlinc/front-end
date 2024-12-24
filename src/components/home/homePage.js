import React from 'react';
import { 
  UserIcon, 
  CameraIcon, 
  BadgeCheckIcon, 
  TrendingUpIcon, 
  MailOpenIcon 
} from 'lucide-react';

const CreatorDashboardHome = ({ user, stats, campaigns, socialStats }) => {
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
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {user.name}!
              </h2>
              <div className="flex items-center text-gray-600">
                <UserIcon className="w-5 h-5 mr-2" />
                <p>
                  Your profile is {profileCompletionPercentage}% complete. 
                  <span className="text-blue-600 ml-2 cursor-pointer hover:underline">
                    Update now
                  </span>
                </p>
              </div>
            </div>
            <BadgeCheckIcon className="w-12 h-12 text-green-500" />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Campaign Invitations */}
          <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Campaign Invitations
              </h3>
              <MailOpenIcon className="w-6 h-6 text-gray-500" />
            </div>
            {campaignInvitations.map((campaign) => (
              <div 
                key={campaign.id} 
                className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-gray-200 transition-colors"
              >
                <div>
                  <h4 className="font-bold text-gray-800">{campaign.brandName}</h4>
                  <p className="text-gray-600">{campaign.type}</p>
                  <p className="text-sm text-gray-500">
                    Budget: {campaign.budgetRange} | Deadline: {campaign.deadline}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors">
                    View Details
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Performance Metrics
              </h3>
              <TrendingUpIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold text-gray-700">Campaigns</h4>
                <div className="flex justify-between">
                  <p>Ongoing</p>
                  <p className="font-bold">{performanceMetrics.ongoingCampaigns}</p>
                </div>
                <div className="flex justify-between">
                  <p>Completed Last Month</p>
                  <p className="font-bold">{performanceMetrics.campaignsCompleted}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold text-gray-700">Earnings</h4>
                <div className="flex justify-between">
                  <p>Last Month</p>
                  <p className="font-bold">${performanceMetrics.lastMonthEarnings}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold text-gray-700">Social Reach</h4>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <CameraIcon className="w-4 h-4 mr-2 text-pink-500" />
                    <p>Instagram Followers</p>
                  </div>
                  <p className="font-bold">{socialMetrics.instagramFollowers}</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <svg fill="red" className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                    </svg>
                    <p>YouTube Views</p>
                  </div>
                  <p className="font-bold">{socialMetrics.youtubeViews.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardHome;