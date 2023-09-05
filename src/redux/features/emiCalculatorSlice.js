import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorToast } from '../../constants/ShowToast';
import { STORAGE_KEYS, removeFromStorage } from '../../constants/Storage';

export const emiCalculator = createAsyncThunk('emiCalculator/calculateEMI', async (data) => {
  try {
    const response = await fetch('https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/calculateEmi', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    if (result?.statusCode === 401) {
      const errors = Object.values(result);
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
    return result;
  } catch (error) {
    console.log(error,'eerrrrrrrroe')
    throw new Error(error.message);
  }
});

const emiCalculatorSlice = createSlice({
  name: 'emiCalculator',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(emiCalculator.pending, (state) => {
        state.loading = true;
      })
     .addCase(emiCalculator.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
     .addCase(emiCalculator.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload
        state.error = action.error.message;
      });
  },
});

export default emiCalculatorSlice.reducer;