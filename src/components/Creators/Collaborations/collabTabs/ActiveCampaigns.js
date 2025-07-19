// import React, { useState, useEffect } from 'react';
// import { Box, Modal } from '@mui/material';
// import Pagination from '@mui/material/Pagination';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { applyCampaign } from '../../../../services/creators/CreatorsServices';

// const ShimmerCard = () => (
//     <div className="card" style={{
//         borderRadius: '16px',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//         overflow: 'hidden',
//         background: '#f6f7f8',
//     }}>
//         <div style={{
//             position: 'relative',
//             paddingTop: '56.25%',
//             background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
//             backgroundSize: '200% 100%',
//             animation: 'shimmer 1.5s infinite',
//         }} />
//         <div style={{ padding: '16px' }}>
//             <div style={{
//                 height: '24px',
//                 width: '80%',
//                 background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
//                 backgroundSize: '200% 100%',
//                 animation: 'shimmer 1.5s infinite',
//                 marginBottom: '8px',
//                 borderRadius: '4px',
//             }} />
//             <div style={{
//                 height: '60px',
//                 width: '100%',
//                 background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
//                 backgroundSize: '200% 100%',
//                 animation: 'shimmer 1.5s infinite',
//                 marginBottom: '16px',
//                 borderRadius: '4px',
//             }} />
//             <div style={{
//                 height: '36px',
//                 width: '120px',
//                 background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
//                 backgroundSize: '200% 100%',
//                 animation: 'shimmer 1.5s infinite',
//                 borderRadius: '8px',
//             }} />
//         </div>
//     </div>
// );

// const ShimmerGrid = () => (
//     <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//         gap: '24px',
//         padding: '20px'
//     }}>
//         {[...Array(6)].map((_, index) => (
//             <ShimmerCard key={index} />
//         ))}
//     </div>
// );

// const ActiveCampaigns = ({ campaigns, loading, onRefresh }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [slideDirection, setSlideDirection] = useState('right');
//     const [animating, setAnimating] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showFilters, setShowFilters] = useState(false);

//     // Check if campaigns exists and has the expected structure
//     const campaignData = campaigns?.data || [];
//     const pagination = campaigns?.pagination || { currentPage: 1, totalPages: 1 };

//     // Filter campaigns based on search query
//     const filteredCampaigns = campaignData.filter(campaign =>
//         campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <Box sx={{ position: 'relative', overflow: 'hidden' }}>
//             <style>
//                 {`
//                     @keyframes shimmer {
//                         0% { background-position: -200% 0; }
//                         100% { background-position: 200% 0; }
//                     }
//                 `}
//             </style>

//             {/* Search and filter section */}
//             <Box sx={{
//                 padding: '20px 20px 0 20px',
//                 display: 'flex',
//                 gap: '12px',
//                 alignItems: 'flex-start'
//             }}>
//                 <div style={{ flex: 1, position: 'relative' }}>
//                     <input
//                         type="text"
//                         placeholder="Search campaigns..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         style={{
//                             width: '100%',
//                             padding: '12px',
//                             borderRadius: '8px',
//                             border: '1px solid #ddd',
//                             fontSize: '16px'
//                         }}
//                     />
//                 </div>
//                 <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     style={{
//                         padding: '12px 24px',
//                         borderRadius: '8px',
//                         border: '1px solid #ddd',
//                         backgroundColor: showFilters ? '#007BFF' : 'white',
//                         color: showFilters ? 'white' : '#333',
//                         cursor: 'pointer',
//                         fontSize: '16px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                     }}
//                 >
//                     <span>Filter</span>
//                     <span style={{ fontSize: '18px' }}>
//                         {showFilters ? '▼' : '▲'}
//                     </span>
//                 </button>
//             </Box>

//             {/* Filter options panel */}
//             {showFilters && (
//                 <Box sx={{
//                     padding: '20px',
//                     backgroundColor: '#f5f5f5',
//                     margin: '0 20px 20px 20px',
//                     borderRadius: '8px'
//                 }}>
//                     {/* Add your filter options here */}
//                     <div>Filter options will go here</div>
//                 </Box>
//             )}

