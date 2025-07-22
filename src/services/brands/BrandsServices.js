import axios from "axios";
import { showToast } from "../../components/lib/toast";
const BRANDS_AUTH_URL = 'http://localhost:5000/api/v1/brandsAuth';

export const registerBrand = async (brandData) => {
    try {
        const response = await axios.post(`${BRANDS_AUTH_URL}/registerBrands`, brandData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Registration successful:', response.data);
        showToast.success("Registration successful! Welcome aboard.");
        const token = response.data.token;
        console.log("Token", token);
        localStorage.setItem('jwt', token);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);

        if (error.response) {
            showToast.error(error.response.data.message || 'Registration failed. Please try again.');
        } else if (error.request) {
            showToast.error('No response from server. Please check your internet connection.');
        } else {
            showToast.error('Error in registration process. Please try again.');
        }

        throw error;
    }
};

export const brandLogin = async (workEmail, password) => {
    let data = JSON.stringify({
        "email": workEmail,
        "password": password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BRANDS_AUTH_URL}/loginBrand`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return response; // Return the full response object
    } catch (error) {
        console.error('Login API failed:', error);
        showToast.error(`Login failed. Please try again. ${error.message}`);
        throw error; // Rethrow the error so the caller knows about it
    }
}