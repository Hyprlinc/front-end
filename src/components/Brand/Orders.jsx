// import React, { useState, useEffect } from 'react';
// import { Package, AlertCircle, CheckCircle, Clock, DollarSign, Building2, User } from 'lucide-react';
// import OrderManagement from '../../services/brands/OrderManagement';
// import { toast } from 'react-hot-toast';

// const Orders = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [filterType, setFilterType] = useState('all');
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch orders when component mounts
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await OrderManagement.getOrders();
      
//       // Transform API response to match our UI structure
//       const transformedOrders = [
//         ...transformBrandOrders(response.brandOrders),
//         // Add other order types if needed
//       ];

//       setOrders(transformedOrders);
//     } catch (err) {
//       setError(err.message);
//       toast.error('Failed to load orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to transform orders
//   const transformBrandOrders = (brandOrders) => {
//     return brandOrders.map(order => ({
//       id: order.id,
//       packageType: 'Standard', // You might want to fetch this from package details
//       sellerType: order.agency_id ? 'agency' : 'influencer',
//       seller: {
//         name: 'Seller Name', // You might want to fetch seller details
//         platform: order.influencer_id ? 'Instagram' : undefined,
//         followers: order.influencer_id ? 'N/A' : undefined,
//         category: 'N/A',
//         teamSize: order.agency_id ? 'N/A' : undefined,
//         expertise: order.agency_id ? ['N/A'] : undefined,
//         location: 'N/A'
//       },
//       orderDate: new Date(order.created_at).toLocaleDateString(),
//       status: order.status,
//       deliverableStatus: 'N/A',
//       paymentStatus: 'N/A',
//       amount: 'N/A',
//       campaign: 'N/A',
//       deliverables: [],
//       timeline: 'N/A',
//       requirements: 'N/A'
//     }));
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       Active: 'text-green-600 bg-green-50',
//       Completed: 'text-blue-600 bg-blue-50',
//       Pending: 'text-yellow-600 bg-yellow-50'
//     };
//     return colors[status] || 'text-gray-600 bg-gray-50';
//   };

//   const getSellerTypeIcon = (sellerType) => {
//     return sellerType === 'agency' ? 
//       <Building2 className="h-5 w-5 text-gray-400 mr-2" /> : 
//       <User className="h-5 w-5 text-gray-400 mr-2" />;
//   };

//   const handleRowClick = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">Your Orders</h1>
//         <div className="flex space-x-4">
//           <select 
//             className="border rounded-lg px-4 py-2 bg-white"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//           >
//             <option value="all">All Orders</option>
//             <option value="influencer">Influencer Packages</option>
//             <option value="agency">Agency Packages</option>
//           </select>
//         </div>
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error!</strong>
//           <span className="block sm:inline"> {error}</span>
//         </div>
//       )}