//             <Box
//                 sx={{
//                     transition: 'all 0.3s ease-out',
//                     opacity: animating ? 0 : 1,
//                     transform: animating
//                         ? `translateX(${slideDirection === 'left' ? '-10%' : '10%'})`
//                         : 'translateX(0)',
//                 }}
//             >
//                 {loading ? (
//                     <ShimmerGrid />
//                 ) : (
//                     <ActiveCampaignsCards campaigns={filteredCampaigns} onRefresh={onRefresh} />
//                 )}
//             </Box>

//             {!loading && pagination.totalPages > 1 && (
//                 <Pagination
//                     count={pagination.totalPages}
//                     page={pagination.currentPage}
//                     onChange={(event, newPage) => {
//                         setSlideDirection(newPage > currentPage ? 'left' : 'right');
//                         setAnimating(true);
//                         setCurrentPage(newPage);
//                         // Add your pagination callback here to fetch new data

//                         setTimeout(() => {
//                             requestAnimationFrame(() => {
//                                 setAnimating(false);
//                             });
//                         }, 150);
//                     }}
//                     sx={{
//                         mt: 2,
//                         display: 'flex',
//                         justifyContent: 'center',
//                     }}
//                 />
//             )}
//         </Box>
//     );
// };

// const ActiveCampaignsCards = ({ campaigns, onRefresh }) => {
//     const [selectedCampaign, setSelectedCampaign] = useState(null);
//     const [openModal, setOpenModal] = useState(false);
//     const [applicationMessage, setApplicationMessage] = useState("I'm interested in working on this campaign");

//     const handleOpenModal = (campaign) => {
//         setSelectedCampaign(campaign);
//         setOpenModal(true);
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//         setSelectedCampaign(null);
//     };

//     const handleApply = async (campaignId) => {
//         try {
//             await applyCampaign(campaignId, applicationMessage);

//             toast.success('Successfully applied to campaign!', {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//             });

//             handleCloseModal();
//             setApplicationMessage("I'm interested in working on this campaign"); // Reset message
            
//             if(onRefresh){
//                 onRefresh()
//             }
//         } catch (error) {
//             // Error toasts based on error type
//             if (error.message.includes('already applied')) {
//                 toast.warning('You have already applied to this campaign', {
//                     position: "top-right",
//                     autoClose: 4000,
//                 });
//             } else if (error.message.includes('not accepting applications')) {
//                 toast.error('This campaign is not accepting applications', {
//                     position: "top-right",
//                     autoClose: 4000,
//                 });
//             } else {
//                 toast.error(`Error: ${error.message}`, {
//                     position: "top-right",
//                     autoClose: 4000,
//                 });
//             }
//         }
//     };

//     return (
//         <div className="active-campaigns-cards">
//             {/* Add ToastContainer at the root level */}
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />

//             <div className="cards-grid" style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                 gap: '24px',
//                 padding: '20px'
//             }}>
//                 {campaigns.map(campaign => (
//                     <div key={campaign.id} className="card" style={{
//                         borderRadius: '16px',
//                         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//                         overflow: 'hidden',
//                         position: 'relative' // Added for badge positioning
//                     }}>

