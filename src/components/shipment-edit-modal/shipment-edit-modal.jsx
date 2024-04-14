import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { updateShipment } from '../../redux/action/shipment-action';
import './form-style.css';
import { toast } from 'react-toastify';

const schema = z.object({
  address: z.string().min(1, { message: 'Address is required' }).max(100),
  city: z.string().min(1, { message: 'City is required' }).max(100),
  state: z.string().min(1, { message: 'State is required' }).max(100),
  zip_code: z
    .string()
    .min(1, { message: 'Zip Code is required' })
    .length(5, { message: 'Invalid Zip Code' }),
  country: z.string().min(1, { message: 'Phone Number is required' }).max(100),
  phone: z
    .string()
    .min(1, { message: 'Phone Number is required' })
    .length(11, { message: 'Invalid Phone Number' }),
});

// eslint-disable-next-line react/prop-types
export default function EditShipmentModal({ shipment, rowId, onCloseModal }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useDispatch();

  useEffect(() => {
    if (shipment) {
      reset(shipment);
    }
  }, [shipment, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateShipment({ shipmentId: rowId, data }));
      toast.success('The Shipment has been updated successfully');
      onCloseModal();
      reset();
    } catch (error) {
      setError('root', { message: 'This Address already exists' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="form">
        <h2 className="title">
          <span className="title-text">Add Shipment</span>
          <span className="title-pulse"></span>
        </h2>
        <div className="form-group">
          <label htmlFor="address">
            Address:
            <input
              {...register('address', { required: 'Address is required' })}
              type="text"
              id="address"
              className="input"
              placeholder="Enter address"
            />
          </label>
          {errors.address && (
            <span className="error">{errors.address.message}</span>
          )}
        </div>
        <div className="flex">
          <div className="form-group flex-1">
            <label htmlFor="city">
              City:
              <input
                {...register('city', { required: 'City is required' })}
                type="text"
                id="city"
                className="input"
                placeholder="Enter city"
              />
            </label>
            {errors.city && (
              <span className="error">{errors.city.message}</span>
            )}
          </div>
          <div className="form-group flex-1">
            <label htmlFor="state">
              State:
              <input
                {...register('state', { required: 'State is required' })}
                type="text"
                id="state"
                className="input"
                placeholder="Enter state"
              />
            </label>
            {errors.state && (
              <span className="error">{errors.state.message}</span>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="form-group flex-1">
            <label htmlFor="country">
              Country:
              <input
                {...register('country', { required: 'Country is required' })}
                type="text"
                id="country"
                className="input"
                placeholder="Enter Country"
              />
            </label>
            {errors.country && (
              <span className="error">{errors.country.message}</span>
            )}
          </div>
          <div className="form-group flex-1">
            <label htmlFor="zip_code">
              Zip Code:
              <input
                {...register('zip_code', { required: 'Zip Code is required' })}
                type="text"
                id="zip_code"
                className="input"
                placeholder="Enter zip code"
              />
            </label>
            {errors.zip_code && (
              <span className="error">{errors.zip_code.message}</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone:
            <input
              {...register('phone', { required: 'Phone is required' })}
              type="text"
              id="phone"
              className="input"
              placeholder="Enter phone number"
            />
          </label>
          {errors.phone && (
            <span className="error">{errors.phone.message}</span>
          )}
        </div>
        <button type="submit" className="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </>
  );
}
