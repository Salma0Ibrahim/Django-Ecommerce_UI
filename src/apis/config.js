import axios from 'axios';

// decode the logged in user
const token = localStorage.getItem('token');
function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
const user = parseJwt(token);
console.log(user)

// Function to retrieve the token from a cookie
// function getToken() {
//   // Retrieve the cookie named 'jwt'
//   const cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('jwt='))
//     ?.split('=')[1];
//   // Return the token value
//   // console.log("on-mount",cookieValue);
//   return cookieValue;
// }

const axiosInstance = axios.create({
  baseURL: 'https://django-ecommerce-app-1.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': `${token}`,
    // withCredentials: true,
    // Authorization: `jwt=${getToken()};`
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // if (token) {
    //   config.headers.Authorization = `${token}`;
    // }

    config.data = { ...config.data, user: user.id };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here, e.g., handling pagination
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