//                         {campaign.application_status === 'applied' && (
//                             <div style={{
//                                 position: 'absolute',
//                                 top: '12px',
//                                 right: '12px',
//                                 backgroundColor: '#4CAF50',
//                                 color: 'white',
//                                 padding: '4px 12px',
//                                 borderRadius: '20px',
//                                 fontSize: '12px',
//                                 fontWeight: '500',
//                                 zIndex: 1
//                             }}>
//                                 Applied
//                             </div>
//                         )}
//                         <div style={{
//                             backgroundColor: '#f5f5f5',
//                             padding: '20px',
//                             textAlign: 'center'
//                         }}>
//                             <h2 style={{
//                                 fontFamily: 'Inter, sans-serif',
//                                 fontSize: '18px',
//                                 color: '#333'
//                             }}>
//                                 {campaign.brand_name}
//                             </h2>
//                         </div>
//                         <div className="card-content" style={{ padding: '16px' }}>
//                             <h3 style={{
//                                 fontFamily: 'Inter, sans-serif',
//                                 fontSize: '16px',
//                                 fontWeight: 600,
//                                 marginBottom: '8px'
//                             }}>
//                                 {campaign.name}
//                             </h3>
//                             <p style={{
//                                 fontFamily: 'Inter, sans-serif',
//                                 fontSize: '14px',
//                                 fontWeight: 400,
//                                 color: '#666',
//                                 marginBottom: '16px'
//                             }}>
//                                 {campaign.description}
//                             </p>
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                                 marginBottom: '16px'
//                             }}>
//                                 <span style={{ color: '#007BFF', fontWeight: 500 }}>
//                                     Budget: ${parseFloat(campaign.budget).toLocaleString()}
//                                 </span>
//                                 <span style={{ color: '#666' }}>
//                                     {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
//                                 </span>
//                             </div>
//                             <div style={{
//                                 backgroundColor: '#f5f5f5',
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 marginBottom: '16px'
//                             }}>
//                                 <span style={{ fontSize: '14px' }}>
//                                     Target Audience: {campaign.target_audience}
//                                 </span>
//                             </div>
//                             <button
//                                 onClick={() => handleOpenModal(campaign)}
//                                 style={{
//                                     backgroundColor: campaign.application_status === 'applied' ? '#4CAF50' : '#007BFF',
//                                     color: 'white',
//                                     padding: '8px 16px',
//                                     borderRadius: '8px',
//                                     border: 'none',
//                                     fontFamily: 'Inter, sans-serif',
//                                     fontSize: '14px',
//                                     fontWeight: 500,
//                                     cursor: 'pointer',
//                                     width: '100%'
//                                 }}
//                             >
//                                 {campaign.application_status === 'applied' ? 'View Application' : 'View Campaign Details'}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <Modal
//                 open={openModal}
//                 onClose={handleCloseModal}
//                 aria-labelledby="campaign-details-modal"
//                 aria-describedby="campaign-detailed-information"
//             >
//                 <Box sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: '95%', // Slightly wider
//                     maxWidth: '1000px', // Increased from 800px
//                     bgcolor: 'background.paper',
//                     borderRadius: '16px',
//                     boxShadow: 24,
//                     p: 4,
//                     maxHeight: '95vh', // Increased from 90vh
//                     overflow: 'auto',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '24px' // Consistent spacing between sections
//                 }}>
//                     {selectedCampaign && (
//                         <>
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                                 marginBottom: '24px'
//                             }}>
//                                 <h2 style={{
//                                     margin: 0,
//                                     fontFamily: 'Inter, sans-serif',
//                                     fontSize: '24px',
//                                     color: '#333'
//                                 }}>
//                                     {selectedCampaign.brand_name}
//                                 </h2>
//                                 <button
//                                     onClick={handleCloseModal}
//                                     style={{
//                                         background: 'none',
//                                         border: 'none',
//                                         fontSize: '24px',
//                                         cursor: 'pointer',
//                                         padding: '4px'
//                                     }}
//                                 >
//                                     ×
//                                 </button>
//                             </div>

//                             <div style={{ marginBottom: '24px' }}>
//                                 <h3 style={{
//                                     fontFamily: 'Inter, sans-serif',
//                                     fontSize: '20px',
//                                     marginBottom: '8px'
//                                 }}>
//                                     {selectedCampaign.name}
//                                 </h3>
//                                 <p style={{
//                                     fontSize: '16px',
//                                     lineHeight: '1.6',
//                                     color: '#666'
//                                 }}>
//                                     {selectedCampaign.description}
//                                 </p>
//                             </div>

//                             <div style={{
//                                 display: 'grid',
//                                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                                 gap: '24px',
//                                 marginBottom: '24px'
//                             }}>
//                                 <div>
//                                     <h4 style={{ color: '#666', marginBottom: '8px' }}>Campaign Budget</h4>
//                                     <p style={{ fontSize: '18px', fontWeight: '600', color: '#007BFF' }}>
//                                         ${parseFloat(selectedCampaign.budget).toLocaleString()}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <h4 style={{ color: '#666', marginBottom: '8px' }}>Duration</h4>
//                                     <p>
//                                         {new Date(selectedCampaign.start_date).toLocaleDateString()} -
//                                         {new Date(selectedCampaign.end_date).toLocaleDateString()}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <h4 style={{ color: '#666', marginBottom: '8px' }}>Target Audience</h4>
//                                     <p>{selectedCampaign.target_audience}</p>
//                                 </div>
//                             </div>

