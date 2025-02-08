import axios from 'axios';

const developmentBaseUrl = 'http://10.50.227.44:8080';
const productionBaseUrl = 'https://api.example.com';

const axiosInstance = axios.create({
  baseURL: developmentBaseUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        if(
            config.url.startsWith('/api/v1/public') 
            || config.url.startsWith('/api/v1/auth')
            || config.url.startsWith('/api/v1/otp')
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response);

      if (error.response.status === 401) {
        console.warn('Unauthorized! Redirecting to login.');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.warn('Forbidden! Access denied.');
      } else if (error.response.status >= 500) {
        console.error('Server error! Please try again later.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error in setup:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
