import axiosInstance from '../../apis/config';

export const getShipments = () => {
  return axiosInstance.get(`/shipment/`);
}

export const addShipment = (data) => {
  return axiosInstance.post('/shipment/', data);
}

export const removeShipment = (shipmentId) => {
  return axiosInstance.delete(`/shipment/${shipmentId}/`);
}

export const updateShipment = (shipmentId, data) => {
  return axiosInstance.patch(`/shipment/${shipmentId}/`, data);
}
