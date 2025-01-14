import React, { useState } from 'react';
import { 
  Download, 
  DollarSign, 
  Clock, 
  Lock, 
  CheckCircle,
  CreditCard,
  FileText,
  AlertCircle 
} from 'lucide-react';

// Dummy data - replace with actual API calls
const dummyData = {
  earnings: {
    total: 25000,
    thisMonth: 3500,
    pendingPayment: 1500,
  
  },
  pendingPayments: [
    {
      id: 1,
      brandName: "Samsung",
      brandLogo: "/api/placeholder/40/40",
      campaignName: "Tech Review 2024",
      amount: 2000,
      dueDate: "2024-02-01",
      status: "In Review"
    },
    {
      id: 2,
      brandName: "Spotify",
      brandLogo: "/api/placeholder/40/40",
      campaignName: "Music Promotion",
      amount: 1500,
      dueDate: "2024-02-05",
      status: "Pending Approval"
    }
  ],
  completedPayments: [
    {
      id: 1,
      brandName: "Nike",
      brandLogo: "/api/placeholder/40/40",
      campaignName: "Summer Collection 2024",
      amount: 5000,
      date: "2024-01-15",
      status: "Completed",
      invoiceNo: "INV-2024-001"
    },
    {
      id: 2,
      brandName: "Adidas",
      brandLogo: "/api/placeholder/40/40",
      campaignName: "Sports Edition",
      amount: 3500,
      date: "2024-01-20",
      status: "Completed",
      invoiceNo: "INV-2024-002"
    }
  ]
};

const EarningsDashboard = () => {
  const [activeTab, setActiveTab] = useState('earnings');

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Earnings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Earnings</p>
              <h3 className="text-2xl font-bold text-blue-700">${dummyData.earnings.total}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* This Month Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">This Month</p>
              <h3 className="text-2xl font-bold text-green-700">${dummyData.earnings.thisMonth}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Pending Payment Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending Payment</p>
              <h3 className="text-2xl font-bold text-yellow-700">${dummyData.earnings.pendingPayment}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* In Escrow Card
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">In Escrow</p>
              <h3 className="text-2xl font-bold text-purple-700">${dummyData.earnings.inEscrow}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Lock className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div> */}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'earnings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            All Transactions
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="h-4 w-4 mr-2" />
            Invoices
          </button>
        </nav>
      </div>

      {/* Transactions Section */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          {/* Pending Payments */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pending Payments</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Brand</th>
                      <th className="text-left py-3 px-4">Campaign</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Due Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.pendingPayments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <img 
                              src={payment.brandLogo} 
                              alt={`${payment.brandName} logo`}
                              className="w-8 h-8 rounded-full mr-3 bg-gray-100"
                            />
                            <span className="font-medium">{payment.brandName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{payment.campaignName}</td>
                        <td className="py-3 px-4">${payment.amount}</td>
                        <td className="py-3 px-4">{payment.dueDate}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center w-fit">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Completed Payments */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Completed Payments</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Brand</th>
                      <th className="text-left py-3 px-4">Campaign</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.completedPayments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <img 
                              src={payment.brandLogo} 
                              alt={`${payment.brandName} logo`}
                              className="w-8 h-8 rounded-full mr-3 bg-gray-100"
                            />
                            <span className="font-medium">{payment.brandName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{payment.campaignName}</td>
                        <td className="py-3 px-4">${payment.amount}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center w-fit">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="flex items-center text-blue-600 hover:text-blue-800">
                            <Download className="h-4 w-4 mr-1" />
                            {payment.invoiceNo}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Section */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Invoice No</th>
                    <th className="text-left py-3 px-4">Brand</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.completedPayments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="py-3 px-4">{payment.invoiceNo}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img 
                            src={payment.brandLogo} 
                            alt={`${payment.brandName} logo`}
                            className="w-8 h-8 rounded-full mr-3 bg-gray-100"
                          />
                          <span className="font-medium">{payment.brandName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">${payment.amount}</td>
                      <td className="py-3 px-4">{payment.date}</td>
                      <td className="py-3 px-4">
                        <button className="flex items-center text-blue-600 hover:text-blue-800">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsDashboard;