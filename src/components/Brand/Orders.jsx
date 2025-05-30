import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, CheckCircle, Clock, DollarSign, Building2, User } from 'lucide-react';
import OrderManagement from '../../services/brands/OrderManagement';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterType, setFilterType] = useState('all');
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
      const transformedOrders = [
        ...transformBrandOrders(response.brandOrders),
        // Add other order types if needed
      ];

      setOrders(transformedOrders);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to transform orders
  const transformBrandOrders = (brandOrders) => {
    return brandOrders.map(order => ({
      id: order.id,
      packageType: 'Standard', // You might want to fetch this from package details
      sellerType: order.agency_id ? 'agency' : 'influencer',
      seller: {
        name: 'Seller Name', // You might want to fetch seller details
        platform: order.influencer_id ? 'Instagram' : undefined,
        followers: order.influencer_id ? 'N/A' : undefined,
        category: 'N/A',
        teamSize: order.agency_id ? 'N/A' : undefined,
        expertise: order.agency_id ? ['N/A'] : undefined,
        location: 'N/A'
      },
      orderDate: new Date(order.created_at).toLocaleDateString(),
      status: order.status,
      deliverableStatus: 'N/A',
      paymentStatus: 'N/A',
      amount: 'N/A',
      campaign: 'N/A',
      deliverables: [],
      timeline: 'N/A',
      requirements: 'N/A'
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: 'text-green-600 bg-green-50',
      Completed: 'text-blue-600 bg-blue-50',
      Pending: 'text-yellow-600 bg-yellow-50'
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  const getSellerTypeIcon = (sellerType) => {
    return sellerType === 'agency' ? 
      <Building2 className="h-5 w-5 text-gray-400 mr-2" /> : 
      <User className="h-5 w-5 text-gray-400 mr-2" />;
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Your Orders</h1>
        <div className="flex space-x-4">
          <select 
            className="border rounded-lg px-4 py-2 bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="influencer">Influencer Packages</option>
            <option value="agency">Agency Packages</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Orders Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders
                  .filter(order => filterType === 'all' || order.sellerType === filterType)
                  .map((order) => (
                    <tr 
                      key={order.id}
                      onClick={() => handleRowClick(order)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getSellerTypeIcon(order.sellerType)}
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {order.sellerType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{order.packageType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.seller.name}</div>
                        <div className="text-xs text-gray-500">
                          {order.sellerType === 'influencer' 
                            ? `${order.seller.platform} • ${order.seller.followers} followers`
                            : `${order.seller.expertise.join(', ')}`
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`flex items-center ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                          <DollarSign className="h-4 w-4 mr-1" />
                          {order.amount}
                        </span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Enhanced Modal with Seller-specific details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Seller Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                  {getSellerTypeIcon(selectedOrder.sellerType)}
                  <span className="capitalize">{selectedOrder.sellerType} Details</span>
                </h3>
                {selectedOrder.sellerType === 'influencer' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedOrder.seller.name}</p>
                    </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Agency Name</p>
                      <p className="font-medium">{selectedOrder.seller.name}</p>
                    </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Package Type</p>
                  <p className="font-medium">{selectedOrder.packageType}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Campaign</p>
                  <p className="font-medium">{selectedOrder.campaign}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">{selectedOrder.amount}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-medium">{selectedOrder.timeline}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Deliverables</h3>
                <div className="space-y-2">
                  {selectedOrder.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{deliverable.type}</span>
                      <span className={deliverable.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>
                        {deliverable.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Requirements</h3>
                <p className="text-gray-600">{selectedOrder.requirements}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;