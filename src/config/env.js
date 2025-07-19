// Environment configuration
const environment = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api/v1',
    AGENCY_PACKAGE_URL: 'http://localhost:5001/api/v1/agency/packageManagement',
    CREATOR_PACKAGE_URL: 'http://localhost:5001/api/v1/creators/packages',
    ORDER_MANAGEMENT: 'http://localhost:5001/api/v1/packages',
    ENLIST_AGENCIES: 'http://localhost:5001/api/v1/brands/discover/discoverAgencies'
  },
  production: {
    API_BASE_URL: 'https://api.yourdomain.com/api/v1',
    AGENCY_PACKAGE_URL: 'https://api.yourdomain.com/api/v1/agency/packageManagement',
    CREATOR_PACKAGE_URL: 'https://api.yourdomain.com/api/v1/creators/packages'
  }
};

// Get current environment
const getCurrentEnvironment = () => {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

// Export configuration
export const config = environment[getCurrentEnvironment()];
