import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SweetAlert from '../../../components/alert';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { addUserInfo } from '../../../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const base_url = import.meta.env.VITE_base_url;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    axios
      .post(`${base_url}users/login/`, formData)
      .then((response) => {
        const decoded = jwtDecode(response.data.token);
        if (decoded?.is_superuser === false) navigate('/');
        localStorage.setItem('token', response.data.token);
        console.log(response);
        dispatch(addUserInfo(response.data.user_info));
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.response.data.detail || 'An error occurred';
        setAlertStatus('error');
        setAlertMessage(errorMessage);
        setShowAlert(true);
      });
  };
  return (
    <div className=" flex items-center h-screen	">
      <SweetAlert
        status={alertStatus}
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />

      <form
        className="myLogin mx-auto myform"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="paraIn">
          Login
          <FontAwesomeIcon icon={faSignIn} className="ms-2" />
        </p>
        <div className="container flex gap-5 "></div>
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

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mybtn"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
