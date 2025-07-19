import React, { useState } from 'react';
import { 
  Download, 
  DollarSign, 
  Clock, 
  Lock, 
  CheckCircle,
  CreditCard,
  FileText,
  AlertCircle,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  FileSearch
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy data - replace with actual API calls
const dummyData = {
  earnings: {
    total: 25000,
    thisMonth: 3500,
    pendingPayment: 1500,
    growth: 12.5
  },
  pendingPayments: [
    {
      id: 1,
      brandName: "Samsung",
      brandLogo: "https://logo.clearbit.com/samsung.com",
      campaignName: "Tech Review 2024",
      amount: 2000,
      dueDate: "2024-02-01",
      status: "In Review"
    },
    {
      id: 2,
      brandName: "Spotify",
      brandLogo: "https://logo.clearbit.com/spotify.com",
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
      brandLogo: "https://logo.clearbit.com/nike.com",
      campaignName: "Summer Collection 2024",
      amount: 5000,
      date: "2024-01-15",
      status: "Completed",
      invoiceNo: "INV-2024-001"
    },
    {
      id: 2,
      brandName: "Adidas",
      brandLogo: "https://logo.clearbit.com/adidas.com",
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
  const [isSidebarOpen] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-80' : ''}`}
    >
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Earnings Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-blue-900 to-blue-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-90">Total Earnings</p>
                <h3 className="text-3xl font-bold mt-1">${dummyData.earnings.total.toLocaleString()}</h3>
                <div className="flex items-center mt-3 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>{dummyData.earnings.growth}% from last month</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          {/* This Month Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-900 to-green-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-90">This Month</p>
                <h3 className="text-3xl font-bold mt-1">${dummyData.earnings.thisMonth.toLocaleString()}</h3>
                <div className="flex items-center mt-3 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Jan 1 - Jan 31</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          {/* Pending Payment Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-900 to-amber-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-90">Pending Payment</p>
                <h3 className="text-3xl font-bold mt-1">${dummyData.earnings.pendingPayment.toLocaleString()}</h3>
                <div className="flex items-center mt-3 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>2 campaigns pending</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="relative">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('earnings')}
              className={`relative py-4 px-1 font-medium text-sm transition-colors ${
                activeTab === 'earnings'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                All Transactions
              </div>
              {activeTab === 'earnings' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="tabIndicator"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`relative py-4 px-1 font-medium text-sm transition-colors ${
                activeTab === 'invoices'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Invoices
              </div>
              {activeTab === 'invoices' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="tabIndicator"
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                {/* Pending Payments */}
                <motion.div 
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Pending Payments</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dummyData.pendingPayments.map((payment) => (
                      <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={payment.brandLogo} 
                              alt={`${payment.brandName} logo`}
                              className="w-10 h-10 rounded-full border border-gray-200"
                            />
                            <div>
                              <h3 className="font-medium">{payment.campaignName}</h3>
                              <p className="text-sm text-gray-500">{payment.brandName}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${payment.amount.toLocaleString()}</p>
                            <div className="flex items-center justify-end mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs flex items-center ${
                                payment.status === "In Review" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {payment.status === "In Review" ? (
                                  <FileSearch className="h-3 w-3 mr-1" />
                                ) : (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                          <span>Due: {payment.dueDate}</span>
                          <button className="text-blue-600 hover:text-blue-800 flex items-center">
                            Details <ArrowUpRight className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Completed Payments */}
                <motion.div 
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Completed Payments</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dummyData.completedPayments.map((payment) => (
                      <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={payment.brandLogo} 
                              alt={`${payment.brandName} logo`}
                              className="w-10 h-10 rounded-full border border-gray-200"
                            />
                            <div>
                              <h3 className="font-medium">{payment.campaignName}</h3>
                              <p className="text-sm text-gray-500">{payment.brandName}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${payment.amount.toLocaleString()}</p>
                            <div className="flex items-center justify-end mt-1">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                          <span>Paid on: {payment.date}</span>
                          <button className="text-blue-600 hover:text-blue-800 flex items-center">
                            Download Invoice <Download className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'invoices' && (
              <motion.div 
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View all <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {dummyData.completedPayments.map((payment) => (
                    <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{payment.invoiceNo}</h3>
                            <p className="text-sm text-gray-500">{payment.brandName} - {payment.campaignName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${payment.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 mt-1">{payment.date}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                          Download <Download className="h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EarningsDashboard;