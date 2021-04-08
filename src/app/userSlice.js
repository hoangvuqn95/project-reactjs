import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
  // ThunkAPI dispatch...
  const currentUser = await userApi.getMe();
  return currentUser;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getMe.pending]: (state) => {
      state.loading = true;
    },
    [getMe.rejected]: (state, action) => {
      state.loading = false;
      state.error = '';
    },
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload; // payload se return ra currentUser tren ham` getMe
    },
  },
});

const { reducer: userReducer } = userSlice;

export default userReducer;
