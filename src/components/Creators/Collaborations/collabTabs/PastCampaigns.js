// const PastCampaigns = () => {
//     // Sample data - replace with actual data
//     const pastCampaigns = [
//         {
//             id: 1,
//             campaignName: 'Summer Collection 2023',
//             brand: {
//                 name: 'Nike',
//                 logo: '/path-to-logo.png'
//             },
//             startDate: '2023-06-01',
//             completionDate: '2023-08-15',
//             earnings: '$6,500'
//         },
//         {
//             id: 2,
//             campaignName: 'Winter Fashion Series',
//             brand: {
//                 name: 'Zara',
//                 logo: '/zara-logo.png'
//             },
//             startDate: '2023-11-01',
//             completionDate: '2023-12-31',
//             earnings: '$4,200'
//         }
//     ];

//     const handleRowClick = (id) => {
//         // Handle row click to show more details
//         console.log('Clicked campaign:', id);
//     };

//     return (
//         <div className="past-campaigns-container">
//             <div className="table-container">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Campaign Name</th>
//                             <th>Brand</th>
//                             <th>Started On</th>
//                             <th>Completed On</th>
//                             <th>Earnings</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {pastCampaigns.map((campaign) => (
//                             <tr 
//                                 key={campaign.id}
//                                 onClick={() => handleRowClick(campaign.id)}
//                                 className="table-row"
//                             >
//                                 <td className="campaign-cell">{campaign.campaignName}</td>
//                                 <td className="brand-cell">
//                                     <div className="brand-wrapper">
//                                         <img 
//                                             src={campaign.brand.logo} 
//                                             alt={campaign.brand.name}
//                                             className="brand-logo"
//                                         />
//                                         <span>{campaign.brand.name}</span>
//                                     </div>
//                                 </td>
//                                 <td className="date-cell">{new Date(campaign.startDate).toLocaleDateString()}</td>
//                                 <td className="date-cell">{new Date(campaign.completionDate).toLocaleDateString()}</td>
//                                 <td className="earnings-cell">{campaign.earnings}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <style jsx>{`
//                 .past-campaigns-container {
//                     padding: 20px;
//                 }

//                 .table-container {
//                     margin-top: 20px;
//                     border-radius: 8px;
//                     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//                     overflow-x: auto;
//                 }

//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     background: white;
//                     table-layout: fixed;
//                 }

//                 th, td {
//                     padding: 16px;
//                     text-align: left;
//                     border-bottom: 1px solid #eee;
//                     white-space: nowrap;
//                     overflow: hidden;
//                     text-overflow: ellipsis;
//                     vertical-align: middle;
//                 }

//                 th {
//                     background-color: #f8f9fa;
//                     font-weight: 600;
//                 }

//                 .table-row {
//                     cursor: pointer;
//                     transition: background-color 0.2s;
//                     height: 72px;
//                 }

//                 .table-row:hover {
//                     background-color: #f8f9fa;
//                 }

//                 .brand-cell {
//                     height: 72px;
//                     vertical-align: middle;
//                 }

//                 .brand-wrapper {
//                     display: flex;
//                     align-items: center;
//                     gap: 8px;
//                 }

//                 .brand-logo {
//                     width: 24px;
//                     height: 24px;
//                     border-radius: 50%;
//                     object-fit: cover;
//                 }

//                 .earnings-cell {
//                     font-weight: 600;
//                     color: #2e7d32;
//                 }

//                 th:nth-child(1), 
//                 td:nth-child(1) {
//                     width: 25%;
//                 }

//                 th:nth-child(2), 
//                 td:nth-child(2) {
//                     width: 25%;
//                 }

//                 th:nth-child(3), 
//                 td:nth-child(3),
//                 th:nth-child(4), 
//                 td:nth-child(4) {
//                     width: 15%;
//                 }

//                 th:nth-child(5), 
//                 td:nth-child(5) {
//                     width: 20%;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default PastCampaigns;


import React from 'react';
import { motion } from 'framer-motion';

const PastCampaigns = () => {
    // Sample data - replace with actual data
    const pastCampaigns = [
        {
            id: 1,
            campaignName: 'Summer Collection 2023',
            brand: {
                name: 'Nike',
                logo: 'https://logo.clearbit.com/nike.com'
            },
            startDate: '2023-06-01',
            completionDate: '2023-08-15',
            earnings: '$6,500',
            status: 'Completed'
        },
        {
            id: 2,
            campaignName: 'Winter Fashion Series',
            brand: {
                name: 'Zara',
                logo: 'https://logo.clearbit.com/zara.com'
            },
            startDate: '2023-11-01',
            completionDate: '2023-12-31',
            earnings: '$4,200',
            status: 'Completed'
        },
        {
            id: 3,
            campaignName: 'Spring Refresh',
            brand: {
                name: 'H&M',
                logo: 'https://logo.clearbit.com/hm.com'
            },
            startDate: '2023-03-15',
            completionDate: '2023-05-30',
            earnings: '$5,800',
            status: 'Completed'
        }
    ];

    const handleRowClick = (id) => {
        // Handle row click to show more details
        console.log('Clicked campaign:', id);
        // You can implement navigation or modal opening here
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="past-campaigns-container" style={{ padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="header" style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1a202c' }}>Past Campaigns</h1>
                <p style={{ color: '#718096', marginTop: '8px' }}>View your completed campaigns and earnings</p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="table-container" 
                style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden'
                }}
            >
                {pastCampaigns.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f7fafc' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase' }}>Campaign</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase' }}>Brand</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase' }}>Timeline</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase' }}>Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastCampaigns.map((campaign) => (
                                    <motion.tr
                                        key={campaign.id}
                                        whileHover={{ backgroundColor: '#f8f9fa' }}
                                        onClick={() => handleRowClick(campaign.id)}
                                        style={{
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #edf2f7',
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: '#ebf4ff',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: '12px'
                                                }}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4299e1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '500', color: '#2d3748' }}>{campaign.campaignName}</div>
                                                    <div style={{ fontSize: '12px', color: '#718096' }}>ID: {campaign.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img 
                                                    src={campaign.brand.logo} 
                                                    alt={campaign.brand.name}
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                        marginRight: '12px',
                                                        backgroundColor: '#e2e8f0'
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/32';
                                                    }}
                                                />
                                                <span style={{ fontWeight: '500' }}>{campaign.brand.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontSize: '14px' }}>{formatDate(campaign.startDate)}</div>
                                            <div style={{ fontSize: '12px', color: '#718096' }}>to {formatDate(campaign.completionDate)}</div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                backgroundColor: '#f0fff4',
                                                color: '#38a169'
                                            }}>
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', fontWeight: '600', color: '#38a169' }}>
                                            {campaign.earnings}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ 
                        padding: '40px', 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <svg 
                            width="48" 
                            height="48" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#a0aec0"
                            style={{ marginBottom: '16px' }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 style={{ 
                            fontSize: '18px', 
                            fontWeight: '600', 
                            color: '#2d3748',
                            marginBottom: '8px'
                        }}>
                            No past campaigns
                        </h3>
                        <p style={{ color: '#718096' }}>
                            You haven't completed any campaigns yet.
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PastCampaigns;