// import React, { useState, useEffect } from 'react';
// import {
//   PlusCircle,
//   Calendar,
//   DollarSign,
//   Users,
//   BarChart2,
//   Clock,
//   ChevronRight,
//   Instagram,
//   Youtube,
//   Videotape,
//   Image,
//   MessageSquare,
//   X,
//   Upload,
//   Send,
//   Paperclip
// } from 'lucide-react';
// import { createCampaign, getBrandCampaigns } from '../../services/brands/CreateNewCampaign';
// import { getCampaignResponses } from '../../services/brands/GetCampaignResponses';
// import { useMessages } from '../Brand/Context/MessagesContext';

// const CampaignManagement = () => {
//   const [activeTab, setActiveTab] = useState('active');
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [campaigns, setCampaigns] = useState({
//     active: [],
//     completed: [],
//     draft: []
//   });
//   const [campaignResponses, setCampaignResponses] = useState([]);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [selectedInfluencer, setSelectedInfluencer] = useState(null);

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   const fetchCampaigns = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await getBrandCampaigns();
      
//       // Process and categorize campaigns
//       const categorizedCampaigns = {
//         active: [],
//         completed: [],
//         draft: []
//       };

//       response.data.forEach(campaign => {
//         const baseCampaign = {
//           id: campaign.id,
//           name: campaign.name,
//           budget: `₹${campaign.budget}`,
//           // If campaign_media is already a base64 string, use it directly
//           campaign_media: campaign.campaign_media?.includes('data:') 
//             ? campaign.campaign_media 
//             : campaign.campaign_media 
//               ? `data:image/jpeg;base64,${campaign.campaign_media}` 
//               : null
//         };

//         switch (campaign.status) {
//           case 'ACTIVE':
//             categorizedCampaigns.active.push({
//               ...baseCampaign,
//               startDate: new Date(campaign.start_date).toISOString().split('T')[0],
//               endDate: new Date(campaign.end_date).toISOString().split('T')[0],
//               description: campaign.description,
//               progress: calculateProgress(campaign.start_date, campaign.end_date),
//               platform: 'Instagram',
//               target_audience: campaign.target_audience
//             });
//             break;
//           case 'COMPLETED':
//             categorizedCampaigns.completed.push({
//               ...baseCampaign,
//               metrics: {
//                 reach: '0',
//                 engagement: '0%',
//                 roi: '0x'
//               }
//             });
//             break;
//           case 'DRAFT':
//             categorizedCampaigns.draft.push({
//               ...baseCampaign,
//               lastEdited: new Date(campaign.updated_at).toISOString().split('T')[0]
//             });
//             break;
//           default:
//             break;
//         }
//       });

//       setCampaigns(categorizedCampaigns);
//     } catch (error) {
//       setError(error.message);
//       console.error('Failed to fetch campaigns:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCampaignResponses = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await getCampaignResponses();
//       if (response.data) {
//         setCampaignResponses(response.data);
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error('Failed to fetch campaign responses:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === 'responses') {
//       fetchCampaignResponses();
//     }
//   }, [activeTab]);

//   const calculateProgress = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const current = new Date();
    
//     if (current < start) return 0;
//     if (current > end) return 100;
    
//     const total = end - start;
//     const progress = current - start;
//     return Math.round((progress / total) * 100);
//   };

//   const getProgressColor = (progress) => {
//     if (progress >= 75) return 'bg-green-500';
//     if (progress >= 50) return 'bg-blue-500';
//     if (progress >= 25) return 'bg-yellow-500';
//     return 'bg-red-500';
//   };

//   const renderActiveCampaigns = () => (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {campaigns.active.map(campaign => (
//         <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {campaign.campaign_media && (
//             <div className="w-full h-48 overflow-hidden">
//               <img 
//                 src={campaign.campaign_media} 
//                 alt={campaign.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold">{campaign.name}</h3>
//                 <div className="flex items-center text-gray-500 mt-1">
//                   <DollarSign className="w-4 h-4 mr-1" />
//                   <span>{campaign.budget}</span>
//                 </div>
//               </div>
//               <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
//                 {campaign.platform}
//               </span>
//             </div>

//             <div className="space-y-4">
//               {/* Dates */}
//               <div className="flex items-center text-sm text-gray-600">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 <span>{campaign.startDate} - {campaign.endDate}</span>
//               </div>

//               {/* Progress Bar */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium">Progress</span>
//                   <span className="text-sm text-gray-500">{campaign.progress}%</span>
//                 </div>
//                 <div className="w-full bg-gray-100 rounded-full h-2">
//                   <div
//                     className={`${getProgressColor(campaign.progress)} h-2 rounded-full transition-all`}
//                     style={{ width: `${campaign.progress}%` }}
//                   ></div>
//                 </div>
//               </div>

//               {/* Influencers */}
//               {/* <div>
//                 <h4 className="text-sm font-medium mb-2">Assigned Influencers</h4>
//                 <div className="space-y-2">
//                   {campaign.influencers.map((influencer, idx) => (
//                     <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                       <div className="flex items-center">
//                         <img
//                           src={influencer.avatar}
//                           alt={influencer.name}
//                           className="w-8 h-8 rounded-full"
//                         />
//                         <span className="ml-2 text-sm">{influencer.name}</span>
//                       </div>
//                       <span className="text-sm text-gray-500">{influencer.status}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div> */}
//             </div>

//             <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//               View Details
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const renderCompletedCampaigns = () => (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {campaigns.completed.map(campaign => (
//         <div key={campaign.id} className="bg-white rounded-lg shadow-sm p-6">
//           {campaign.campaign_media && (
//             <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
//               <img 
//                 src={campaign.campaign_media} 
//                 alt={campaign.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}
//           <div className="flex justify-between items-start mb-4">
//             <h3 className="font-semibold">{campaign.name}</h3>
//             <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
//               Completed
//             </span>
//           </div>

//           <div className="text-gray-500 mb-4">
//             <DollarSign className="inline w-4 h-4 mr-1" />
//             {campaign.budget}
//           </div>

//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <div className="text-center">
//               <p className="text-sm text-gray-500">Reach</p>
//               <p className="font-medium">{campaign.metrics.reach}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-sm text-gray-500">Engagement</p>
//               <p className="font-medium">{campaign.metrics.engagement}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-sm text-gray-500">ROI</p>
//               <p className="font-medium">{campaign.metrics.roi}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const renderDraftCampaigns = () => (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {campaigns.draft.map(campaign => (
//         <div key={campaign.id} className="bg-white rounded-lg shadow-sm p-6">
//           {campaign.campaign_media && (
//             <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
//               <img 
//                 src={campaign.campaign_media} 
//                 alt={campaign.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}
//           <div className="flex justify-between items-start mb-4">
//             <h3 className="font-semibold">{campaign.name}</h3>
//             <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
//               Draft
//             </span>
//           </div>

//           <div className="flex items-center text-gray-500 mb-4">
//             <DollarSign className="w-4 h-4 mr-1" />
//             <span>{campaign.budget}</span>
//           </div>

//           <div className="flex items-center text-sm text-gray-500 mt-4">
//             <Clock className="w-4 h-4 mr-2" />
//             <span>Last edited: {campaign.lastEdited}</span>
//           </div>

//           <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//             Continue Editing
//           </button>
//         </div>
//       ))}
//     </div>
//   );

//   const renderResponses = () => (
//     <div className="space-y-6">
//       {campaignResponses.map(campaign => (
//         <div key={campaign.campaign_id} className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <h3 className="text-lg font-semibold">{campaign.campaign_title}</h3>
//               <p className="text-sm text-gray-500">
//                 Created: {new Date(campaign.campaign_created_at).toLocaleDateString()}
//               </p>
//             </div>
//             <div className="flex items-center space-x-3">
//               <span className="text-sm text-gray-500">
//                 {campaign.applications?.length || 0} responses
//               </span>
//               <span className={`px-3 py-1 rounded-full text-sm ${
//                 campaign.campaign_status === 'ACTIVE' 
//                   ? 'bg-green-100 text-green-600'
//                   : 'bg-gray-100 text-gray-600'
//               }`}>
//                 {campaign.campaign_status}
//               </span>
//             </div>
//           </div>

//           {campaign.applications && campaign.applications.length > 0 ? (
//             <div className="space-y-4">
//               <h4 className="font-medium text-gray-700">Applications ({campaign.applications.length})</h4>
//               <div className="divide-y">
//                 {campaign.applications.map(application => (
//                   <div key={application.application_id} className="py-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex items-center">
//                         <div className="mr-3">
//                           <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                             <Users className="w-5 h-5 text-blue-600" />
//                           </div>
//                         </div>
//                         <div>
//                           <h5 className="font-medium">{application.influencer.name}</h5>
//                           <p className="text-sm text-gray-500">{application.influencer.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
//                           {application.status}
//                         </span>
//                         {application.status === 'applied' && (
//                           <button 
//                             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
//                             onClick={() => {
//                               setSelectedInfluencer(application.influencer);
//                               setIsChatOpen(true);
//                             }}
//                           >
//                             Proceed to Talk
//                           </button>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="ml-13 pl-13">
//                       <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
//                         {application.message}
//                       </p>
                      
//                       <div className="mt-2 flex items-center space-x-4">
//                         <p className="text-sm text-gray-500">
//                           Applied: {new Date(application.applied_at).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 py-4">No applications received yet</p>
//           )}
//         </div>
//       ))}
      
//       {campaignResponses.length === 0 && (
//         <div className="text-center py-10">
//           <div className="mb-4">
//             <MessageSquare className="w-12 h-12 text-gray-400 mx-auto" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900">No responses yet</h3>
//           <p className="text-gray-500">When influencers apply to your campaigns, they'll appear here.</p>
//         </div>
//       )}
//     </div>
//   );

//   const handleCreateCampaign = async (campaignData) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await createCampaign(campaignData);

//       // Update the local state with the new campaign
//       const newCampaign = {
//         id: response.id,
//         name: response.campaignName,
//         budget: response.campaignBudget,
//         lastEdited: new Date().toISOString().split('T')[0],
//         platform: 'Instagram', // You might want to make this dynamic
//         ...response
//       };

//       // If all required fields are filled, add to active campaigns
//       // Otherwise, add to drafts
//       const isComplete = [
//         campaignData.name,
//         campaignData.description,
//         campaignData.startDate,
//         campaignData.endDate,
//         campaignData.budget,
//         campaignData.targetAudience
//       ].every(field => field && field.trim() !== '');

//       setCampaigns(prev => ({
//         ...prev,
//         [isComplete ? 'active' : 'draft']: [
//           ...prev[isComplete ? 'active' : 'draft'],
//           newCampaign
//         ]
//       }));

//       setIsCreateModalOpen(false);
//       // Show success message (you'll need to implement this)

//     } catch (error) {
//       setError(error.message);
//       console.error('Failed to create campaign:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !campaigns.active.length && !campaigns.completed.length && !campaigns.draft.length) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         <p>Error loading campaigns: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b p-4">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
//           <h1 className="text-2xl font-bold text-gray-800">Campaigns</h1>
//           <button
//             onClick={() => setIsCreateModalOpen(true)}
//             className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             <PlusCircle className="w-5 h-5 mr-2" />
//             Create New Campaign
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex space-x-6 mt-6">
//           {[
//             { id: 'active', label: 'Active Campaigns', count: campaigns.active.length },
//             { id: 'completed', label: 'Completed', count: campaigns.completed.length },
//             { id: 'draft', label: 'Draft', count: campaigns.draft.length },
//             { id: 'responses', label: 'Responses', count: campaignResponses?.length || 0 }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`pb-3 relative ${activeTab === tab.id
//                   ? 'text-blue-600 font-medium'
//                   : 'text-gray-500 hover:text-gray-700'
//                 }`}
//             >
//               <span>{tab.label}</span>
//               <span className="ml-2 text-sm text-gray-400">({tab.count})</span>
//               {activeTab === tab.id && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Campaign Content */}
//       <div className="p-6">
//         {activeTab === 'active' && renderActiveCampaigns()}
//         {activeTab === 'completed' && renderCompletedCampaigns()}
//         {activeTab === 'draft' && renderDraftCampaigns()}
//         {activeTab === 'responses' && renderResponses()}
//       </div>

//       <CreateCampaignModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onSubmit={handleCreateCampaign}
//         loading={loading}
//       />

//       <ChatModal 
//         isOpen={isChatOpen}
//         onClose={() => setIsChatOpen(false)}
//         influencer={selectedInfluencer}
//       />
//     </div>
//   );
// };

// export default CampaignManagement;




// const CreateCampaignModal = ({ isOpen, onClose, onSubmit, loading }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     budget: '',
//     targetAudience: '',
//     mediaFiles: []
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit

//     setFormData(prev => ({
//       ...prev,
//       mediaFiles: [...prev.mediaFiles, ...validFiles]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if at least the name is provided
//     if (!formData.name.trim()) {
//       alert('Campaign name is required');
//       return;
//     }

//     try {
//       await onSubmit(formData);
//     } catch (error) {
//       // Handle error (show error message to user)
//       console.error('Error creating campaign:', error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Create New Campaign</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Campaign Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               required
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               rows="3"
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 required
//                 className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 required
//                 className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Budget (₹)
//             </label>
//             <input
//               type="number"
//               name="budget"
//               required
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Target Audience
//             </label>
//             <textarea
//               name="targetAudience"
//               rows="2"
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Describe your target audience..."
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Media Files (Max 5MB each)
//             </label>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="mediaFiles"
//               />
//               <label
//                 htmlFor="mediaFiles"
//                 className="flex flex-col items-center cursor-pointer"
//               >
//                 <Upload className="w-8 h-8 text-gray-400" />
//                 <span className="mt-2 text-sm text-gray-500">
//                   Click to upload or drag and drop
//                 </span>
//               </label>
//             </div>
//             {formData.mediaFiles.length > 0 && (
//               <div className="mt-2">
//                 <p className="text-sm text-gray-500">
//                   {formData.mediaFiles.length} file(s) selected
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating...
//                 </>
//               ) : (
//                 'Create Campaign'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };



// // Add this component at the bottom of the file
// const ChatModal = ({ isOpen, onClose, influencer }) => {
//   const { addMessage } = useMessages();
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([
//     // Sample messages for demo
//     {
//       id: 1,
//       sender: 'influencer',
//       text: 'Hi! Im interested in your campaign.',
//       timestamp: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       sender: 'brand',
//       text: 'Hello! Thanks for your interest. Lets discuss the details.',
//       timestamp: new Date().toISOString(),
//     }
//   ]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     const newMessage = {
//       id: Date.now(),
//       sender: 'brand',
//       text: message,
//       timestamp: new Date().toISOString(),
//     };

//     // Add to messages state
//     setMessages([...messages, newMessage]);
    
//     // Update global message context
//     addMessage(influencer.id, {
//       text: message,
//       influencerName: influencer.name,
//       campaignTitle: influencer.campaign, // Make sure this is passed in props
//       timestamp: new Date().toISOString(),
//       attachments: []
//     });

//     setMessage('');
//   };

//   const handleFileAttachment = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Handle file upload logic here
//     console.log('File attached:', file);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//       <div className="w-full max-w-md bg-white h-full flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b flex items-center justify-between bg-white">
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <Users className="w-5 h-5 text-blue-600" />
//             </div>
//             <div className="ml-3">
//               <h3 className="font-medium">{influencer?.name}</h3>
//               <p className="text-sm text-gray-500">{influencer?.email}</p>
//             </div>
//           </div>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.sender === 'brand' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-lg p-3 ${
//                   msg.sender === 'brand'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 <p>{msg.text}</p>
//                 <p className="text-xs mt-1 opacity-70">
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input Area */}
//         <div className="p-4 border-t bg-white">
//           <form onSubmit={handleSendMessage} className="flex space-x-4">
//             <input
//               type="file"
//               id="attachment"
//               className="hidden"
//               onChange={handleFileAttachment}
//               accept="image/*,.pdf,.doc,.docx"
//             />
//             <label
//               htmlFor="attachment"
//               className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
//             >
//               <Paperclip className="w-6 h-6" />
//             </label>
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               <Send className="w-6 h-6" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Calendar,
  DollarSign,
  Users,
  BarChart2,
  Clock,
  ChevronRight,
  Instagram,
  Youtube,
  Videotape,
  Image,
  MessageSquare,
  X,
  Upload,
  Send,
  Paperclip,
  Check,
  MoreVertical
} from 'lucide-react';
import { createCampaign, getBrandCampaigns } from '../../services/brands/CreateNewCampaign';
import { getCampaignResponses } from '../../services/brands/GetCampaignResponses';
import { useMessages } from '../Brand/Context/MessagesContext';

const CampaignManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [campaigns, setCampaigns] = useState({
    active: [],
    completed: [],
    draft: []
  });
  const [campaignResponses, setCampaignResponses] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getBrandCampaigns();
      
      // Process and categorize campaigns
      const categorizedCampaigns = {
        active: [],
        completed: [],
        draft: []
      };

      response.data.forEach(campaign => {
        const baseCampaign = {
          id: campaign.id,
          name: campaign.name,
          budget: `₹${campaign.budget}`,
          campaign_media: campaign.campaign_media?.includes('data:') 
            ? campaign.campaign_media 
            : campaign.campaign_media 
              ? `data:image/jpeg;base64,${campaign.campaign_media}` 
              : null
        };

        switch (campaign.status) {
          case 'ACTIVE':
            categorizedCampaigns.active.push({
              ...baseCampaign,
              startDate: new Date(campaign.start_date).toISOString().split('T')[0],
              endDate: new Date(campaign.end_date).toISOString().split('T')[0],
              description: campaign.description,
              progress: calculateProgress(campaign.start_date, campaign.end_date),
              platform: 'Instagram',
              target_audience: campaign.target_audience
            });
            break;
          case 'COMPLETED':
            categorizedCampaigns.completed.push({
              ...baseCampaign,
              metrics: {
                reach: Math.floor(Math.random() * 10000).toLocaleString(),
                engagement: `${Math.floor(Math.random() * 30)}%`,
                roi: `${(Math.random() * 10).toFixed(1)}x`
              }
            });
            break;
          case 'DRAFT':
            categorizedCampaigns.draft.push({
              ...baseCampaign,
              lastEdited: new Date(campaign.updated_at).toLocaleDateString()
            });
            break;
          default:
            break;
        }
      });

      setCampaigns(categorizedCampaigns);
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaignResponses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCampaignResponses();
      if (response.data) {
        setCampaignResponses(response.data);
      }
    } catch (error) {
      setError(error.message);
      console.error('Failed to fetch campaign responses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'responses') {
      fetchCampaignResponses();
    }
  }, [activeTab]);

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date();
    
    if (current < start) return 0;
    if (current > end) return 100;
    
    const total = end - start;
    const progress = current - start;
    return Math.round((progress / total) * 100);
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderActiveCampaigns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {campaigns.active.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
          {campaign.campaign_media && (
            <div className="w-full h-48 overflow-hidden relative">
              <img 
                src={campaign.campaign_media} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm">
                <Instagram className="w-5 h-5 text-pink-600" />
              </div>
            </div>
          )}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                <div className="flex items-center text-gray-500 mt-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{campaign.budget}</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                {campaign.platform}
              </span>
            </div>

            <div className="space-y-4">
              {/* Dates */}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${getProgressColor(campaign.progress)} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {campaign.description || "No description provided"}
              </p>
            </div>

            <button className="mt-6 w-full py-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100 font-medium text-sm">
              View Details
            </button>
          </div>
        </div>
      ))}
      
      {campaigns.active.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <BarChart2 className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No active campaigns</h3>
          <p className="text-gray-500 text-center max-w-md">
            You don't have any active campaigns right now. Create a new campaign to get started.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );

  const renderCompletedCampaigns = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.completed.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
          {campaign.campaign_media && (
            <div className="w-full h-40 overflow-hidden relative">
              <img 
                src={campaign.campaign_media} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
              <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                <Check className="w-3 h-3 mr-1" /> Completed
              </span>
            </div>

            <div className="text-gray-500 mb-4 flex items-center text-sm">
              <DollarSign className="w-4 h-4 mr-1" />
              {campaign.budget}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">Reach</p>
                <p className="font-medium text-gray-900">{campaign.metrics.reach}</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">Engagement</p>
                <p className="font-medium text-gray-900">{campaign.metrics.engagement}</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-500 mb-1">ROI</p>
                <p className="font-medium text-gray-900">{campaign.metrics.roi}</p>
              </div>
            </div>
            
            <button className="mt-4 w-full py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              View Report
            </button>
          </div>
        </div>
      ))}
      
      {campaigns.completed.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No completed campaigns</h3>
          <p className="text-gray-500 text-center max-w-md">
            Your completed campaigns will appear here once they finish running.
          </p>
        </div>
      )}
    </div>
  );

  const renderDraftCampaigns = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.draft.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
          {campaign.campaign_media && (
            <div className="w-full h-40 overflow-hidden relative">
              <img 
                src={campaign.campaign_media} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          )}
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                Draft
              </span>
            </div>

            <div className="flex items-center text-gray-500 mb-4 text-sm">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{campaign.budget}</span>
            </div>

            <div className="flex items-center text-xs text-gray-500 mt-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Last edited: {campaign.lastEdited}</span>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100 text-sm font-medium">
                Continue Editing
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {campaigns.draft.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Clock className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No draft campaigns</h3>
          <p className="text-gray-500 text-center max-w-md">
            Save campaigns as drafts to continue working on them later.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );

  const renderResponses = () => (
    <div className="space-y-6">
      {campaignResponses.map(campaign => (
        <div key={campaign.campaign_id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{campaign.campaign_title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created: {new Date(campaign.campaign_created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {campaign.applications?.length || 0} {campaign.applications?.length === 1 ? 'response' : 'responses'}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  campaign.campaign_status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.campaign_status.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          {campaign.applications && campaign.applications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {campaign.applications.map(application => (
                <div key={application.application_id} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex items-start">
                      <div className="mr-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{application.influencer.name}</h5>
                        <p className="text-sm text-gray-500">{application.influencer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status}
                      </span>
                      {application.status === 'applied' && (
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                          onClick={() => {
                            setSelectedInfluencer(application.influencer);
                            setIsChatOpen(true);
                          }}
                        >
                          Proceed to Talk
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-13 pl-13">
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">
                      {application.message}
                    </p>
                    
                    <div className="mt-3 flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>
                        Applied: {new Date(application.applied_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="text-gray-900 font-medium mb-1">No applications yet</h4>
              <p className="text-gray-500 max-w-md mx-auto">
                When influencers apply to your campaigns, their responses will appear here.
              </p>
            </div>
          )}
        </div>
      ))}
      
      {campaignResponses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-8 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No responses yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            When influencers apply to your campaigns, they'll appear here.
          </p>
        </div>
      )}
    </div>
  );

  const handleCreateCampaign = async (campaignData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createCampaign(campaignData);

      const newCampaign = {
        id: response.id,
        name: response.campaignName,
        budget: response.campaignBudget,
        lastEdited: new Date().toLocaleDateString(),
        platform: 'Instagram',
        ...response
      };

      const isComplete = [
        campaignData.name,
        campaignData.description,
        campaignData.startDate,
        campaignData.endDate,
        campaignData.budget,
        campaignData.targetAudience
      ].every(field => field && field.trim() !== '');

      setCampaigns(prev => ({
        ...prev,
        [isComplete ? 'active' : 'draft']: [
          ...prev[isComplete ? 'active' : 'draft'],
          newCampaign
        ]
      }));

      setIsCreateModalOpen(false);
    } catch (error) {
      setError(error.message);
      console.error('Failed to create campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !campaigns.active.length && !campaigns.completed.length && !campaigns.draft.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading campaigns</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchCampaigns}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your influencer marketing campaigns
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Campaign
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide mt-6 -mx-6 px-6">
          {[
            { id: 'active', label: 'Active Campaigns', count: campaigns.active.length },
            { id: 'completed', label: 'Completed', count: campaigns.completed.length },
            { id: 'draft', label: 'Drafts', count: campaigns.draft.length },
            { id: 'responses', label: 'Responses', count: campaignResponses?.length || 0 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 relative whitespace-nowrap flex items-center ${activeTab === tab.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'active' && renderActiveCampaigns()}
          {activeTab === 'completed' && renderCompletedCampaigns()}
          {activeTab === 'draft' && renderDraftCampaigns()}
          {activeTab === 'responses' && renderResponses()}
        </div>
      </div>

      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCampaign}
        loading={loading}
      />

      <ChatModal 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        influencer={selectedInfluencer}
      />
    </div>
  );
};

export default CampaignManagement;

const CreateCampaignModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    targetAudience: '',
    mediaFiles: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);

    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...validFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    if (!formData.name.trim()) {
      alert('Campaign name is required');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Create New Campaign</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Step indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep > i + 1 ? 'bg-green-100 text-green-600' :
                      currentStep === i + 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {currentStep > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs mt-1 ${
                      currentStep === i + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}>
                      {i === 0 ? 'Details' : i === 1 ? 'Audience' : 'Media'}
                    </span>
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      currentStep > i + 1 ? 'bg-green-100' : 'bg-gray-100'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleInputChange}
                  placeholder="e.g. Summer Collection Promotion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleInputChange}
                  placeholder="Describe your campaign goals and key messaging..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    required
                    value={formData.startDate}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    required
                    value={formData.endDate}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    name="budget"
                    required
                    value={formData.budget}
                    className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleInputChange}
                    placeholder="Enter your campaign budget"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="targetAudience"
                  rows="3"
                  value={formData.targetAudience}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleInputChange}
                  placeholder="Describe your target audience demographics, interests, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Instagram', 'YouTube', 'TikTok'].map(platform => (
                    <button
                      key={platform}
                      type="button"
                      className={`p-3 border rounded-lg flex flex-col items-center ${
                        formData.platform === platform 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, platform }))}
                    >
                      {platform === 'Instagram' && <Instagram className="w-5 h-5 text-pink-600" />}
                      {platform === 'YouTube' && <Youtube className="w-5 h-5 text-red-600" />}
                      {platform === 'TikTok' && <Videotape className="w-5 h-5 text-black" />}
                      <span className="mt-2 text-sm">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media Files (Max 5MB each)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="mediaFiles"
                  />
                  <label
                    htmlFor="mediaFiles"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <h4 className="font-medium text-gray-900 mb-1">Upload campaign assets</h4>
                    <p className="text-sm text-gray-500 mb-3">
                      Drag and drop files here, or click to browse
                    </p>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                      Select Files
                    </span>
                  </label>
                </div>
                
                {formData.mediaFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.mediaFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          {file.type.startsWith('image/') ? (
                            <Image className="w-5 h-5 text-gray-400 mr-2" />
                          ) : (
                            <Videotape className="w-5 h-5 text-gray-400 mr-2" />
                          )}
                          <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              type="submit"
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {currentStep < totalSteps ? (
                <>
                  Next Step
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              ) : loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Campaign'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChatModal = ({ isOpen, onClose, influencer }) => {
  const { addMessage } = useMessages();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'influencer',
      text: 'Hi! I\'m interested in your campaign.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 2,
      sender: 'brand',
      text: 'Hello! Thanks for your interest. Let\'s discuss the details.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'brand',
      text: message,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    
    addMessage(influencer.id, {
      text: message,
      influencerName: influencer.name,
      campaignTitle: influencer.campaign,
      timestamp: new Date().toISOString(),
      attachments: []
    });

    setMessage('');
  };

  const handleFileAttachment = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log('File attached:', file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
      <div className="absolute right-0 w-full max-w-md h-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">{influencer?.name}</h3>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'brand' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.sender === 'brand'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'brand' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white sticky bottom-0">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <input
                  type="file"
                  id="attachment"
                  className="hidden"
                  onChange={handleFileAttachment}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label
                  htmlFor="attachment"
                  className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                >
                  <Paperclip className="w-5 h-5" />
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-3 rounded-full ${
                message.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};