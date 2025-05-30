import React, { useState } from 'react';
import { Package, DollarSign, Calendar, Check, Clock, XCircle } from 'lucide-react';

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample data - Replace with actual API data
  const orders = [
    {
      id: 1,
      brand: 'Nike Sports',
      packageType: 'Premium Influencer Package',
      orderDate: '2025-05-20',
      status: 'In Progress',
      influencer: 'Maria Garcia',
      amount: '₹75,000',
      deliverables: [
        { type: 'Instagram Post', status: 'Completed', dueDate: '2025-06-01' },
        { type: 'YouTube Video', status: 'Pending', dueDate: '2025-06-15' },
        { type: 'TikTok Content', status: 'Not Started', dueDate: '2025-06-10' }
      ],
      paymentStatus: 'Partially Paid',
      paymentDetails: {
        total: '₹75,000',
        paid: '₹37,500',
        pending: '₹37,500',
        nextPaymentDate: '2025-06-01'
      },
      timeline: {
        start: '2025-05-20',
        end: '2025-06-30',
        milestones: [
          { name: 'Content Approval', date: '2025-06-05' },
          { name: 'Final Submission', date: '2025-06-25' }
        ]
      }
    },
    // Add more sample orders...
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'In Progress': 'bg-blue-50 text-blue-600',
      'Completed': 'bg-green-50 text-green-600',
      'Pending': 'bg-yellow-50 text-yellow-600',
      'Cancelled': 'bg-red-50 text-red-600'
    };
    return statusStyles[status] || 'bg-gray-50 text-gray-600';
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Order Management</h1>
        <div className="flex space-x-4">
          <select className="border rounded-lg px-4 py-2 bg-white">
            <option>All Orders</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr 
                key={order.id}
                onClick={() => handleRowClick(order)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{order.brand}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm">{order.packageType}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.influencer}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`flex items-center ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    <DollarSign className="h-4 w-4 mr-1" />
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full m-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Brand:</span> {selectedOrder.brand}</p>
                    <p><span className="text-gray-500">Package:</span> {selectedOrder.packageType}</p>
                    <p><span className="text-gray-500">Influencer:</span> {selectedOrder.influencer}</p>
                    <p><span className="text-gray-500">Status:</span> {selectedOrder.status}</p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Payment Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Total Amount:</span> {selectedOrder.paymentDetails.total}</p>
                    <p><span className="text-gray-500">Paid:</span> {selectedOrder.paymentDetails.paid}</p>
                    <p><span className="text-gray-500">Pending:</span> {selectedOrder.paymentDetails.pending}</p>
                    <p><span className="text-gray-500">Next Payment:</span> {selectedOrder.paymentDetails.nextPaymentDate}</p>
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Deliverables</h3>
                  <div className="space-y-2">
                    {selectedOrder.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{deliverable.type}</span>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(deliverable.status)}`}>
                            {deliverable.status}
                          </span>
                          <span className="ml-2 text-gray-500">{deliverable.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Start Date:</span> {selectedOrder.timeline.start}</p>
                    <p><span className="text-gray-500">End Date:</span> {selectedOrder.timeline.end}</p>
                    <div className="mt-2">
                      <h4 className="text-gray-500 mb-1">Milestones</h4>
                      {selectedOrder.timeline.milestones.map((milestone, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{milestone.name}</span>
                          <span>{milestone.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;