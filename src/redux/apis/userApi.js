import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axios/axiosInstance';

export const getUsersListThunk = createAsyncThunk(
  'users/update',
  async (formData) => {
    const res = await axiosInstance.patch(
      'http://127.0.0.1:8000/users/update/',
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': localStorage.getItem('token'),
        },
      },
    );
    return res.data;
  },
);

export const userAPISlicce = createSlice({
  name: 'userApi',
  initialState: {
    userList: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersListThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersListThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
    builder.addCase(getUsersListThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
export default userAPISlicce.reducer;
