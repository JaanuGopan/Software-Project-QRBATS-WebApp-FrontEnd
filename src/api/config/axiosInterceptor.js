import axios from 'axios';

const developmentBaseUrl = 'http://localhost:8080';
const productionBaseUrl = 'https://api.example.com';
const facultyBaseUrl = 'http://10.50.227.44:8080';

const TIMEOUT = 60 * 1000; // 60 seconds timeout

// Set global Axios defaults
axios.defaults.baseURL = developmentBaseUrl;
axios.defaults.timeout = TIMEOUT;

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Exclude public, auth, and OTP endpoints from token injection
      if (
        config.url?.startsWith('/api/v1/public') ||
        config.url?.startsWith('/api/v1/auth') ||
        config.url?.startsWith('/api/v1/otp')
      ) {
        return config;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response);
      if (error.response.status === 401) {
        console.warn('Unauthorized! Redirecting to login.');
        // handle unauthorized access
        handleLogout();
      } else if (error.response.status === 403) {
        console.warn('Forbidden! Access denied.');
        // handle forbidden access
        handleLogout();
      } else if (error.response.status >= 500) {
        console.error('Server error! Please try again later.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error in setup:', error.message);
    }

    return Promise.reject(error);

    function handleLogout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
  }
);

export default axios;
