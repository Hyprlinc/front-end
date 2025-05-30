import React, { useState, useEffect } from 'react';
import { getInfluencers } from '../../services/brands/EnlistInfluencers';
import OrderManagement from '../../services/brands/OrderManagement';
import { toast } from 'react-hot-toast';
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
  Share2,
  X,
  Mail,
  User,
  Clock,
  Check,
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
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

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

  const handleViewProfile = (influencer) => {
    setSelectedInfluencer(influencer);
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
                      <button 
                        onClick={() => handleViewProfile(influencer)}
                        className="flex-1 mr-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
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
      {selectedInfluencer && (
        <InfluencerModal
          influencer={selectedInfluencer}
          onClose={() => setSelectedInfluencer(null)}
        />
      )}
    </div>
  );
};

export default DiscoverInfluencers;



const InfluencerModal = ({ influencer, onClose }) => {
  const [loadingPackageId, setLoadingPackageId] = useState(null);
  console.log("This is the object of Influencer",influencer)

  const handleBuyPackage = async (pkg) => {
    setLoadingPackageId(pkg.package_id);
    try {
      await OrderManagement.placeOrderFromBrand(
        influencer.agency_id,
        influencer.id,
        pkg.package_id
      );
      
      toast.success('Order placed successfully!');
      onClose(); // Close the modal after successful order
    } catch (error) {
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setLoadingPackageId(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Influencer Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info Section */}
          <div className="flex items-start space-x-6">
            <img
              src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
              alt={influencer.full_name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{influencer.full_name}</h3>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {influencer.email}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {`${influencer.city}, ${influencer.country}`}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {`${influencer.age} years • ${influencer.gender === 'M' ? 'Male' : 'Female'}`}
                </div>
              </div>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* YouTube Stats */}
            {influencer.primaryplatform.includes('youtube') && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <Youtube className="w-6 h-6 text-red-600" />
                  <h4 className="text-lg font-semibold">YouTube Statistics</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Subscribers</p>
                    <p className="text-xl font-bold">{influencer.subscribers_count_youtube.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Avg. Views</p>
                    <p className="text-xl font-bold">{influencer.avg_views_youtube.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Channel Age</p>
                    <p className="text-xl font-bold">{influencer.channel_age_youtube} years</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">Content Type</p>
                    <p className="text-xl font-bold">{influencer.content_type_youtube}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Instagram Stats */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <Instagram className="w-6 h-6 text-pink-600" />
                <h4 className="text-lg font-semibold">Instagram Statistics</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Followers</p>
                  <p className="text-xl font-bold">{influencer.ig_followers_count.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Engagement Rate</p>
                  <p className="text-xl font-bold">{influencer.eng_rate_ig}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Avg. Reel Views</p>
                  <p className="text-xl font-bold">{influencer.avg_ig_reel_views.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Avg. Likes</p>
                  <p className="text-xl font-bold">{influencer.avg_ig_likes_count.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content & Collaboration */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Content & Collaboration</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Content Languages</h5>
                <div className="flex flex-wrap gap-2">
                  {influencer.content_lang.map((lang, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Niches</h5>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {influencer.niches}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Collaboration Type</h5>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                  {influencer.collab_type}
                </span>
              </div>
            </div>
          </div>

          {/* Packages Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Collaboration Packages</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {influencer.packages.map((pkg) => (
                <div 
                  key={pkg.package_type} 
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                >
                  <div className={`p-6 rounded-t-xl ${
                    pkg.package_type === 'premium' 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                      : pkg.package_type === 'standard'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600'
                  }`}>
                    <h3 className="text-xl font-bold text-white capitalize">
                      {pkg.package_type}
                    </h3>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">₹{pkg.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center text-gray-700 mb-4">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <span>{pkg.delivery_time_days} days delivery</span>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">What's Included:</h4>
                        {pkg.features.split(',').map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2 mb-2">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{feature.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleBuyPackage(pkg)}
                      disabled={loadingPackageId === pkg.package_id}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 mt-6 
                        ${pkg.package_type === 'premium'
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : pkg.package_type === 'standard'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-600 hover:bg-gray-700 text-white'}
                        ${loadingPackageId === pkg.package_id ? 'opacity-75 cursor-not-allowed' : ''}
                      `}
                    >
                      {loadingPackageId === pkg.package_id ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        'Buy Package'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-3">Content Description</h4>
            <p className="text-gray-700">{influencer.content_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};