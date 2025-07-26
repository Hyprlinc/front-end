// import React, { useState, useEffect } from 'react';
// import { getAgencies } from '../../services/brands/EnlistAgencies';
// import { Building2, Globe, Phone, Mail, Package, Search, X, Clock, Check } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const DiscoverAgencies = () => {
//   const [agencies, setAgencies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAgency, setSelectedAgency] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchAgencies();
//   }, []);

//   const fetchAgencies = async () => {
//     try {
//       setLoading(true);
//       const response = await getAgencies();
//       setAgencies(response.data);
//     } catch (error) {
//       setError(error.message);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredAgencies = agencies.filter(agency =>
//     agency.agency_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Discover Agencies</h1>
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search agencies..."
//             className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//           {error}
//         </div>
//       )}

//       {/* Agencies Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredAgencies.map((agency) => (
//           <div
//             key={agency.email}
//             className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
//             onClick={() => setSelectedAgency(agency)}
//           >
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">{agency.agency_name}</h3>
//                   <div className="flex items-center mt-2 text-gray-600">
//                     <Package className="w-4 h-4 mr-2" />
//                     <span>{agency.packages.length} Packages Available</span>
//                   </div>
//                 </div>
//                 <Building2 className="w-8 h-8 text-blue-500" />
//               </div>
              
//               <div className="space-y-2 text-gray-600">
//                 <div className="flex items-center">
//                   <Mail className="w-4 h-4 mr-2" />
//                   <span>{agency.email}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Phone className="w-4 h-4 mr-2" />
//                   <span>{agency.phone_number}</span>
//                 </div>
//                 {agency.website && (
//                   <div className="flex items-center">
//                     <Globe className="w-4 h-4 mr-2" />
//                     <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       {agency.website}
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Agency Modal */}
//       {selectedAgency && (
//         <AgencyModal
//           agency={selectedAgency}
//           onClose={() => setSelectedAgency(null)}
//         />
//       )}
//     </div>
//   );
// };

// const AgencyModal = ({ agency, onClose }) => {
//   const [loadingPackageId, setLoadingPackageId] = useState(null);
//   console.log("Agency Details", agency);

//   const handlePackagePurchase = async (packageDetails) => {
//     setLoadingPackageId(packageDetails.package_type);
//     try {
//       // Implement package purchase logic here
//       toast.success('Package purchased successfully!');
//       onClose();
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoadingPackageId(null);
//     }
//   };

