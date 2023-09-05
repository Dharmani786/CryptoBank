import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_KEY, END_POINTS, ETH_URL } from '../../../constants/Urls';
import { errorToast } from '../../../constants/ShowToast';
import { STORAGE_KEYS, removeFromStorage } from '../../../constants/Storage';

export const EthApi = createAsyncThunk('EthApi/EthApi', async (accountAddress) => {
console.log('account',accountAddress)


const url =`${ETH_URL}?module=account&action=txlistinternal&address=${accountAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`
console.log(url,'ereregrejrkle;')


  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const apiData = await response.json();
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
const transactionApiSlice = createSlice({
  name: 'EthApi',
  initialState: {
    status: false,
    error: null,
    user: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EthApi.pending, (state) => {
        // console.log('no',state)
        state.status = true;
      })
      .addCase(EthApi.fulfilled, (state, action) => {
        // console.log('yes',action.payload)
        state.status = false;
        state.user = action.payload;
      })
      .addCase(EthApi.rejected, (state, action) => {
        // console.log('rej',action)
        state.status = false;
        state.user = action.payload
        state.error = action.error.message;
      });
  }
});

export default transactionApiSlice.reducer;
