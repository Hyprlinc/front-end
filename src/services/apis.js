import axios from 'axios';

// Function to handle API registration
const registerUser = async (registrationData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', registrationData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Handle successful registration
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        // Handle registration error
        console.error('Registration failed:', error.response ? error.response.data : error.message);
        
        // Show user-friendly error message
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert(error.response.data.message || 'Registration failed. Please try again.');
        } else if (error.request) {
            // The request was made but no response was received
            alert('No response from server. Please check your internet connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('Error in registration process. Please try again.');
        }
        
        throw error;
    }
};

export default registerUser;