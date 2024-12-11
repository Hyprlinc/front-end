import axios from 'axios';

// Function to handle API registration
export const registerUser = async (registrationData) => {
    try {
        const response = await axios.post('http://192.168.0.123:5000/api/auth/register', registrationData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Handle successful registration
        console.log('Registration successful:', response.data);
        const token = response.data.token;
        console.log("Token", token);
        localStorage.setItem('jwt', token);
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


export const registerChannelDetails = async (channelDetails) => {
    try {
        console.log("Channel Details before API", channelDetails);
        const fetchToken = localStorage.getItem('jwt');
        const response = await axios.post('http://192.168.0.123:5000/api/channelOnboarding/uploadChannelDetails', channelDetails, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fetchToken}`
            }
        });
        console.log('Channel Details Submitted');
        return response.data;
    } catch (error) {
        console.error('Registration failed', error.response ? error.response.data : error.message);
        if (error.response) {
            alert(error.response.data.message || 'Channel Details Submission failed. Try Again!');
        } else if (error.request) {
            // The request was made but no response was received
            alert('No response from server. Please check your internet connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('Error in registration process. Please try again.');
        }
        throw error;
    }
}

export const creatorLogin = async (email, password) => {
    let data = JSON.stringify({
        "email": email,
        "password": password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.0.123:5000/api/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;

        })
        .catch((error) => {
            console.error(error);
            
        });
}