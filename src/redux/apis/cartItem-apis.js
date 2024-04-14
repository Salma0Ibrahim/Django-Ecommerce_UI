import axiosInstance from "../../apis/config";

export const getCartItem = (cartId) => {
  return axiosInstance.get(`/cartitem/searchitems/${cartId}/`)
}

export const addCartItem = (formdata) => {
  return axiosInstance.post(`/cartitem/`,formdata)
}

export const removeCartItem = (cartitemId) => {
  return axiosInstance.delete(`/cartitem/${cartitemId}/`)
}

export const updateCartItem = (cartitemId,formdata) => {
  return axiosInstance.put(`/cartitem/${cartitemId}/`,formdata)
}