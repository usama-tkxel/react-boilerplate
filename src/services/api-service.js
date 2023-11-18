import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${authToken}`,
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Custom function to send a request with a specific content type
const sendRequestWithContentType = ({
  url,
  method = 'POST',
  data,
  contentType = 'multipart/form-data',
}) => {
  const authToken = localStorage.getItem('authToken');
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Access-Control-Allow-Origin': '*',
  };

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  return axiosInstance({
    url: API_BASE_URL + url,
    method,
    data,
    headers,
  });
};

export default axiosInstance;
export { sendRequestWithContentType };
