import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SweetAlert from '../../../components/alert';
import { getUsersListThunk } from '../../../redux/apis/userApi';
import { useForm } from 'react-hook-form';
import { addUserInfo } from '../../../redux/slices/userSlice';
import DataTable from '../../../components/shipment-grid/shipment-grid';
const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [wantUpdate, setWantUpdate] = useState(true);
  const [myImage, setMyImage] = useState(userInfo.image);
  const [isResponseCome, setIsResponseCome] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [shipment, setShipment] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  const base_url = import.meta.env.VITE_base_url;

  const dispatch = useDispatch();

  const updateMyProfile = () => {
    setWantUpdate(false);
  };
  const fetchData = async () => {
    const res = await dispatch(getUsersListThunk());
    setMyImage(res.payload?.image);
    dispatch(addUserInfo(res.payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpdate = (data) => {
    setIsResponseCome(true);
    const formData = new FormData();
    formData.append('image', data.target.files[0]);
    axios
      .patch(`${base_url}users/update/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setMyImage(response.data.image);
      })
      .catch((error) => {
        console.error(error);
        setAlertStatus('error');
        setAlertMessage(
          error.response?.data.error ||
            error.response?.data.detail ||
            'Internal Server Error !',
        );
        setShowAlert(true);
      })
      .finally(() => {
        setIsResponseCome(false);
      });
  };

  const handleComponentAppear = (event) => {
    console.log(event.target.innerText);
    if (event.target.innerText === 'Pubic Profile') {
      setPublicProfile(true);
      setShipment(false);
    } else if (event.target.innerText === 'Shipment Details') {
      setPublicProfile(false);
      setShipment(true);
    } else if (event.target.innerText === 'Payment Details') {
      setPublicProfile(false);
      setShipment(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] != undefined) {
        formData.append(key, data[key]);
      }
    });
    console.log(formData);

    axios
      .patch(`${base_url}users/update/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(addUserInfo(response.data));
        setWantUpdate(true);
        setAlertStatus('success');
        setAlertMessage('Updated Successfully');
        setShowAlert(true);
      })
      .catch(async (error) => {
        console.error(error);
        setAlertStatus('error');
        setAlertMessage(
          error.response.data?.error + error.response.data.email
            ? error.response.data.email[0]
            : '' + error.response.data.phone
              ? error.response.data.phone[0]
              : '',
        );
        setShowAlert(true);
      });
  };
  return (
    <>
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    body {\n        font-family: 'Plus Jakarta Sans', sans-serif;\n    }\n",
          }}
        />
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
          <SweetAlert
            status={alertStatus}
            message={alertMessage}
            show={showAlert}
            onClose={() => setShowAlert(false)}
          />
          <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
              <h2 className="pl-3 mb-4 text-2xl font-semibold donot-center">
                Settings
              </h2>
              <a
                href="#"
                className="flex myLink items-center px-3 py-2.5 font-semibold hover:text-[#9a5b65] hover:border hover:rounded-full active:text-[#9a5b65] active:border active:rounded-full donot-center"
                onClick={handleComponentAppear}
              >
                Pubic Profile
              </a>
              <a
                href="#"
                className="flex items-center  myLink px-3 py-2.5 font-semibold  hover:text-[#9a5b65] hover:border hover:rounded-full"
                onClick={handleComponentAppear}
              >
                Shipment Details
              </a>
            </div>
          </aside>

          {publicProfile && (
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
              <div className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Public Profile
                  </h2>
                  <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 ">
                      <div className="user-image">
                        <img
                          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-[#9a5b65] dark:ring-indigo-500 "
                          src={myImage}
                          alt="Bordered avatar"
                        />
                        <input
                          type="file"
                          id="image"
                          // className="bg-[#fff9fa] border border-[#9a5b65] text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your first name"
                          defaultValue=""
                          hidden
                          // value={userInfo.firstName}
                          required=""
                          onChangeCapture={handleImageUpdate}
                        />
                        <label htmlFor="image" className="myImageContainer">
                          {!isResponseCome ? (
                            <FontAwesomeIcon
                              icon={faPencil}
                              className="mypencil"
                            />
                          ) : (
                            <Spinner
                              animation="border"
                              role="status"
                              className="mypencil2"
                            >
                              <span className="sr-only">Loading...</span>
                            </Spinner>
                          )}
                        </label>
                        <p
                          className="block mb-2 text-sm font-medium text-[#7e7181]
                      dark:text-white mt-2"
                        >
                          {userInfo?.email}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-5 sm:ml-8">
                        <button
                          type="button"
                          className="transition duration-500 ease-in-out py-3.5 px-7 text-base font-medium text-[#32001a] focus:outline-none bg-[#9a5b65] rounded-lg border border-indigo-200 hover:bg-[#866b79] hover:text-[white] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                          onClick={updateMyProfile}
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                    <form
                      className="items-center mt-8 sm:mt-14 text-[#202142]"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-[#7e7181] dark:text-white"
                          >
                            Your first name
                          </label>

                          <input
                            type="text"
                            id="first_name"
                            className="bg-[#fff9fa] border border-[#9a5b65] text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Your first name"
                            defaultValue={userInfo.firstName}
                            required=""
                            disabled={wantUpdate}
                            {...register('first_name', {
                              pattern: {
                                value: /^[a-zA-Z]{2,100}$/,
                                message: 'name from 2 to 100 charachers',
                              },
                            })}
                          />
                          {errors.first_name && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.first_name.message}
                            </div>
                          )}
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="last_name"
                            className="block mb-2 text-sm font-medium text-[#7e7181] dark:text-white"
                          >
                            Your last name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="bg-[#fff9fa] border border-[#9a5b65] text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Your last name"
                            defaultValue={userInfo?.lastName}
                            required=""
                            disabled={wantUpdate}
                            {...register('last_name', {
                              pattern: {
                                value: /^[a-zA-Z]{2,100}$/,
                                message: 'name from 2 to 100 charachers',
                              },
                            })}
                          />
                          {errors.last_name && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.last_name.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-[#7e7181] dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="bg-[#fff9fa] border border-[#9a5b65] text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="your.email@mail.com"
                          defaultValue={userInfo.email}
                          // value={userInfo.email}
                          required=""
                          disabled={wantUpdate}
                          {...register('email', {
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: 'invalid email',
                            },
                          })}
                        />
                        {errors.email && (
                          <div className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="profession"
                          className="block mb-2 text-sm font-medium text-[#7e7181] dark:text-white"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          id="profession"
                          className="bg-[#fff9fa] border border-[#9a5b65] text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="your profession"
                          required=""
                          defaultValue={userInfo.phone}
                          disabled={wantUpdate}
                          {...register('phone', {
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
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="text-white transition duration-500 ease-in-out text-[#32001a] hover:text-[white] bg-[#9a5b65] text-[] hover:bg-[#866b79] focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          )}

          {shipment && (<DataTable />)}
        </div>
      </>
    </>
  );
};

export default UserProfile;
