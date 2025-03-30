import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const developmentBaseUrl = 'http://localhost:8080';
const productionBaseUrl = 'https://api.example.com';
const facultyBaseUrl = 'http://10.50.227.44:8080';
const ngrokBaseUrl = 'https://redfish-real-directly.ngrok-free.app';

const TIMEOUT = 60 * 1000; // 60 seconds timeout

// Set global Axios defaults
axios.defaults.baseURL = facultyBaseUrl;
axios.defaults.timeout = TIMEOUT;

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
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

      const errorMessage = error.response.data?.message || 'An error occurred';

      if (error.response.status === 400) {
        toast.error(errorMessage, { position: 'top-right', autoClose: 3000 });
      } else if (error.response.status === 401) {
        toast.warn('Unauthorized! Redirecting to login.', {
          position: 'top-right',
          autoClose: 3000,
        });
        handleLogout();
      } else if (error.response.status === 403) {
        toast.warn('Forbidden! Access denied.', { position: 'top-right', autoClose: 3000 });
        handleLogout();
      } else if (error.response.status >= 500) {
        toast.error('Server error! Please try again later.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      toast.error('No response from server. Please check your connection.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      console.error('Error in setup:', error.message);
      toast.error('An unexpected error occurred.', { position: 'top-right', autoClose: 3000 });
    }

    return Promise.reject(error);

    function handleLogout() {
      localStorage.clear();
      window.location.href = '/';
    }
  }
);

export default axios;
