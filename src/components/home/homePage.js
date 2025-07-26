import React, { useState, useEffect } from "react";
import { SearchIcon, XIcon, TrendingUpIcon } from "lucide-react";
import { searchCampaigns } from "../../services/creators/CreatorsServices";

const CreatorDashboardHome = ({ user, stats }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all campaigns on component mount
  useEffect(() => {
    const fetchAllCampaigns = async () => {
      try {
        setIsLoading(true);
        const response = await searchCampaigns({
          search: "",
          page: 1,
          limit: 100,
        });
        if (response.status === "success") {
          setCampaigns(response.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCampaigns();
  }, []);

  // Safely filter campaigns based on search query
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const campaignName = campaign.name?.toLowerCase() || "";
    const campaignType = campaign.campaign_type?.toLowerCase() || "";
    const description = campaign.description?.toLowerCase() || "";
    const targetAudience = campaign.target_audience?.toLowerCase() || "";

    return (
      campaignName.includes(query) ||
      campaignType.includes(query) ||
      description.includes(query) ||
      targetAudience.includes(query)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">
              Hello {user?.fullName || "User"}, Welcome back 👋
            </h2>
            <button className="h-12 px-6 bg-white text-blue-600 rounded-lg font-medium">
              Get Started
            </button>
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Ongoing Campaigns */}
          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Ongoing Campaigns
              </h3>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUpIcon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold text-indigo-700 text-3xl">
                {stats?.ongoingCampaigns || 0}
              </p>
            </div>
          </div>

          {/* Earnings */}
          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-emerald-500">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Monthly Earnings
              </h3>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold text-emerald-700 text-3xl">
                ₹{stats?.lastMonthEarnings || 0}
              </p>
            </div>
          </div>

          {/* Completed Campaigns */}
          <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-amber-500">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
              <div className="p-2 bg-amber-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold text-amber-700 text-3xl">
                {stats?.campaignsCompleted || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search campaigns, brands, or categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-4 pl-14 pr-12 rounded-xl border border-gray-200 
                focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                bg-white shadow-lg text-gray-700"
            />
            <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchQuery && (
              <button
                onClick={handleSearchClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading campaigns...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Campaign
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Campaign Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {campaign.name || "Unnamed Campaign"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {campaign.description?.substring(0, 50) ||
                                  "No description"}
                                ...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${campaign.budget || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.campaign_type || "Not specified"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center">
                        {searchQuery ? (
                          <div className="text-gray-500">
                            No campaigns match your search criteria
                          </div>
                        ) : (
                          <div className="text-gray-500">
                            No campaigns available
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardHome;
