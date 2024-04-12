import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      image: '',
      id: '',
    },
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo.firstName = action.payload.first_name;
      state.userInfo.lastName = action.payload.last_name;
      state.userInfo.email = action.payload.email;
      state.userInfo.phone = action.payload.phone;
      state.userInfo.image = action.payload.image;
      state.userInfo.id = action.payload.id;
    },
  },
});

export const { addUserInfo } = userSlice.actions;

export default userSlice.reducer;