//                             <div style={{
//                                 display: 'grid',
//                                 gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//                                 gap: '16px',
//                                 maxHeight: '300px',
//                                 overflow: 'auto',
//                                 padding: '16px',
//                                 backgroundColor: '#f8f9fa',
//                                 borderRadius: '12px'
//                             }}>
//                                 {selectedCampaign.mediaFiles?.map((media, index) => (
//                                     <div key={index} style={{
//                                         position: 'relative',
//                                         paddingTop: '56.25%', // 16:9 aspect ratio
//                                         backgroundColor: '#eee',
//                                         borderRadius: '8px',
//                                         overflow: 'hidden'
//                                     }}>
//                                         {media.type === 'image' ? (
//                                             <img
//                                                 src={media.url}
//                                                 alt={`Campaign media ${index + 1}`}
//                                                 style={{
//                                                     position: 'absolute',
//                                                     top: 0,
//                                                     left: 0,
//                                                     width: '100%',
//                                                     height: '100%',
//                                                     objectFit: 'cover'
//                                                 }}
//                                             />
//                                         ) : (
//                                             <video
//                                                 src={media.url}
//                                                 controls
//                                                 style={{
//                                                     position: 'absolute',
//                                                     top: 0,
//                                                     left: 0,
//                                                     width: '100%',
//                                                     height: '100%',
//                                                     objectFit: 'cover'
//                                                 }}
//                                             />
//                                         )}
//                                     </div>
//                                 ))}
//                                 {(!selectedCampaign.mediaFiles || selectedCampaign.mediaFiles.length === 0) && (
//                                     <div style={{
//                                         padding: '20px',
//                                         textAlign: 'center',
//                                         color: '#666'
//                                     }}>
//                                         No media files available for this campaign
//                                     </div>
//                                 )}
//                             </div>

//                             <div style={{
//                                 backgroundColor: '#f8f9fa',
//                                 padding: '20px',
//                                 borderRadius: '12px',
//                                 marginBottom: '24px'
//                             }}>
//                                 <h4 style={{
//                                     color: '#333',
//                                     marginBottom: '12px',
//                                     fontSize: '18px'
//                                 }}>
//                                     Application Message
//                                 </h4>
//                                 <textarea
//                                     value={applicationMessage}
//                                     onChange={(e) => setApplicationMessage(e.target.value)}
//                                     placeholder="Write your message to the brand..."
//                                     style={{
//                                         width: '100%',
//                                         minHeight: '120px',
//                                         padding: '12px',
//                                         borderRadius: '8px',
//                                         border: '1px solid #ddd',
//                                         fontSize: '16px',
//                                         fontFamily: 'Inter, sans-serif',
//                                         resize: 'vertical',
//                                         marginBottom: '8px'
//                                     }}
//                                 />
//                                 <p style={{
//                                     fontSize: '14px',
//                                     color: '#666',
//                                     margin: '8px 0 0 0'
//                                 }}>
//                                     Explain why you'd be a great fit for this campaign
//                                 </p>
//                             </div>