//       {/* Orders Table */}
//       {!loading && !error && (
//         <div className="bg-white rounded-lg shadow overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {orders.length > 0 ? (
//                 orders
//                   .filter(order => filterType === 'all' || order.sellerType === filterType)
//                   .map((order) => (
//                     <tr 
//                       key={order.id}
//                       onClick={() => handleRowClick(order)}
//                       className="hover:bg-gray-50 cursor-pointer transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {getSellerTypeIcon(order.sellerType)}
//                           <span className="text-sm font-medium text-gray-900 capitalize">
//                             {order.sellerType}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <Package className="h-5 w-5 text-gray-400 mr-2" />
//                           <span className="text-sm font-medium text-gray-900">{order.packageType}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{order.seller.name}</div>
//                         <div className="text-xs text-gray-500">
//                           {order.sellerType === 'influencer' 
//                             ? `${order.seller.platform} • ${order.seller.followers} followers`
//                             : `${order.seller.expertise.join(', ')}`
//                           }
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`flex items-center ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
//                           <DollarSign className="h-4 w-4 mr-1" />
//                           {order.amount}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No orders found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Enhanced Modal with Seller-specific details */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-3xl w-full mx-4 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="space-y-6">
//               {/* Seller Information */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-medium mb-3 flex items-center">
//                   {getSellerTypeIcon(selectedOrder.sellerType)}
//                   <span className="capitalize">{selectedOrder.sellerType} Details</span>
//                 </h3>
//                 {selectedOrder.sellerType === 'influencer' ? (
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">Name</p>
//                       <p className="font-medium">{selectedOrder.seller.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Platform</p>
//                       <p className="font-medium">{selectedOrder.seller.platform}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Followers</p>
//                       <p className="font-medium">{selectedOrder.seller.followers}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Category</p>
//                       <p className="font-medium">{selectedOrder.seller.category}</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">Agency Name</p>
//                       <p className="font-medium">{selectedOrder.seller.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Team Size</p>
//                       <p className="font-medium">{selectedOrder.seller.teamSize}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Location</p>
//                       <p className="font-medium">{selectedOrder.seller.location}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Expertise</p>
//                       <p className="font-medium">{selectedOrder.seller.expertise.join(', ')}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <p className="text-sm text-gray-500">Package Type</p>
//                   <p className="font-medium">{selectedOrder.packageType}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-sm text-gray-500">Campaign</p>
//                   <p className="font-medium">{selectedOrder.campaign}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-sm text-gray-500">Amount</p>
//                   <p className="font-medium">{selectedOrder.amount}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-sm text-gray-500">Timeline</p>
//                   <p className="font-medium">{selectedOrder.timeline}</p>
//                 </div>
//               </div>

//               <div className="border-t pt-4">
//                 <h3 className="font-medium mb-2">Deliverables</h3>
//                 <div className="space-y-2">
//                   {selectedOrder.deliverables.map((deliverable, index) => (
//                     <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
//                       <span>{deliverable.type}</span>
//                       <span className={deliverable.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>
//                         {deliverable.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="border-t pt-4">
//                 <h3 className="font-medium mb-2">Requirements</h3>
//                 <p className="text-gray-600">{selectedOrder.requirements}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Building2, 
  User, 
  ChevronDown,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowRight,
  Check,
  X,
  Calendar,
  Users,
  FileText,
  Circle
} from 'lucide-react';
import OrderManagement from '../../services/brands/OrderManagement';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await OrderManagement.getOrders();
      
      // Transform API response to match our UI structure
      const transformedOrders = transformOrders(response);
      setOrders(transformedOrders);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const transformOrders = (response) => {
    // Sample transformation - adjust based on your actual API response
    return [
      ...response.brandOrders.map(order => ({
        id: order.id,
        packageType: order.package_type || 'Standard',
        sellerType: order.agency_id ? 'agency' : 'influencer',
        seller: {
          id: order.agency_id || order.influencer_id,
          name: order.agency_name || order.influencer_name || 'Unknown Seller',
          platform: order.platform || 'Instagram',
          followers: order.followers ? `${order.followers.toLocaleString()}` : 'N/A',
          category: order.category || 'N/A',
          teamSize: order.team_size || 'N/A',
          expertise: order.expertise ? order.expertise.split(',') : ['N/A'],
          location: order.location || 'N/A',
          avatar: order.avatar_url || null
        },
        orderDate: new Date(order.created_at).toLocaleDateString(),
        status: order.status || 'Pending',
        deliverableStatus: getDeliverableStatus(order.status),
        paymentStatus: order.payment_status || 'Pending',
        amount: order.amount ? `₹${order.amount.toLocaleString()}` : 'N/A',
        campaign: order.campaign_name || 'N/A',
        deliverables: [
          { type: 'Content Creation', status: order.status === 'Completed' ? 'Completed' : 'Pending' },
          { type: 'Posting', status: order.status === 'Completed' ? 'Completed' : 'Pending' }
        ],
        timeline: order.timeline || '2 weeks',
        requirements: order.requirements || 'No specific requirements provided',
        messages: order.messages || []
      })),
      // Add sample data for demonstration
      ...(response.brandOrders.length === 0 ? [
        {
          id: '1',
          packageType: 'Premium',
          sellerType: 'influencer',
          seller: {
            id: 'inf1',
            name: 'Sarah Johnson',
            platform: 'Instagram',
            followers: '125K',
            category: 'Fashion',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          orderDate: new Date().toLocaleDateString(),
          status: 'Active',
          deliverableStatus: 'In Progress',
          paymentStatus: 'Paid',
          amount: '₹25,000',
          campaign: 'Summer Collection 2023',
          deliverables: [
            { type: 'Content Creation', status: 'Completed' },
            { type: 'Posting', status: 'In Progress' }
          ],
          timeline: '3 weeks',
          requirements: '3 Instagram posts featuring our summer collection'
        },
        {
          id: '2',
          packageType: 'Standard',
          sellerType: 'agency',
          seller: {
            id: 'ag1',
            name: 'Digital Marketing Pros',
            teamSize: '12',
            expertise: ['Influencer Marketing', 'Content Creation'],
            location: 'Mumbai, India',
            avatar: 'https://randomuser.me/api/portraits/lego/5.jpg'
          },
          orderDate: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
          status: 'Completed',
          deliverableStatus: 'Completed',
          paymentStatus: 'Paid',
          amount: '₹75,000',
          campaign: 'Product Launch',
          deliverables: [
            { type: 'Strategy', status: 'Completed' },
            { type: 'Execution', status: 'Completed' }
          ],
          timeline: '4 weeks',
          requirements: 'Full campaign management for product launch'
        }
      ] : [])
    ];
  };

  const getDeliverableStatus = (status) => {
    switch(status) {
      case 'Completed': return 'Completed';
      case 'Active': return 'In Progress';
      default: return 'Pending';
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: { text: 'text-blue-600', bg: 'bg-blue-50' },
      Completed: { text: 'text-green-600', bg: 'bg-green-50' },
      Pending: { text: 'text-yellow-600', bg: 'bg-yellow-50' }
    };
    return colors[status] || { text: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      Paid: 'text-green-600',
      Pending: 'text-yellow-600',
      Failed: 'text-red-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getDeliverableStatusColor = (status) => {
    const colors = {
      Completed: 'text-green-600',
      'In Progress': 'text-blue-600',
      Pending: 'text-yellow-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const filteredOrders = orders.filter(order => {
    const matchesType = filterType === 'all' || order.sellerType === filterType;
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.packageType.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const refreshOrders = () => {
    fetchOrders();
    toast.success('Orders refreshed');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Track and manage your influencer and agency orders</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={refreshOrders}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Refresh
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by influencer, agency, or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="text-gray-400" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Types</option>
                <option value="influencer">Influencers</option>
                <option value="agency">Agencies</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
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
            <p className="font-medium">Error loading orders</p>
            <p>{error}</p>
            <button 
              onClick={fetchOrders}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Orders Table */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seller
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr 
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {order.seller.avatar ? (
                                <img className="h-10 w-10 rounded-full" src={order.seller.avatar} alt="" />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  {order.sellerType === 'agency' ? (
                                    <Building2 className="h-5 w-5 text-gray-400" />
                                  ) : (
                                    <User className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{order.seller.name}</div>
                              <div className="text-sm text-gray-500">
                                {order.sellerType === 'influencer' ? (
                                  `${order.seller.platform} • ${order.seller.followers}`
                                ) : (
                                  `${order.seller.teamSize} members`
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Package className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {order.packageType}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.campaign}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {order.orderDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(order.status).bg.replace('bg-', 'bg-')}`}></span>
                            <span className={`text-sm ${getStatusColor(order.status).text}`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${getPaymentStatusColor(order.paymentStatus)} flex items-center`}>
                            <DollarSign className="h-4 w-4 mr-1" />
                            {order.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRowClick(order)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            View <ArrowRight className="h-4 w-4 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          {searchQuery 
                            ? "No orders match your search criteria. Try adjusting your filters."
                            : "You don't have any orders yet. When you place orders, they'll appear here."}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span className="mr-3">Order ID: {selectedOrder.id}</span>
                    <span className={`${getStatusColor(selectedOrder.status).text} flex items-center`}>
                      <span className={`h-2 w-2 rounded-full mr-1 ${getStatusColor(selectedOrder.status).bg.replace('bg-', 'bg-')}`}></span>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Seller Information */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-16 w-16">
                      {selectedOrder.seller.avatar ? (
                        <img className="h-16 w-16 rounded-full" src={selectedOrder.seller.avatar} alt="" />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                          {selectedOrder.sellerType === 'agency' ? (
                            <Building2 className="h-8 w-8 text-gray-400" />
                          ) : (
                            <User className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {selectedOrder.seller.name}
                        <span className="ml-2 text-sm font-normal text-gray-500 capitalize">
                          ({selectedOrder.sellerType})
                        </span>
                      </h3>
                      
                      {selectedOrder.sellerType === 'influencer' ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-sm text-gray-500">Platform</p>
                            <p className="font-medium">{selectedOrder.seller.platform}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Followers</p>
                            <p className="font-medium">{selectedOrder.seller.followers}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium">{selectedOrder.seller.category}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-sm text-gray-500">Team Size</p>
                            <p className="font-medium">{selectedOrder.seller.teamSize}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{selectedOrder.seller.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Expertise</p>
                            <p className="font-medium">{selectedOrder.seller.expertise.join(', ')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package Type</span>
                        <span className="font-medium">{selectedOrder.packageType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Campaign</span>
                        <span className="font-medium">{selectedOrder.campaign}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span className="font-medium">{selectedOrder.orderDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timeline</span>
                        <span className="font-medium">{selectedOrder.timeline}</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-gray-600 font-bold">Amount</span>
                        <span className="font-bold text-lg">{selectedOrder.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status</span>
                        <span className={`font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-4">Deliverables</h3>
                    <div className="space-y-3">
                      {selectedOrder.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            {deliverable.status === 'Completed' ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : deliverable.status === 'In Progress' ? (
                              <Clock className="h-5 w-5 text-blue-500 mr-2" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-300 mr-2" />
                            )}
                            <span>{deliverable.type}</span>
                          </div>
                          <span className={`text-sm font-medium ${getDeliverableStatusColor(deliverable.status)}`}>
                            {deliverable.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="border rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-lg mb-4">Requirements</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedOrder.requirements}</p>
                  </div>
                </div>

                {/* Messages */}
                {selectedOrder.messages.length > 0 && (
                  <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Order Messages</h3>
                    <div className="space-y-4">
                      {selectedOrder.messages.map((message, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{message.sender}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{message.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;