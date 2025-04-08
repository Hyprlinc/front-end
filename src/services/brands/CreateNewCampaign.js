import axios from 'axios';

const CAMPAIGN_CREATION_URL = 'http://192.168.0.123:5000/api/v1/brandCampaignGateway/createCampaign';
const CAMPAIGN_FETCH_URL = 'http://192.168.0.123:5000/api/v1/brandCampaignGateway/getBrandCampaigns';

export const createCampaign = async (campaignData) => {
    try {
        const token = localStorage.getItem('brandToken');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const formData = new FormData();

        formData.append('campaignName', campaignData.name);
        formData.append('campaignDescription', campaignData.description);
        formData.append('campaignStartDate', campaignData.startDate);
        formData.append('campaignEndDate', campaignData.endDate);
        formData.append('campaignBudget', campaignData.budget);
        formData.append('targetAudience', campaignData.targetAudience);
        formData.append('campaignStatus', 'ACTIVE'); // Default status for new campaigns

        if (campaignData.mediaFiles && campaignData.mediaFiles.length > 0) {
            formData.append('campaignMedia', campaignData.mediaFiles[0]); // Taking first file as the main campaign media
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        };

        const response = await axios.post(CAMPAIGN_CREATION_URL, formData, config);
        return response.data;

    } catch (error) {
        console.error('Create campaign error:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to create campaign');
        }
        throw error;
    }
};

export const getBrandCampaigns = async (filters = {}) => {
    try {
        const token = localStorage.getItem('brandToken');
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const { status, startDate, endDate } = filters;
        
        // Build query parameters
        const queryParams = new URLSearchParams();
        if (status) queryParams.append('status', status);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        
        };

        const url = `${CAMPAIGN_FETCH_URL}?${queryParams}`;
        const response = await axios.get(url, config);

        // Process the campaign media data
        const processedData = response.data.data.map(campaign => ({
            ...campaign,
            campaign_media: campaign.campaign_media?.data 
                ? `data:image/jpeg;base64,${arrayBufferToBase64(campaign.campaign_media.data)}`
                : null
        }));

        return {
            message: response.data.message,
            data: processedData
        };

    } catch (error) {
        console.error('Get campaigns error:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to fetch campaigns');
        }
        throw error;
    }
};

// Helper function to convert array buffer to base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