//                             <div style={{
//                                 backgroundColor: '#f8f9fa',
//                                 padding: '20px',
//                                 borderRadius: '12px'
//                             }}>
//                                 <h4 style={{
//                                     color: '#333',
//                                     marginBottom: '12px',
//                                     fontSize: '18px'
//                                 }}>Campaign Requirements</h4>
//                                 <ul style={{
//                                     listStyle: 'none',
//                                     padding: 0,
//                                     margin: 0
//                                 }}>
//                                     {selectedCampaign.requirements?.map((requirement, index) => (
//                                         <li key={index} style={{
//                                             padding: '8px 0',
//                                             borderBottom: index !== selectedCampaign.requirements.length - 1 ? '1px solid #eee' : 'none'
//                                         }}>
//                                             • {requirement}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <div style={{
//                                 display: 'flex',
//                                 gap: '16px',
//                                 width: '100%'
//                             }}>
//                                 <button
//                                     onClick={() => handleApply(selectedCampaign.id)}
//                                     style={{
//                                         backgroundColor: '#007BFF',
//                                         color: 'white',
//                                         padding: '12px 24px',
//                                         borderRadius: '8px',
//                                         border: 'none',
//                                         fontFamily: 'Inter, sans-serif',
//                                         fontSize: '16px',
//                                         fontWeight: 500,
//                                         cursor: 'pointer',
//                                         flex: '1'
//                                     }}
//                                 >
//                                     Apply for Campaign
//                                 </button>
//                                 <button
//                                     style={{
//                                         backgroundColor: 'white',
//                                         color: '#007BFF',
//                                         padding: '12px 24px',
//                                         borderRadius: '8px',
//                                         border: '2px solid #007BFF',
//                                         fontFamily: 'Inter, sans-serif',
//                                         fontSize: '16px',
//                                         fontWeight: 500,
//                                         cursor: 'pointer',
//                                         flex: '1',
//                                         transition: 'all 0.2s ease'
//                                     }}
//                                     onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'}
//                                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
//                                 >
//                                     Save for Later
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// // const ActiveCampaignsTable = ({campaigns}) => {

// //     const handleCampaignClick = (campaignId) => {
// //         // Add your navigation or action logic here
// //         console.log(`Clicked campaign: ${campaignId}`);
// //     };

// //     const getBrandTooltipContent = (brand) => {
// //         return `${brand.description}\n\nTarget Niches: ${brand.niches.join(', ')}`;
// //     };
// //     return (
// //         <div className="active-campaigns">
// //             <table className="campaigns-table">
// //                 <thead>
// //                     <tr>
// //                         <th>Campaign Name</th>
// //                         <th>Posted By</th>
// //                         <th>Budget</th>
// //                         <th>Posted On</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {campaigns.map((campaign) => (
// //                         <tr 
// //                             key={campaign.id}
// //                             onClick={() => handleCampaignClick(campaign.id)}
// //                             className="campaign-row"
// //                         >
// //                             <td>{campaign.campaignName}</td>
// //                             <td className="brand-cell">
// //                                 <img 
// //                                     src={campaign.brand.logo} 
// //                                     alt={`${campaign.brand.name} logo`}
// //                                     className="brand-logo"
// //                                 />
// //                                 <span className="brand-info" 
// //                                       data-tooltip={getBrandTooltipContent(campaign.brand)}>
// //                                     {campaign.brand.name}
// //                                 </span>
// //                             </td>
// //                             <td>${campaign.budget}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     )
// // }



// export default ActiveCampaigns;

import React, { useState, useEffect } from 'react';
import { Box, Modal, Pagination } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { applyCampaign } from '../../../../services/creators/CreatorsServices';
import { motion, AnimatePresence } from 'framer-motion';

// Shimmer Loading Components
const ShimmerCard = () => (
  <motion.div 
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
    className="bg-gray-100 rounded-xl overflow-hidden shadow-sm"
  >
    <div className="relative pt-[56.25%] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    <div className="p-4 space-y-3">
      <div className="h-6 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
      <div className="h-10 w-full bg-gray-200 rounded-lg mt-2" />
    </div>
  </motion.div>
);

const ShimmerGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
    {[...Array(6)].map((_, index) => (
      <ShimmerCard key={index} />
    ))}
  </div>
);

