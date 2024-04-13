import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axios/axiosInstance';

export const getUsersListThunk = createAsyncThunk('users/update', async () => {
  const res = await axiosInstance.patch('/users/update/');
  return res.data;
});

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
