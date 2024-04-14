import axiosInstance from "../../apis/config";

export const getOrder = () => {
  return axiosInstance.get(`/orders/`);
}

export const addOrder = (formData) => {
  return axiosInstance.post(`/orders/`,formData);
}

export const getOrderItem = () => {
  return axiosInstance.get(`/orderitem/`)
}

export const addOrderItem = (formData) => {
  return axiosInstance.post(`/orderitem/`,formData)
}
