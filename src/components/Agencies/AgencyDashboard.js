import React, { useState } from 'react';
import {
  Search, Bell, User, Home, Users, Briefcase, MessageSquare,
  FolderOpen, BarChart2, Settings, User2
} from 'lucide-react';


import { useNavigate } from 'react-router-dom';
import DiscoverInfluencersInAgency from '../Agencies/DiscoverInfluencersInAgency'
import DiscoverCampaignsInAgency from './DiscoverCampaignsInAgency'

import Messages from './Messages';

import AgencyProfile from './AgencyProfile';
import { AgenciesMessagesProvider } from './Context/MessagesContext';


const DashboardLayout = () => {

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'discover-influencers', label: 'Discover Influencers', icon: Users },
    { id: 'discover-campaigns', label: 'Campaign Management', icon: Briefcase },
    { id: 'profile', label: 'Profile Management', icon: User2 },
    { id: 'campaigns', label: 'Campaigns', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">HyprLinc</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                  ${activeSection === item.id ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search influencers, campaigns, or brands..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => navigate('/agencyProfile')}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Profile</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Content will be rendered based on activeSection */}
          <div className="max-w-7xl mx-auto">
            {activeSection === 'dashboard' && <DashboardHome />}
            {/* Other sections will be added here */}
            {activeSection === 'profile' && <AgencyProfile/>}
            {activeSection === 'discover-influencers' && <DiscoverInfluencersInAgency />}

            {activeSection === 'discover-campaigns' &&  <DiscoverCampaignsInAgency/>}
            {activeSection === 'messages' && <AgenciesMessagesProvider> <Messages/>  </AgenciesMessagesProvider>}

            

          </div>
        </main>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = () => {
  const stats = [
    { label: 'Active Campaigns', value: '12' },
    { label: 'Influencers Collaborated', value: '45' },
    { label: 'Brands Connected', value: '28' },
    { label: 'Earnings This Month', value: '₹1,25,000' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* Activity items will be mapped here */}
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                New campaign application received from <span className="font-medium">Sarah Johnson</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;