import axios from "axios";

const BRANDS_INFO = 'http://localhost:5001/api/v1/brandProfile';

export const getBrandsInfo = async (token) => {
    try {
        const response = await axios.get(`${BRANDS_INFO}/getBrandsInformation`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching brand info:', error);
        throw error;
    }
}