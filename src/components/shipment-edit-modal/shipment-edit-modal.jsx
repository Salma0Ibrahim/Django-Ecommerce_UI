import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateShipment } from "../../redux/action/shipment-action";

const schema = z.object({
  address: z.string().min(1, { message: "Address is required" }).max(100),
  city: z.string().min(1, { message: "City is required" }).max(100),
  state: z.string().min(1, { message: "State is required" }).max(100),
  zip_code: z
    .string()
    .min(1, { message: "Zip Code is required" })
    .length(5, { message: "Invalid Zip Code" }),
  country: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .max(100),
  phone: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .length(11, { message: "Invalid Phone Number" }),
});

// eslint-disable-next-line react/prop-types
export default function EditShipmentModal({ shipment, rowId }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset the form with shipment data when shipment prop changes
    if (shipment) {
      reset(shipment);
    }
  }, [shipment, reset]);

  const onSubmit = async (data) => {
    try {
      console.log('on submit', rowId);
      await dispatch(updateShipment({ shipmentId: rowId, data }));
  
      setSuccessMessage("Form submitted successfully!");
      reset();
    } catch (error) {
      setError("root", { message: "This Address already exists" });
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">
            Address:
          </label>
          <input
            {...register("address")}
            type="text"
            id="address"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-1">
            City:
          </label>
          <input
            {...register("city")}
            type="text"
            id="city"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block mb-1">
            State:
          </label>
          <input
            {...register("state")}
            type="text"
            id="state"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter state"
          />
          {errors.state && (
            <div className="text-red-500">{errors.state.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block mb-1">
            Country:
          </label>
          <input
            {...register("country")}
            type="text"
            id="country"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Country"
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="zip_code" className="block mb-1">
            Zip Code:
          </label>
          <input
            {...register("zip_code")}
            type="text"
            id="zip_code"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter zip code"
          />
          {errors.zip_code && (
            <div className="text-red-500">{errors.zip_code.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1">
            Phone:
          </label>
          <input
            {...register("phone")}
            type="text"
            id="phone"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <div className="text-red-500">{errors.phone.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </>
  );
}
