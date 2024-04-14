import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './signup.css';
import SweetAlert from '../../../components/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fileName, setFileName] = useState('No file chosen');
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('No file chosen');
    }
  };

  const base_url = import.meta.env.VITE_base_url;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append('image', data.image[0]);

    axios
      .post(`${base_url}users/register/`, formData)
      .then((response) => {
        console.log(response.data);
        setAlertStatus('success');
        setAlertMessage('Account created successfully!');
        setShowAlert(true);
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        setAlertStatus('error');
        setAlertMessage(
          error.response?.data.phone
            ? error.response?.data.phone[0]
            : false || error.response?.data.detail || error.response.data.email
              ? error.response.data.email[0]
              : false || 'Internal Server Error !',
        );
        setShowAlert(true);
      });
  };
  return (
    <div className="mycontainer flex items-center h-screen	">
      <SweetAlert
        status={alertStatus}
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
      <form
        className="max-w-md mx-auto myform"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="paraIn">
          Register
          <FontAwesomeIcon icon={faSignOutAlt} className="ms-2" />
        </p>
        <div className="container flex gap-5">
          <div className="relative mb-5">
            <input
              type="text"
              id="firstName"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register('first_name', {
                required: 'First name is required',
                pattern: {
                  value: /^[a-zA-Z0-9]{2,100}$/,
                  message: 'name from 2 to 100 charachers',
                },
              })}
            />

            <label
              htmlFor="firstName"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              First Name
            </label>
            {errors.first_name && (
              <div className="text-red-500 text-xs mt-1">
                {errors.first_name.message}
              </div>
            )}
          </div>
          <div className="relative mb-5">
            <input
              type="text"
              id="lastName"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register('last_name', {
                required: 'last name is required',
                pattern: {
                  value: /^[a-zA-Z0-9]{2,100}$/,
                  message: 'name from 2 to 100 charachers',
                },
              })}
            />
            <label
              htmlFor="lastName"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Last Name
            </label>
            {errors.last_name && (
              <div className="text-red-500 text-xs mt-1">
                {errors.last_name.message}
              </div>
            )}
          </div>
        </div>
        <div className="relative mb-5">
          <input
            type="text"
            id="Email"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            {...register('email', {
              required: 'email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'invalid email',
              },
            })}
            placeholder=" "
          />
          {errors.email && (
            <div className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </div>
          )}
          <label
            htmlFor="Email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </label>
        </div>

        <div className="relative mb-5">
          <input
            type="text"
            id="phone"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'Invalid phone number',
              },
            })}
          />
          {errors.phone && (
            <div className="text-red-500 text-xs mt-1">
              {errors.phone.message}
            </div>
          )}
          <label
            htmlFor="phone"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Phone
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-5">
          <input
            type="password"
            id="password"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </div>
          )}
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>

        <div className="relative mb-5">
          <input
            type="password"
            id="confirmPassword"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === password.value || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </div>
          )}
          <label
            htmlFor="confirmPassword"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 
    "
          >
            Confirm Password
          </label>
        </div>

        {/* Image Input */}
        <div className="relative  flex items-center">
          <input
            type="file"
            onChangeCapture={handleFileChange}
            id="actual-btn"
            hidden
            {...register('image', { required: 'Image is required' })}
          />
          <label className="mylabel" htmlFor="actual-btn">
            Choose File
          </label>

          <span id="file-chosen">{fileName}</span>
        </div>
        {errors.image && (
          <div className="text-red-500 text-xs mt-1 block mb-5">
            {errors.image.message}
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mybtn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
