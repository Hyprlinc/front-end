import axios from 'axios';



const ENLIST_CAMPAIGN_RESPONSES = 'http://localhost:5001/api/v1/brands/enlistCampaignApplication/my-campaigns/applications';

/**
 * Fetches all campaigns and their applications for the authenticated brand
 * @returns {Promise<Array>} Array of campaigns with their applications
 * @throws {Error} If the API call fails
 */
export const getCampaignResponses = async () => {
  try {
    const response = await axios.get(`${ENLIST_CAMPAIGN_RESPONSES}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('brandToken')}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch campaign responses';
    throw new Error(errorMessage);
  }
};

// Example usage with error handling:
/*
try {
  const campaigns = await getCampaignResponses();
  console.log('Campaigns and applications:', campaigns);
} catch (error) {
  console.error('Error:', error.message);
}
*/