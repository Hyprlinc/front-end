import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Search, 
  Settings, 
  BarChart3, 
  Calendar, 
  FileText, 
  CreditCard, 
  HelpCircle, 
  PieChart, 
  Award, 
  AlertTriangle,
  Home,
  UserSearch,
  MessageCircle,
  
  BarChart2,
  Wallet,
  AlertOctagon 
} from 'lucide-react';
import DiscoverInfluencers from './Brand/DiscoverInfluencers';

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomeContent />;
      case 'find':
        return <DiscoverInfluencers />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Harsh!</h1>
          <p className="text-gray-500">Here's what's happening with your campaigns</p>
        </div>
        <div className="flex gap-4">
          <Bell className="w-6 h-6 cursor-pointer" />
          <MessageSquare className="w-6 h-6 cursor-pointer" />
          <Settings className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Campaigns</p>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-green-500">↑ 12% this month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Influencers</p>
              <p className="text-2xl font-bold">48</p>
              <p className="text-xs text-green-500">↑ 8% this month</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Spend</p>
              <p className="text-2xl font-bold">$45.2K</p>
              <p className="text-xs text-gray-500">of $60K budget</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. ROI</p>
              <p className="text-2xl font-bold">3.2x</p>
              <p className="text-xs text-green-500">↑ 15% this month</p>
            </div>
            <PieChart className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Pending Actions</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <p>3 contracts awaiting your signature</p>
          </div>
          <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <p>5 unread messages from influencers</p>
          </div>
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded">
            <Award className="w-4 h-4 text-green-500" />
            <p>2 campaigns ready for review</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 border-b">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'find', label: 'Find Influencers', icon: UserSearch },
            { id: 'campaigns', label: 'Campaigns', icon: BarChart2 },
            { id: 'messages', label: 'Messages', icon: MessageCircle },
        
            { id: 'reports', label: 'Reports', icon: BarChart3 },
            { id: 'payments', label: 'Payments', icon: Wallet },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'help', label: 'Help', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

const HomeContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Performance Overview */}
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Campaign Performance</h3>
      </div>
      <div className="p-4">
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          [Performance Chart Placeholder]
        </div>
      </div>
    </div>

    {/* Trending Influencers */}
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Recommended Influencers</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-2 border rounded">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <h3 className="font-semibold">Sarah Johnson</h3>
              <p className="text-sm text-gray-500">Fashion & Lifestyle • 120K Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Campaigns */}
    <div className="col-span-2 bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Recent Campaigns</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded">
            <div>
              <h3 className="font-semibold">Summer Collection Launch</h3>
              <p className="text-sm text-gray-500">8 influencers • 2.4M reach</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FindInfluencersContent = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Find Perfect Influencers</h3>
      </div>
      <div className="p-4">
        {/* Advanced Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search influencers..." 
            className="w-full p-2 border rounded"
          />
          <select className="p-2 border rounded">
            <option>All Platforms</option>
            <option>Instagram</option>
            <option>YouTube</option>
            <option>TikTok</option>
          </select>
          <select className="p-2 border rounded">
            <option>All Categories</option>
            <option>Fashion</option>
            <option>Beauty</option>
            <option>Lifestyle</option>
          </select>
        </div>

        {/* Additional Filters */}
        <div className="flex gap-4 mb-6">
          <select className="p-2 border rounded">
            <option>Follower Range</option>
            <option>1K - 10K</option>
            <option>10K - 50K</option>
            <option>50K+</option>
          </select>
          <select className="p-2 border rounded">
            <option>Region</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
          <select className="p-2 border rounded">
            <option>Engagement Rate</option>
            <option>High (&gt;5%)</option>
            <option>Medium (2-5%)</option>
            <option>Low (&lt;2%)</option>
          </select>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Influencer cards would go here */}
        </div>
      </div>
    </div>
  </div>
);

export default BrandDashboard;