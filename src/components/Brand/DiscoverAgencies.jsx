import React, { useState, useEffect } from 'react';
import { getAgencies } from '../../services/brands/EnlistAgencies';
import { Building2, Globe, Phone, Mail, Package, Search, X, Clock, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const DiscoverAgencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      const response = await getAgencies();
      setAgencies(response.data);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgencies = agencies.filter(agency =>
    agency.agency_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Discover Agencies</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search agencies..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgencies.map((agency) => (
          <div
            key={agency.email}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedAgency(agency)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{agency.agency_name}</h3>
                  <div className="flex items-center mt-2 text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    <span>{agency.packages.length} Packages Available</span>
                  </div>
                </div>
                <Building2 className="w-8 h-8 text-blue-500" />
              </div>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{agency.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{agency.phone_number}</span>
                </div>
                {agency.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {agency.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agency Modal */}
      {selectedAgency && (
        <AgencyModal
          agency={selectedAgency}
          onClose={() => setSelectedAgency(null)}
        />
      )}
    </div>
  );
};

const AgencyModal = ({ agency, onClose }) => {
  const [loadingPackageId, setLoadingPackageId] = useState(null);
  console.log("Agency Details", agency);

  const handlePackagePurchase = async (packageDetails) => {
    setLoadingPackageId(packageDetails.package_type);
    try {
      // Implement package purchase logic here
      toast.success('Package purchased successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingPackageId(null);
    }
  };

  const parseFeatures = (featuresString) => {
    try {
      // Remove escaped quotes and parse JSON
      const cleanString = featuresString.replace(/\\/g, '');
      // Remove quotes at start and end if present
      const trimmedString = cleanString.replace(/^"(.*)"$/, '$1');
      return JSON.parse(trimmedString);
    } catch (error) {
      console.error('Failed to parse features:', error);
      return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{agency.agency_name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Agency Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{agency.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{agency.phone_number}</span>
                </div>
                {agency.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-gray-400" />
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {agency.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agency.packages.map((pkg) => (
                <div
                  key={pkg.package_type}
                  className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className={`p-6 rounded-t-xl ${
                    pkg.package_type === 'Premium'
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                      : pkg.package_type === 'Standard'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600'
                  }`}>
                    <h3 className="text-xl font-bold text-white capitalize">
                      {pkg.package_type}
                    </h3>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <span>{pkg.delivery_time_days} days delivery</span>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">What's Included:</h4>
                        {parseFeatures(pkg.features).length > 0 ? (
                          parseFeatures(pkg.features).map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2 mb-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500">No features specified</div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handlePackagePurchase(pkg)}
                      disabled={loadingPackageId === pkg.package_type}
                      className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors duration-200
                        ${pkg.package_type === 'Premium'
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : pkg.package_type === 'Standard'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-600 hover:bg-gray-700 text-white'}
                        ${loadingPackageId === pkg.package_type ? 'opacity-75 cursor-not-allowed' : ''}
                      `}
                    >
                      {loadingPackageId === pkg.package_type ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span className="ml-2">Processing...</span>
                        </div>
                      ) : (
                        'Purchase Package'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Projects */}
          {agency.portfolio_projects.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Portfolio Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agency.portfolio_projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-lg mb-2">{project.campaign_name}</h4>
                    <p className="text-gray-600 mb-2">Client: {project.client_name}</p>
                    <div className="text-sm text-gray-500">{project.results}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscoverAgencies;