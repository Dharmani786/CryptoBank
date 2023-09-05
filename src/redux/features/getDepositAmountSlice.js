import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEYS, removeFromStorage } from '../../constants/Storage';
import { API_URL, END_POINTS } from '../../constants/Urls';
import { errorToast } from '../../constants/ShowToast';

export const getDepositAmount = createAsyncThunk(
  'getDepositAmount/getDepositAmountData',
  async () => {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEYS.token));
    console.log(token,'sdsgsf')
    try {
      const url = `${API_URL}${END_POINTS.getCollateralDetails}`;
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
      throw new Error('Error fetching requested loan data: ', error);
    }
  }
);
const getDepositAmountSlice = createSlice({
  name: 'getDepositAmount',
  initialState: {
    data: [],
    headers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(getDepositAmount.pending, (state) => {
        state.loading = true;
      })
     .addCase(getDepositAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
     .addCase(getDepositAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getDepositAmountSlice.reducer;