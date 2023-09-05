import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEYS, getFromStorage, removeFromStorage, setToStorage } from '../../constants/Storage';
import { API_URL, END_POINTS } from '../../constants/Urls';
import { errorToast } from '../../constants/ShowToast';
export const login = createAsyncThunk('login/login', async (data) => {

  const response = await fetch(`${API_URL}${END_POINTS.signin}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const apiData = await response.json();
  setToStorage(STORAGE_KEYS.token, JSON.stringify(apiData?.data.token || ""));
  if (apiData?.statusCode === 401) {
    const errors = Object.values(apiData);
    if (errors?.length) {
      const error = errors[0];
      if (error) {          
        errorToast(error);
        removeFromStorage(STORAGE_KEYS.token);
        removeFromStorage(STORAGE_KEYS.userData);
        window?.location?.replace("/");
      }
    }
  }
  return apiData;
});

const initialState = {
  data: null
};
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    status: false,
    error: null,
    user: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log('no',state)
        state.status = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log('yes',action.payload)
        state.status = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        // console.log('rej',action)
        state.status = false;
        state.user = action.payload
        state.error = action.error.message;
      });
  }
});

export default loginSlice.reducer;
