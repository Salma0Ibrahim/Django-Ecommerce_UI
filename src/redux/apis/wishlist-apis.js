import axiosInstance from "../../apis/config";

export const getWishlist = (customerId) => {
  return axiosInstance.get(`/cart/searchcustomerwishlists/${customerId}/`)
}

export const addToWishlist =  (formdata) => {
  return axiosInstance.post(`/wishlist/`,formdata)
}

export const removeFromWishlist = (wishlistId) => {
  return axiosInstance.delete(`/wishlist/${wishlistId}/`)
}