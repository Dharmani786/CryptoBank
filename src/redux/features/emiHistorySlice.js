import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEYS, removeFromStorage } from '../../constants/Storage';
import { errorToast } from '../../constants/ShowToast';

export const fetchEmiHistory = createAsyncThunk(
  'fetchEmi/fetchEmiHistory',
  async (params) => {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEYS.token));
    console.log(token,params,'sdsgsf')
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/emiTransactionHistory?${queryParams}`;
      console.log(url,'url')
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': "Bearer " + token
        }      
      });
      const data = await response.json();
      if (data?.statusCode === 401) {
        const errors = Object.values(data);
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
      return data;
    } catch (error) {
      console.log(error,'gfdayugfa')
      throw new Error('Error fetching requested loan data: ', error);
    }
  }
);
const emiHistorySlice = createSlice({
  name: 'emiHistory',
  initialState: {
    data: [],
    headers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(fetchEmiHistory.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchEmiHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
     .addCase(fetchEmiHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default emiHistorySlice.reducer;