const ActiveCampaigns = ({ campaigns, loading, onRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState('right');
  const [animating, setAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const campaignData = campaigns?.data || [];
  const pagination = campaigns?.pagination || { currentPage: 1, totalPages: 1 };

  const filteredCampaigns = campaignData.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>

      {/* Search and filter section - kept exactly as in original code */}
      <Box sx={{
        padding: '20px 20px 0 20px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            backgroundColor: showFilters ? '#007BFF' : 'white',
            color: showFilters ? 'white' : '#333',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Filter</span>
          <span style={{ fontSize: '18px' }}>
            {showFilters ? '▼' : '▲'}
          </span>
        </button>
      </Box>

      {/* Filter options panel - kept exactly as in original code */}
      {showFilters && (
        <Box sx={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          margin: '0 20px 20px 20px',
          borderRadius: '8px'
        }}>
          <div>Filter options will go here</div>
        </Box>
      )}

      {/* Campaigns Grid with improved UI */}
      <Box
        sx={{
          transition: 'all 0.3s ease-out',
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${slideDirection === 'left' ? '-10%' : '10%'})`
            : 'translateX(0)',
        }}
      >
        {loading ? (
          <ShimmerGrid />
        ) : (
          <ActiveCampaignsCards campaigns={filteredCampaigns} onRefresh={onRefresh} />
        )}
      </Box>

      {!loading && pagination.totalPages > 1 && (
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={(event, newPage) => {
            setSlideDirection(newPage > currentPage ? 'left' : 'right');
            setAnimating(true);
            setCurrentPage(newPage);
            setTimeout(() => {
              requestAnimationFrame(() => {
                setAnimating(false);
              });
            }, 150);
          }}
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      )}
    </div>
  );
};

const ActiveCampaignsCards = ({ campaigns, onRefresh }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("I'm interested in working on this campaign");

  const handleOpenModal = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCampaign(null);
  };

  const handleApply = async (campaignId) => {
    try {
      await applyCampaign(campaignId, applicationMessage);
      toast.success('Successfully applied to campaign!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      handleCloseModal();
      setApplicationMessage("I'm interested in working on this campaign");
      
      if(onRefresh) {
        onRefresh();
      }
    } catch (error) {
      if (error.message.includes('already applied')) {
        toast.warning('You have already applied to this campaign', {
          position: "top-right",
          autoClose: 4000,
        });
      } else if (error.message.includes('not accepting applications')) {
        toast.error('This campaign is not accepting applications', {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error(`Error: ${error.message}`, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <div className="active-campaigns-cards">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {campaigns.map(campaign => (
          <motion.div 
            key={campaign.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
          >
            {campaign.application_status === 'applied' && (
              <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                Applied
              </div>
            )}
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {campaign.brand_name}
              </h2>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {campaign.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {campaign.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-blue-600 font-medium">
                  ${parseFloat(campaign.budget).toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="bg-gray-50 p-2 rounded-md mb-4">
                <span className="text-gray-700 text-sm">
                  Target: {campaign.target_audience}
                </span>
              </div>
              
              <button
                onClick={() => handleOpenModal(campaign)}
                className={`w-full py-2 rounded-lg font-medium transition-colors
                  ${campaign.application_status === 'applied' 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {campaign.application_status === 'applied' ? 'View Application' : 'View Details'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="campaign-details-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '95%',
          maxWidth: '1000px',
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: 24,
          p: 4,
          maxHeight: '95vh',
          overflow: 'auto',
          outline: 'none'
        }}>
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCampaign.brand_name}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedCampaign.name}
                </h3>
                <p className="text-gray-600">
                  {selectedCampaign.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">Campaign Budget</h4>
                  <p className="text-xl font-bold text-blue-600">
                    ${parseFloat(selectedCampaign.budget).toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">Duration</h4>
                  <p className="text-gray-700">
                    {new Date(selectedCampaign.start_date).toLocaleDateString()} - {new Date(selectedCampaign.end_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-500 mb-1">Target Audience</h4>
                  <p className="text-gray-700">{selectedCampaign.target_audience}</p>
                </div>
              </div>

              {selectedCampaign.mediaFiles?.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Media Gallery</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedCampaign.mediaFiles.map((media, index) => (
                      <div key={index} className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-100">
                        {media.type === 'image' ? (
                          <img
                            src={media.url}
                            alt={`Campaign media ${index + 1}`}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={media.url}
                            controls
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Application Message</h4>
                <textarea
                  value={applicationMessage}
                  onChange={(e) => setApplicationMessage(e.target.value)}
                  placeholder="Write your message to the brand..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                />
                <p className="text-sm text-gray-500">
                  Explain why you'd be a great fit for this campaign
                </p>
              </div>

              {selectedCampaign.requirements?.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Campaign Requirements</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedCampaign.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleApply(selectedCampaign.id)}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply for Campaign
                </button>
                <button
                  className="flex-1 py-3 bg-white text-blue-600 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Save for Later
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ActiveCampaigns;