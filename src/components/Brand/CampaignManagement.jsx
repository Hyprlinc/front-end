import React, { useState } from 'react';
import {
  PlusCircle,
  Calendar,
  DollarSign,
  Users,
  BarChart2,
  Clock,
  ChevronRight,
  Instagram,
  Youtube,
  Videotape,
  Image,
  MessageSquare
} from 'lucide-react';

const CampaignManagement = () => {
  const [activeTab, setActiveTab] = useState('active');

  const campaigns = {
    active: [
      {
        id: 1,
        name: 'Summer Collection Launch',
        budget: '₹500,000',
        startDate: '2025-02-01',
        endDate: '2025-03-01',
        deliverables: [
          { type: 'Reel', count: 2, icon: <Videotape className="w-4 h-4" /> },
          { type: 'Story', count: 3, icon: <Image className="w-4 h-4" /> },
          { type: 'Post', count: 1, icon: <Instagram className="w-4 h-4" /> }
        ],
        influencers: [
          { name: 'Sarah Johnson', status: 'Content Submitted', avatar: 'https://avatar.iran.liara.run/public/66' },
          { name: 'Mike Chen', status: 'In Progress', avatar: 'https://avatar.iran.liara.run/public/100' }
        ],
        progress: 65,
        platform: 'Instagram'
      },
      {
        id: 2,
        name: 'Tech Product Review',
        budget: '₹750,000',
        startDate: '2025-02-15',
        endDate: '2025-03-15',
        deliverables: [
          { type: 'Video', count: 1, icon: <Youtube className="w-4 h-4" /> },
          { type: 'Story', count: 2, icon: <Image className="w-4 h-4" /> }
        ],
        influencers: [
          { name: 'Tech Reviews Pro', status: 'Approved', avatar: 'https://avatar.iran.liara.run/public/73' }
        ],
        progress: 30,
        platform: 'YouTube'
      }
    ],
    completed: [
      {
        id: 3,
        name: 'Winter Collection',
        budget: '₹600,000',
        metrics: {
          reach: '1.2M',
          engagement: '4.5%',
          roi: '2.8x'
        },
        platform: 'Instagram'
      }
    ],
    draft: [
      {
        id: 4,
        name: 'Spring Collection 2025',
        budget: '₹400,000',
        lastEdited: '2025-01-25',
        platform: 'Instagram'
      }
    ]
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderActiveCampaigns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {campaigns.active.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{campaign.name}</h3>
                <div className="flex items-center text-gray-500 mt-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{campaign.budget}</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {campaign.platform}
              </span>
            </div>

            <div className="space-y-4">
              {/* Dates */}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{campaign.startDate} - {campaign.endDate}</span>
              </div>

              {/* Deliverables */}
              <div className="flex flex-wrap gap-3">
                {campaign.deliverables.map((deliverable, idx) => (
                  <div key={idx} className="flex items-center bg-gray-50 px-3 py-1 rounded-full text-sm">
                    {deliverable.icon}
                    <span className="ml-2">{deliverable.count}x {deliverable.type}</span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${getProgressColor(campaign.progress)} h-2 rounded-full transition-all`}
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Influencers */}
              <div>
                <h4 className="text-sm font-medium mb-2">Assigned Influencers</h4>
                <div className="space-y-2">
                  {campaign.influencers.map((influencer, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2 text-sm">{influencer.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{influencer.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompletedCampaigns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {campaigns.completed.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold">{campaign.name}</h3>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              Completed
            </span>
          </div>
          
          <div className="text-gray-500 mb-4">
            <DollarSign className="inline w-4 h-4 mr-1" />
            {campaign.budget}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Reach</p>
              <p className="font-medium">{campaign.metrics.reach}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Engagement</p>
              <p className="font-medium">{campaign.metrics.engagement}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">ROI</p>
              <p className="font-medium">{campaign.metrics.roi}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDraftCampaigns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {campaigns.draft.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold">{campaign.name}</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              Draft
            </span>
          </div>
          
          <div className="flex items-center text-gray-500 mb-4">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{campaign.budget}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500 mt-4">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last edited: {campaign.lastEdited}</span>
          </div>

          <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            Continue Editing
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-800">Campaigns</h1>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Campaign
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mt-6">
          {[
            { id: 'active', label: 'Active Campaigns', count: campaigns.active.length },
            { id: 'completed', label: 'Completed', count: campaigns.completed.length },
            { id: 'draft', label: 'Drafts', count: campaigns.draft.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 relative ${
                activeTab === tab.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-2 text-sm text-gray-400">({tab.count})</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Content */}
      <div className="p-6">
        {activeTab === 'active' && renderActiveCampaigns()}
        {activeTab === 'completed' && renderCompletedCampaigns()}
        {activeTab === 'draft' && renderDraftCampaigns()}
      </div>
    </div>
  );
};

export default CampaignManagement;