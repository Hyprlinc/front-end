import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/v1/agencyAuth';

class AgencyAuth {
  // Store the JWT token
  static setToken(token) {
    localStorage.setItem('agency_token', token);
  }

  // Get the stored token
  static getToken() {
    return localStorage.getItem('agency_token');
  }

  // Headers configuration with authentication
  static getAuthHeaders() {
    const token = this.getToken();
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  }

  // Register a new agency
  static async register(agencyData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/registerAgency`,
        agencyData
      );
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  }

  // Login agency
  static async login(credentials) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/loginAgency`,
        credentials
      );
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  }

  // Update agency details
  static async updateAgency(agencyId, updateData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/updateAgency/${agencyId}`,
        updateData,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Update failed' };
    }
  }

  // Add team member
  static async addTeamMember(agencyId, memberData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addTeamMember/${agencyId}`,
        memberData,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to add team member' };
    }
  }

  // Add project
  static async addProject(agencyId, projectData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addProject/${agencyId}`,
        projectData,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to add project' };
    }
  }

  // Add payment information
  static async addPaymentInfo(agencyId, paymentData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addPaymentInfo/${agencyId}`,
        paymentData,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to add payment information' };
    }
  }

  // Logout
  static logout() {
    localStorage.removeItem('agency_token');
  }
}

export default AgencyAuth;