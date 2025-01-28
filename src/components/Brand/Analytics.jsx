import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Filter, Calendar, Users, TrendingUp, MapPin, Clock } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const campaignData = [
    { name: 'Campaign A', reach: 4000, engagement: 2400, clicks: 2400, impressions: 3200, conversions: 800 },
    { name: 'Campaign B', reach: 3000, engagement: 1398, clicks: 2210, impressions: 2800, conversions: 600 },
    { name: 'Campaign C', reach: 2000, engagement: 9800, clicks: 2290, impressions: 2500, conversions: 400 },
  ];

  const influencerData = [
    { name: 'Influencer X', engagementRate: 8.5, platform: 'Instagram' },
    { name: 'Influencer Y', engagementRate: 7.2, platform: 'YouTube' },
    { name: 'Influencer Z', engagementRate: 6.8, platform: 'TikTok' },
  ];

  const audienceDemographics = [
    { name: '18-24', value: 40 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 20 },
    { name: '45+', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // State for filters
  const [filters, setFilters] = useState({
    campaign: '',
    influencer: '',
    timePeriod: 'lastMonth',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Filter className="text-gray-500" />
          <select
            name="campaign"
            value={filters.campaign}
            onChange={handleFilterChange}
            className="ml-2 bg-transparent outline-none"
          >
            <option value="">All Campaigns</option>
            <option value="Campaign A">Campaign A</option>
            <option value="Campaign B">Campaign B</option>
            <option value="Campaign C">Campaign C</option>
          </select>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Users className="text-gray-500" />
          <select
            name="influencer"
            value={filters.influencer}
            onChange={handleFilterChange}
            className="ml-2 bg-transparent outline-none"
          >
            <option value="">All Influencers</option>
            <option value="Influencer X">Influencer X</option>
            <option value="Influencer Y">Influencer Y</option>
            <option value="Influencer Z">Influencer Z</option>
          </select>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <Calendar className="text-gray-500" />
          <select
            name="timePeriod"
            value={filters.timePeriod}
            onChange={handleFilterChange}
            className="ml-2 bg-transparent outline-none"
          >
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
      </div>

      {/* Campaign Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2" /> Campaign Metrics
        </h2>
        <BarChart width={800} height={300} data={campaignData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reach" fill="#8884d8" />
          <Bar dataKey="engagement" fill="#82ca9d" />
          <Bar dataKey="clicks" fill="#ffc658" />
          <Bar dataKey="impressions" fill="#ff8042" />
          <Bar dataKey="conversions" fill="#0088fe" />
        </BarChart>
      </div>

      {/* Influencer Performance */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Users className="mr-2" /> Influencer Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Engagement Rates</h3>
            <BarChart width={400} height={200} data={influencerData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="engagementRate" fill="#0088fe" />
            </BarChart>
          </div>
          <div>
            <h3 className="font-bold mb-2">Best-Performing Influencers</h3>
            <ul>
              {influencerData.map((influencer, index) => (
                <li key={index} className="mb-2">
                  <span className="font-bold">{influencer.name}</span> - {influencer.platform} (
                  {influencer.engagementRate}%)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Audience Insights */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <MapPin className="mr-2" /> Audience Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Demographics</h3>
            <PieChart width={400} height={200}>
              <Pie
                data={audienceDemographics}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {audienceDemographics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div>
            <h3 className="font-bold mb-2">Time of Engagement</h3>
            <div className="flex items-center space-x-2">
              <Clock className="text-gray-500" />
              <p>Peak audience activity at <span className="font-bold">6 PM</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;