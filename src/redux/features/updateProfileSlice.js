import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {STORAGE_KEYS, removeFromStorage} from '../../constants/Storage'
import { errorToast } from '../../constants/ShowToast';
export const updateProfile = createAsyncThunk('updateProfile/updateProfile', async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEYS.token));
    const response = await fetch('https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/updateProfile', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState: {
    status: 'idle',
    error: null,
    user: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(updateProfile.pending, (state) => {
        // console.log('no',state)
        state.status = 'loading';
      })
     .addCase(updateProfile.fulfilled, (state, action) => {
        // console.log('yes',action.payload)
        state.status = 'succeeded';
        state.user = action.payload;
      })
     .addCase(updateProfile.rejected, (state, action) => {
        // console.log('rej',action)
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default updateProfileSlice.reducer;