//   const parseFeatures = (featuresString) => {
//     try {
//       // Remove escaped quotes and parse JSON
//       const cleanString = featuresString.replace(/\\/g, '');
//       // Remove quotes at start and end if present
//       const trimmedString = cleanString.replace(/^"(.*)"$/, '$1');
//       return JSON.parse(trimmedString);
//     } catch (error) {
//       console.error('Failed to parse features:', error);
//       return [];
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
//           <h2 className="text-2xl font-bold">{agency.agency_name}</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 space-y-8">
//           {/* Agency Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Contact Information</h3>
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <Mail className="w-5 h-5 mr-2 text-gray-400" />
//                   <span>{agency.email}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Phone className="w-5 h-5 mr-2 text-gray-400" />
//                   <span>{agency.phone_number}</span>
//                 </div>
//                 {agency.website && (
//                   <div className="flex items-center">
//                     <Globe className="w-5 h-5 mr-2 text-gray-400" />
//                     <a
//                       href={agency.website}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 hover:underline"
//                     >
//                       {agency.website}
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Packages */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Available Packages</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {agency.packages.map((pkg) => (
//                 <div
//                   key={pkg.package_type}
//                   className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
//                 >
//                   <div className={`p-6 rounded-t-xl ${
//                     pkg.package_type === 'Premium'
//                       ? 'bg-gradient-to-r from-purple-500 to-purple-600'
//                       : pkg.package_type === 'Standard'
//                       ? 'bg-gradient-to-r from-blue-500 to-blue-600'
//                       : 'bg-gradient-to-r from-gray-500 to-gray-600'
//                   }`}>
//                     <h3 className="text-xl font-bold text-white capitalize">
//                       {pkg.package_type}
//                     </h3>
//                     <div className="mt-4">
//                       <span className="text-3xl font-bold text-white">
//                         ₹{pkg.price.toLocaleString()}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     <div className="space-y-4">
//                       <div className="flex items-center text-gray-700">
//                         <Clock className="w-5 h-5 mr-2 text-gray-400" />
//                         <span>{pkg.delivery_time_days} days delivery</span>
//                       </div>
//                       <div className="border-t pt-4">
//                         <h4 className="font-medium mb-2">What's Included:</h4>
//                         {parseFeatures(pkg.features).length > 0 ? (
//                           parseFeatures(pkg.features).map((feature, index) => (
//                             <div key={index} className="flex items-start space-x-2 mb-2">
//                               <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                               <span className="text-gray-600">{feature}</span>
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-gray-500">No features specified</div>
//                         )}
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={() => handlePackagePurchase(pkg)}
//                       disabled={loadingPackageId === pkg.package_type}
//                       className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors duration-200
//                         ${pkg.package_type === 'Premium'
//                           ? 'bg-purple-600 hover:bg-purple-700 text-white'
//                           : pkg.package_type === 'Standard'
//                           ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                           : 'bg-gray-600 hover:bg-gray-700 text-white'}
//                         ${loadingPackageId === pkg.package_type ? 'opacity-75 cursor-not-allowed' : ''}
//                       `}
//                     >
//                       {loadingPackageId === pkg.package_type ? (
//                         <div className="flex items-center justify-center">
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           <span className="ml-2">Processing...</span>
//                         </div>
//                       ) : (
//                         'Purchase Package'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Portfolio Projects */}
//           {agency.portfolio_projects.length > 0 && (
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Portfolio Projects</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {agency.portfolio_projects.map((project, index) => (
//                   <div key={index} className="border rounded-lg p-4">
//                     <h4 className="font-medium text-lg mb-2">{project.campaign_name}</h4>
//                     <p className="text-gray-600 mb-2">Client: {project.client_name}</p>
//                     <div className="text-sm text-gray-500">{project.results}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscoverAgencies;


import React, { useState, useEffect } from 'react';
import { getAgencies } from '../../services/brands/EnlistAgencies';
import { Building2, Globe, Phone, Mail, Package, Search, X, Clock, Check, Star, ArrowRight, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';

const DiscoverAgencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    packageType: '',
    rating: '',
    sortBy: 'featured'
  });

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      const response = await getAgencies();
      setAgencies(response.data.map(agency => ({
        ...agency,
        rating: Math.floor(Math.random() * 2) + 3 + Math.random().toFixed(1) // Random rating between 3.0 and 5.0
      })));
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.agency_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPackage = !filters.packageType || 
      agency.packages.some(pkg => pkg.package_type === filters.packageType);
    const matchesRating = !filters.rating || 
      parseFloat(agency.rating) >= parseFloat(filters.rating);
    
    return matchesSearch && matchesPackage && matchesRating;
  });

  const sortedAgencies = [...filteredAgencies].sort((a, b) => {
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'price-low') {
      return Math.min(...a.packages.map(p => p.price)) - Math.min(...b.packages.map(p => p.price));
    }
    if (filters.sortBy === 'price-high') {
      return Math.max(...b.packages.map(p => p.price)) - Math.max(...a.packages.map(p => p.price));
    }
    return 0; // Default sorting (featured)
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover Marketing Agencies</h1>
            <p className="text-gray-600 mt-2">Find the perfect agency for your influencer marketing needs</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search agencies by name..."
              className="w-full md:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="md:flex flex-wrap gap-3 mb-8">
          <div className="relative">
            <select
              name="packageType"
              value={filters.packageType}
              onChange={(e) => setFilters({...filters, packageType: e.target.value})}
              className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="">All Package Types</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select
              name="rating"
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative ml-auto">
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Error loading agencies</p>
            <p>{error}</p>
            <button 
              onClick={fetchAgencies}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAgencies.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No agencies found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Agencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAgencies.map((agency) => (
            <div
              key={agency.email}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden border border-gray-100"
              onClick={() => setSelectedAgency(agency)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{agency.agency_name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(agency.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{agency.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 mr-2 text-gray-400" />
                    <span>{agency.packages.length} packages available</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="truncate">{agency.email}</span>
                  </div>
                  {agency.website && (
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-gray-400" />
                      <a 
                        href={agency.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 hover:underline truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {agency.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{Math.min(...agency.packages.map(p => p.price)).toLocaleString()}
                    </p>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    View details <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
  const [activeTab, setActiveTab] = useState('packages');
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);

  const handlePackagePurchase = async (packageDetails) => {
    setLoadingPackageId(packageDetails.package_type);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Successfully purchased ${packageDetails.package_type} package!`);
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to purchase package');
    } finally {
      setLoadingPackageId(null);
    }
  };

  const parseFeatures = (featuresString) => {
    try {
      const cleanString = featuresString.replace(/\\/g, '');
      const trimmedString = cleanString.replace(/^"(.*)"$/, '$1');
      return JSON.parse(trimmedString);
    } catch (error) {
      console.error('Failed to parse features:', error);
      return [];
    }
  };

  const toggleTestimonial = (index) => {
    setExpandedTestimonial(expandedTestimonial === index ? null : index);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{agency.agency_name}</h2>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(agency.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-gray-600 ml-2">{agency.rating} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'packages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('packages')}
            >
              Packages
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'portfolio' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          {/* Agency Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">About the Agency</h3>
              <p className="text-gray-600">
                {agency.description || "This agency specializes in influencer marketing campaigns across multiple platforms. With years of experience, they help brands connect with the right influencers to achieve their marketing goals."}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{agency.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{agency.phone_number}</span>
                </div>
                {agency.website && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-gray-400" />
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {agency.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold">Marketing Packages</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {agency.packages.map((pkg) => (
                  <div
                    key={pkg.package_type}
                    className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative"
                  >
                    {pkg.package_type === 'Premium' && (
                      <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        POPULAR
                      </div>
                    )}
                    <div className={`p-6 rounded-t-xl ${
                      pkg.package_type === 'Premium'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700'
                        : pkg.package_type === 'Standard'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700'
                    }`}>
                      <h3 className="text-xl font-bold text-white capitalize">
                        {pkg.package_type}
                      </h3>
                      <div className="mt-4">
                        <span className="text-3xl font-bold text-white">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                        <span className="text-white/80 ml-1">/campaign</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-5 h-5 mr-2 text-gray-400" />
                          <span>{pkg.delivery_time_days} days delivery</span>
                        </div>
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3">What's Included:</h4>
                          <ul className="space-y-2">
                            {parseFeatures(pkg.features).length > 0 ? (
                              parseFeatures(pkg.features).map((feature, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-600">{feature}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-500">No features specified</li>
                            )}
                          </ul>
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
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Recent Campaigns</h3>
              {agency.portfolio_projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agency.portfolio_projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg mb-2">{project.campaign_name}</h4>
                      <p className="text-gray-600 mb-3">
                        <span className="font-medium">Client:</span> {project.client_name}
                      </p>
                      <div className="text-gray-700">
                        <p className="font-medium mb-1">Results:</p>
                        <p>{project.results || "Significant increase in brand awareness and engagement"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No portfolio projects available</h4>
                  <p className="text-gray-600">This agency hasn't shared any portfolio projects yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-xl font-bold">Client Reviews</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(agency.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2">{agency.rating} based on {Math.floor(Math.random() * 50) + 10} reviews</span>
                  </div>
                </div>
                <button className="mt-3 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Write a Review
                </button>
              </div>

              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Client {index + 1}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 months ago</span>
                    </div>
                    <p className={`text-gray-600 ${expandedTestimonial !== index ? 'line-clamp-3' : ''}`}>
                      {[
                        "This agency delivered exceptional results for our campaign. The influencers they connected us with were perfectly aligned with our brand.",
                        "Great communication throughout the process. We saw a 30% increase in engagement compared to our previous campaigns.",
                        "While the results were good, the process took longer than expected. However, the team was very responsive to our concerns."
                      ][index]}
                    </p>
                    <button 
                      onClick={() => toggleTestimonial(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm mt-1"
                    >
                      {expandedTestimonial === index ? 'Show less' : 'Read more'}
                    </button>
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