import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://django-ecommerce-app-1.onrender.com/',
});
