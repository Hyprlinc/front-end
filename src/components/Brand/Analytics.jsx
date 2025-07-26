// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
// import { Filter, Calendar, Users, TrendingUp, MapPin, Clock } from 'lucide-react';

// const Analytics = () => {
//   // Sample data for charts
//   const campaignData = [
//     { name: 'Campaign A', reach: 4000, engagement: 2400, clicks: 2400, impressions: 3200, conversions: 800 },
//     { name: 'Campaign B', reach: 3000, engagement: 1398, clicks: 2210, impressions: 2800, conversions: 600 },
//     { name: 'Campaign C', reach: 2000, engagement: 9800, clicks: 2290, impressions: 2500, conversions: 400 },
//   ];

//   const influencerData = [
//     { name: 'Influencer X', engagementRate: 8.5, platform: 'Instagram' },
//     { name: 'Influencer Y', engagementRate: 7.2, platform: 'YouTube' },
//     { name: 'Influencer Z', engagementRate: 6.8, platform: 'TikTok' },
//   ];

//   const audienceDemographics = [
//     { name: '18-24', value: 40 },
//     { name: '25-34', value: 35 },
//     { name: '35-44', value: 20 },
//     { name: '45+', value: 5 },
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   // State for filters
//   const [filters, setFilters] = useState({
//     campaign: '',
//     influencer: '',
//     timePeriod: 'lastMonth',
//   });

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Analytics</h1>

//       {/* Filters */}
//       <div className="flex space-x-4 mb-6">
//         <div className="flex items-center bg-gray-100 rounded-lg p-2">
//           <Filter className="text-gray-500" />
//           <select
//             name="campaign"
//             value={filters.campaign}
//             onChange={handleFilterChange}
//             className="ml-2 bg-transparent outline-none"
//           >
//             <option value="">All Campaigns</option>
//             <option value="Campaign A">Campaign A</option>
//             <option value="Campaign B">Campaign B</option>
//             <option value="Campaign C">Campaign C</option>
//           </select>
//         </div>
//         <div className="flex items-center bg-gray-100 rounded-lg p-2">
//           <Users className="text-gray-500" />
//           <select
//             name="influencer"
//             value={filters.influencer}
//             onChange={handleFilterChange}
//             className="ml-2 bg-transparent outline-none"
//           >
//             <option value="">All Influencers</option>
//             <option value="Influencer X">Influencer X</option>
//             <option value="Influencer Y">Influencer Y</option>
//             <option value="Influencer Z">Influencer Z</option>
//           </select>
//         </div>
//         <div className="flex items-center bg-gray-100 rounded-lg p-2">
//           <Calendar className="text-gray-500" />
//           <select
//             name="timePeriod"
//             value={filters.timePeriod}
//             onChange={handleFilterChange}
//             className="ml-2 bg-transparent outline-none"
//           >
//             <option value="lastWeek">Last Week</option>
//             <option value="lastMonth">Last Month</option>
//             <option value="lastYear">Last Year</option>
//           </select>
//         </div>
//       </div>

//       {/* Campaign Metrics */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-bold mb-4 flex items-center">
//           <TrendingUp className="mr-2" /> Campaign Metrics
//         </h2>
//         <BarChart width={800} height={300} data={campaignData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="reach" fill="#8884d8" />
//           <Bar dataKey="engagement" fill="#82ca9d" />
//           <Bar dataKey="clicks" fill="#ffc658" />
//           <Bar dataKey="impressions" fill="#ff8042" />
//           <Bar dataKey="conversions" fill="#0088fe" />
//         </BarChart>
//       </div>

//       {/* Influencer Performance */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-bold mb-4 flex items-center">
//           <Users className="mr-2" /> Influencer Performance
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="font-bold mb-2">Engagement Rates</h3>
//             <BarChart width={400} height={200} data={influencerData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="engagementRate" fill="#0088fe" />
//             </BarChart>
//           </div>
//           <div>
//             <h3 className="font-bold mb-2">Best-Performing Influencers</h3>
//             <ul>
//               {influencerData.map((influencer, index) => (
//                 <li key={index} className="mb-2">
//                   <span className="font-bold">{influencer.name}</span> - {influencer.platform} (
//                   {influencer.engagementRate}%)
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Audience Insights */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4 flex items-center">
//           <MapPin className="mr-2" /> Audience Insights
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="font-bold mb-2">Demographics</h3>
//             <PieChart width={400} height={200}>
//               <Pie
//                 data={audienceDemographics}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {audienceDemographics.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </div>
//           <div>
//             <h3 className="font-bold mb-2">Time of Engagement</h3>
//             <div className="flex items-center space-x-2">
//               <Clock className="text-gray-500" />
//               <p>Peak audience activity at <span className="font-bold">6 PM</span></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;


