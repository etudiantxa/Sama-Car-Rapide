import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api'; // Example backend API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken'); // Or get from Redux store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example API functions (can be organized into feature-specific files)

// Auth
export const login = (credentials) => apiClient.post('/auth/login', credentials); // Example endpoint
export const register = (userData) => apiClient.post('/auth/register', userData); // Example endpoint

// Voyages
export const getVoyages = (params) => apiClient.get('/voyages', { params });
export const getVoyageById = (id) => apiClient.get(`/voyages/${id}`);

// Reservations
export const createReservation = (reservationData) => apiClient.post('/reservations', reservationData);
export const getUserReservations = () => apiClient.get('/reservations/my');


// Add other API functions as needed for users, vehicles, etc.

export default apiClient;
