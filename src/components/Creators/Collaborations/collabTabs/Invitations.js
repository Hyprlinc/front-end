import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Invitations = () => {
    const [invitations, setInvitations] = useState([
        {
            id: 1,
            campaignName: 'Summer Collection 2024',
            brand: {
                name: 'Nike',
                logo: 'https://logo.clearbit.com/nike.com'
            },
            status: 'Active',
            budget: '$5000',
        },
        {
            id: 2,
            campaignName: 'Fall Fashion Week',
            brand: {
                name: 'Zara',
                logo: 'https://logo.clearbit.com/zara.com'
            },
            status: 'Active',
            budget: '$3500',
        },
        {
            id: 3,
            campaignName: 'Fitness Challenge',
            brand: {
                name: 'Adidas',
                logo: 'https://logo.clearbit.com/adidas.com'
            },
            status: 'Expired',
            budget: '$4200',
        },
        {
            id: 4,
            campaignName: 'Holiday Special',
            brand: {
                name: 'H&M',
                logo: 'https://logo.clearbit.com/hm.com'
            },
            status: 'Active',
            budget: '$6000',
        },
        {
            id: 5,
            campaignName: 'Spring Collection',
            brand: {
                name: 'Puma',
                logo: 'https://logo.clearbit.com/puma.com'
            },
            status: 'Active',
            budget: '$4800',
        },
        {
            id: 6,
            campaignName: 'Winter Essentials',
            brand: {
                name: 'Under Armour',
                logo: 'https://logo.clearbit.com/underarmour.com'
            },
            status: 'Expired',
            budget: '$3800',
        }
    ]);

    const handleAccept = (id) => {
        setInvitations(invitations.filter(inv => inv.id !== id));
        toast.success('Invitation accepted successfully!', {
            position: "top-right",
            autoClose: 3000,
        });
    };

    const handleReject = (id) => {
        setInvitations(invitations.filter(inv => inv.id !== id));
        toast.info('Invitation rejected', {
            position: "top-right",
            autoClose: 3000,
        });
    };

    const handleRowClick = (id) => {
        console.log('Clicked row:', id);
        // You can implement navigation or modal opening here
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <ToastContainer />
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Campaign Name</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Invited By</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Budget</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5 min-w-[200px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invitations.map((invitation) => (
                                <motion.tr 
                                    key={invitation.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    whileHover={{ backgroundColor: '#f8f9fa' }}
                                    onClick={() => handleRowClick(invitation.id)}
                                    className="cursor-pointer transition-colors duration-150 h-18"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {invitation.campaignName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img 
                                                    className="h-10 w-10 rounded-full object-cover" 
                                                    src={invitation.brand.logo} 
                                                    alt={invitation.brand.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.src = 'https://via.placeholder.com/40';
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{invitation.brand.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${invitation.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {invitation.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {invitation.budget}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAccept(invitation.id);
                                                }}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                            >
                                                Accept
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReject(invitation.id);
                                                }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Reject
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {invitations.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No invitations</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any pending invitations at this time.</p>
                </div>
            )}
        </div>
    );
};

export default Invitations;