import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Filter, Calendar, Users, TrendingUp, MapPin, Clock, ChevronDown, Download, MoreHorizontal } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const campaignData = [
    { name: 'Campaign A', reach: 4000, engagement: 2400, clicks: 2400, impressions: 3200, conversions: 800 },
    { name: 'Campaign B', reach: 3000, engagement: 1398, clicks: 2210, impressions: 2800, conversions: 600 },
    { name: 'Campaign C', reach: 2000, engagement: 9800, clicks: 2290, impressions: 2500, conversions: 400 },
  ];

  const influencerData = [
    { name: 'Influencer X', engagementRate: 8.5, platform: 'Instagram', followers: 125000 },
    { name: 'Influencer Y', engagementRate: 7.2, platform: 'YouTube', followers: 89000 },
    { name: 'Influencer Z', engagementRate: 6.8, platform: 'TikTok', followers: 215000 },
  ];

  const audienceDemographics = [
    { name: '18-24', value: 40 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 20 },
    { name: '45+', value: 5 },
  ];

  const engagementTimeData = [
    { hour: '12AM', engagement: 5 },
    { hour: '3AM', engagement: 2 },
    { hour: '6AM', engagement: 15 },
    { hour: '9AM', engagement: 30 },
    { hour: '12PM', engagement: 45 },
    { hour: '3PM', engagement: 60 },
    { hour: '6PM', engagement: 85 },
    { hour: '9PM', engagement: 65 },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];
  const PLATFORM_COLORS = {
    Instagram: '#E1306C',
    YouTube: '#FF0000',
    TikTok: '#000000'
  };

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
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Track and analyze your campaign performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-gray-400" />
            </div>
            <select
              name="campaign"
              value={filters.campaign}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="">All Campaigns</option>
              <option value="Campaign A">Campaign A</option>
              <option value="Campaign B">Campaign B</option>
              <option value="Campaign C">Campaign C</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="text-gray-400" />
            </div>
            <select
              name="influencer"
              value={filters.influencer}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="">All Influencers</option>
              <option value="Influencer X">Influencer X</option>
              <option value="Influencer Y">Influencer Y</option>
              <option value="Influencer Z">Influencer Z</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="text-gray-400" />
            </div>
            <select
              name="timePeriod"
              value={filters.timePeriod}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="lastYear">Last Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Total Reach", value: "9,400", change: "+12%", icon: <TrendingUp className="w-6 h-6 text-green-500" /> },
            { title: "Engagement", value: "13,798", change: "+8%", icon: <Users className="w-6 h-6 text-blue-500" /> },
            { title: "Conversions", value: "1,800", change: "+24%", icon: <MapPin className="w-6 h-6 text-purple-500" /> },
            { title: "ROI", value: "5.2x", change: "+1.3x", icon: <Filter className="w-6 h-6 text-yellow-500" /> }
          ].map((card, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  {card.icon}
                </div>
              </div>
              <p className={`text-sm mt-2 ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {card.change} from last period
              </p>
            </div>
          ))}
        </div>

        {/* Campaign Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <TrendingUp className="mr-2 text-indigo-600" /> Campaign Performance
            </h2>
            <div className="md:flex space-x-2">
              <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg mt-3 md:mt-0">Reach</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg mt-3 md:mt-0">Engagement</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg mt-3 md:mt-0">Conversions</button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar dataKey="reach" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="engagement" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="impressions" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Influencer Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Users className="mr-2 text-indigo-600" /> Influencer Engagement
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={influencerData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Engagement Rate"]}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  />
                  <Bar dataKey="engagementRate" radius={[0, 4, 4, 0]}>
                    {influencerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PLATFORM_COLORS[entry.platform]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Users className="mr-2 text-indigo-600" /> Top Influencers
            </h2>
            <div className="space-y-4">
              {influencerData.map((influencer, index) => (
                <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <span className="font-medium text-indigo-600">{influencer.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{influencer.name}</h3>
                    <p className="text-sm text-gray-500">{influencer.platform} • {influencer.followers.toLocaleString()} followers</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{influencer.engagementRate}%</p>
                    <p className="text-xs text-green-500">+{(Math.random() * 5).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audience Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <MapPin className="mr-2 text-indigo-600" /> Audience Demographics
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceDemographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {audienceDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Clock className="mr-2 text-indigo-600" /> Engagement Time
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  />
                  <Bar dataKey="engagement" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <p className="text-indigo-800 text-sm">
                <span className="font-bold">Peak engagement:</span> 6 PM - 9 PM with 85% of total engagement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;