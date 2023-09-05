import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEYS, removeFromStorage } from '../../constants/Storage';
import { errorToast } from '../../constants/ShowToast';

export const getProfile = createAsyncThunk(
  'getProfile/getProfileData',
  async () => {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEYS.token));
    console.log(token,'sdsgsf')
    try {
      const url = `https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/getProfile`;
      console.log(url,'url')
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': "Bearer " + token
        }      
      });
      const data = await response.json();
      console.log(data,'frefer')
      console.log(data,'=======data=');
      if (data?.statusCode === 401) {
        console.log('helo', data?.statusCode);
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
const getProfileSLice = createSlice({
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
     .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
     .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        
      })
     .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getProfileSLice.reducer;