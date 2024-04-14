import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://django-ecommerce-app-1.onrender.com/',
  headers: {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': localStorage.getItem('jwt'),
  },
});
