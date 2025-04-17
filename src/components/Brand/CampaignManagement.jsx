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
  Paperclip
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
        // Create a base campaign object with common properties
        const baseCampaign = {
          id: campaign.id,
          name: campaign.name,
          budget: `₹${campaign.budget}`,
          // If campaign_media is already a base64 string, use it directly
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
                reach: '0',
                engagement: '0%',
                roi: '0x'
              }
            });
            break;
          case 'DRAFT':
            categorizedCampaigns.draft.push({
              ...baseCampaign,
              lastEdited: new Date(campaign.updated_at).toISOString().split('T')[0]
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
      const response = await getCampaignResponses()
      console.log("Campaign responses from api====>",response)
      setCampaignResponses(response.data);
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
        <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {campaign.campaign_media && (
            <div className="w-full h-48 overflow-hidden">
              <img 
                src={campaign.campaign_media} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{campaign.name}</h3>
                <div className="flex items-center text-gray-500 mt-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{campaign.budget}</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {campaign.platform}
              </span>
            </div>

            <div className="space-y-4">
              {/* Dates */}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{campaign.startDate} - {campaign.endDate}</span>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${getProgressColor(campaign.progress)} h-2 rounded-full transition-all`}
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Influencers */}
              {/* <div>
                <h4 className="text-sm font-medium mb-2">Assigned Influencers</h4>
                <div className="space-y-2">
                  {campaign.influencers.map((influencer, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2 text-sm">{influencer.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{influencer.status}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompletedCampaigns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {campaigns.completed.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg shadow-sm p-6">
          {campaign.campaign_media && (
            <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
              <img 
                src={campaign.campaign_media} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold">{campaign.name}</h3>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              Completed
            </span>
          </div>

          <div className="text-gray-500 mb-4">
            <DollarSign className="inline w-4 h-4 mr-1" />
            {campaign.budget}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Reach</p>
              <p className="font-medium">{campaign.metrics.reach}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Engagement</p>
              <p className="font-medium">{campaign.metrics.engagement}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">ROI</p>
              <p className="font-medium">{campaign.metrics.roi}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDraftCampaigns = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {campaigns.draft.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg shadow-sm p-6">
          {campaign.campaign_media && (
            <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
              <img 
                src={campaign.campaign_media} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold">{campaign.name}</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              Draft
            </span>
          </div>

          <div className="flex items-center text-gray-500 mb-4">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{campaign.budget}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500 mt-4">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last edited: {campaign.lastEdited}</span>
          </div>

          <button className="mt-4 w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            Continue Editing
          </button>
        </div>
      ))}
    </div>
  );

  const renderResponses = () => (
    <div className="space-y-6">
      {campaignResponses.map(campaign => (
        <div key={campaign.campaign_id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold">{campaign.campaign_title}</h3>
              <p className="text-sm text-gray-500">
                Created: {new Date(campaign.campaign_created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {campaign.applications.length} responses
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                campaign.campaign_status === 'ACTIVE' 
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {campaign.campaign_status}
              </span>
            </div>
          </div>

          {campaign.applications.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Applications ({campaign.applications.length})</h4>
              <div className="divide-y">
                {campaign.applications.map(application => (
                  <div key={application.application_id} className="py-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium">{application.influencer.name}</h5>
                          <p className="text-sm text-gray-500">{application.influencer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                          {application.status}
                        </span>
                        {application.status === 'applied' && (
                          <button 
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                            onClick={() => {
                              setSelectedInfluencer(application.influencer);
                              setIsChatOpen(true);
                            }}
                          >
                            Proceed to Talk
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-13 pl-13">
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {application.message}
                      </p>
                      
                      <div className="mt-2 flex items-center space-x-4">
                        <p className="text-sm text-gray-500">
                          Applied: {new Date(application.applied_at).toLocaleString()}
                        </p>
                        {application.influencer.social_media_handles.map((handle, idx) => (
                          <a 
                            key={idx}
                            href={handle}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No applications received yet</p>
          )}
        </div>
      ))}
      
      {campaignResponses.length === 0 && (
        <div className="text-center py-10">
          <div className="mb-4">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No responses yet</h3>
          <p className="text-gray-500">When influencers apply to your campaigns, they'll appear here.</p>
        </div>
      )}
    </div>
  );

  const handleCreateCampaign = async (campaignData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createCampaign(campaignData);

      // Update the local state with the new campaign
      const newCampaign = {
        id: response.id,
        name: response.campaignName,
        budget: response.campaignBudget,
        lastEdited: new Date().toISOString().split('T')[0],
        platform: 'Instagram', // You might want to make this dynamic
        ...response
      };

      // If all required fields are filled, add to active campaigns
      // Otherwise, add to drafts
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
      // Show success message (you'll need to implement this)

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Error loading campaigns: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-800">Campaigns</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Campaign
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mt-6">
          {[
            { id: 'active', label: 'Active Campaigns', count: campaigns.active.length },
            { id: 'completed', label: 'Completed', count: campaigns.completed.length },
            { id: 'draft', label: 'Draft', count: campaigns.draft.length },
            { id: 'responses', label: 'Responses', count: campaignResponses?.length || 0 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 relative ${activeTab === tab.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <span>{tab.label}</span>
              <span className="ml-2 text-sm text-gray-400">({tab.count})</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Content */}
      <div className="p-6">
        {activeTab === 'active' && renderActiveCampaigns()}
        {activeTab === 'completed' && renderCompletedCampaigns()}
        {activeTab === 'draft' && renderDraftCampaigns()}
        {activeTab === 'responses' && renderResponses()}
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit

    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...validFiles]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least the name is provided
    if (!formData.name.trim()) {
      alert('Campaign name is required');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      // Handle error (show error message to user)
      console.error('Error creating campaign:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Campaign</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget (₹)
            </label>
            <input
              type="number"
              name="budget"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <textarea
              name="targetAudience"
              rows="2"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your target audience..."
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Files (Max 5MB each)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
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
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
              </label>
            </div>
            {formData.mediaFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {formData.mediaFiles.length} file(s) selected
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={loading}
            >
              {loading ? (
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



// Add this component at the bottom of the file
const ChatModal = ({ isOpen, onClose, influencer }) => {
  const { addMessage } = useMessages();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    // Sample messages for demo
    {
      id: 1,
      sender: 'influencer',
      text: 'Hi! Im interested in your campaign.',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      sender: 'brand',
      text: 'Hello! Thanks for your interest. Lets discuss the details.',
      timestamp: new Date().toISOString(),
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

    // Add to messages state
    setMessages([...messages, newMessage]);
    
    // Update global message context
    addMessage(influencer.id, {
      text: message,
      influencerName: influencer.name,
      campaignTitle: influencer.campaign, // Make sure this is passed in props
      timestamp: new Date().toISOString(),
      attachments: []
    });

    setMessage('');
  };

  const handleFileAttachment = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Handle file upload logic here
    console.log('File attached:', file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium">{influencer?.name}</h3>
              <p className="text-sm text-gray-500">{influencer?.email}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'brand' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'brand'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="file"
              id="attachment"
              className="hidden"
              onChange={handleFileAttachment}
              accept="image/*,.pdf,.doc,.docx"
            />
            <label
              htmlFor="attachment"
              className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <Paperclip className="w-6 h-6" />
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};