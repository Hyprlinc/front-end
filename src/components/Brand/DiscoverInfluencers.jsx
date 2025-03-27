import React, { useState, useEffect } from 'react';
import { getInfluencers } from '../../services/brands/EnlistInfluencers';
import {
  Search,
  Filter,
  Instagram,
  Youtube,
  TikTok,
  MapPin,
  Users,
  Heart,
  Star,
  ChevronDown,
  Plus,
  BarChart,
  Share2
} from 'lucide-react';

const DiscoverInfluencers = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followerRange, setFollowerRange] = useState([0, 1000000]);
  const [engagementRange, setEngagementRange] = useState([0, 10]);

  const platforms = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" /> },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" /> },
    { name: 'TikTok', icon: <Youtube className="w-5 h-5" /> }
  ];

  const niches = ['Fashion', 'Tech', 'Food', 'Travel', 'Lifestyle', 'Beauty', 'Gaming', 'Fitness'];

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const toggleNiche = (niche) => {
    if (selectedNiches.includes(niche)) {
      setSelectedNiches(selectedNiches.filter(n => n !== niche));
    } else {
      setSelectedNiches([...selectedNiches, niche]);
    }
  };

  const toggleInfluencerComparison = (influencerId) => {
    if (selectedForComparison.includes(influencerId)) {
      setSelectedForComparison(selectedForComparison.filter(id => id !== influencerId));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison([...selectedForComparison, influencerId]);
    }
  };

  const fetchInfluencers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('brandToken');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const filters = {
        platform: selectedPlatforms.length > 0 ? selectedPlatforms[0].toLowerCase() : null,
        niches: selectedNiches.length > 0 ? selectedNiches.join(',') : null,
        minFollowers: followerRange[0],
        maxFollowers: followerRange[1],
        minEngagement: engagementRange[0],
        maxEngagement: engagementRange[1]
      };

      const response = await getInfluencers(token, filters);
      if (response.success) {
        setInfluencers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch influencers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, [selectedPlatforms, selectedNiches, followerRange, engagementRange]);

  const handleFollowerRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFollowerRange([value, followerRange[1]]);
  };

  const handleMaxFollowerRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFollowerRange([followerRange[0], value]);
  };

  const handleEngagementRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setEngagementRange([value, engagementRange[1]]);
  };

  const handleMaxEngagementRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setEngagementRange([engagementRange[0], value]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-800">Discover Influencers</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setCompareMode(!compareMode)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                compareMode ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <BarChart className="w-5 h-5" />
              <span>Compare Mode</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Filters Sidebar */}
        <div className={`w-full md:w-64 bg-white border-r flex-shrink-0 ${isFilterExpanded ? '' : 'md:w-20'}`}>
          <div className="p-4">
            <button 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-4"
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-gray-600" />
                {isFilterExpanded && <span className="ml-2">Filters</span>}
              </div>
              <ChevronDown className={`w-5 h-5 transform ${isFilterExpanded ? '' : '-rotate-90'}`} />
            </button>

            {isFilterExpanded && (
              <div className="space-y-6">
                {/* Platform Filter */}
                <div>
                  <h3 className="font-medium mb-3">Platforms</h3>
                  <div className="space-y-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform.name}
                        onClick={() => togglePlatform(platform.name)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg ${
                          selectedPlatforms.includes(platform.name)
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        <div className="flex items-center">
                          {platform.icon}
                          <span className="ml-2">{platform.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Niche Filter */}
                <div>
                  <h3 className="font-medium mb-3">Niche</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {niches.map((niche) => (
                      <button
                        key={niche}
                        onClick={() => toggleNiche(niche)}
                        className={`p-2 rounded-lg text-sm ${
                          selectedNiches.includes(niche)
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Follower Range */}
                <div>
                  <h3 className="font-medium mb-3">Follower Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1000"
                      max="1000000"
                      value={followerRange[0]}
                      className="w-full"
                      onChange={handleFollowerRangeChange}
                    />
                    <input
                      type="range"
                      min="1000"
                      max="1000000"
                      value={followerRange[1]}
                      className="w-full"
                      onChange={handleMaxFollowerRangeChange}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{followerRange[0].toLocaleString()}K</span>
                      <span>{followerRange[1].toLocaleString()}K</span>
                    </div>
                  </div>
                </div>

                {/* Engagement Rate */}
                <div>
                  <h3 className="font-medium mb-3">Engagement Rate</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={engagementRange[0]}
                      className="w-full"
                      onChange={handleEngagementRangeChange}
                    />
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={engagementRange[1]}
                      className="w-full"
                      onChange={handleMaxEngagementRangeChange}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{engagementRange[0]}%</span>
                      <span>{engagementRange[1]}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search influencers by name, username, or location..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Influencer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div>Loading...</div>
            ) : (
              influencers.map((influencer) => (
                <div key={influencer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
                          alt={influencer.full_name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{influencer.full_name}</h3>
                          <p className="text-sm text-gray-500">{influencer.email}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {`${influencer.city}, ${influencer.country}`}
                          </div>
                        </div>
                      </div>
                      {compareMode && (
                        <button
                          onClick={() => toggleInfluencerComparison(influencer.id)}
                          className={`p-2 rounded-lg ${
                            selectedForComparison.includes(influencer.id)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Followers</p>
                        <p className="font-medium">
                          {influencer.primaryplatform.includes('youtube') 
                            ? influencer.subscribers_count_youtube 
                            : influencer.ig_followers_count}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Engagement</p>
                        <p className="font-medium">{influencer.eng_rate_ig}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Platform</p>
                        <p className="font-medium">{influencer.primaryplatform[0]}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        {influencer.niches}
                      </span>
                      {influencer.content_lang.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                          {lang}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button className="flex-1 mr-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        View Profile
                      </button>
                      <button className="py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverInfluencers;