import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {STORAGE_KEYS, removeFromStorage} from '../../constants/Storage'
import { errorToast } from "../../constants/ShowToast";


export const forgotPassword = createAsyncThunk('forgotPassword/forgotPassword', async ({key:email}) => {
  const token =  localStorage.getItem(STORAGE_KEYS.token);
    console.log('new',token)
    const response = await fetch('https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/forgotPassword', {
      method: 'POST',
      body: JSON.stringify({key:email}),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    // if (!response.ok) {
    //   throw new Error('failed');
    // }
    const forgotPasswordData = await response.json();
    if (forgotPasswordData?.statusCode === 401) {
      const errors = Object.values(forgotPasswordData);
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
    return forgotPasswordData;
  }); 


const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
      status: false,
      error: null,
      data: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(forgotPassword.pending, (state) => {
            console.log('no',state)
            state.status = true;
          })
         .addCase(forgotPassword.fulfilled, (state, action) => {
            console.log('yes',action.payload)
            state.status = false;
            state.user = action.payload;
          })
         .addCase(forgotPassword.rejected, (state, action) => {
            console.log('rej')
            state.status = false;
            state.error = action.error.message;
          });
      }
   
  });

  export default forgotPasswordSlice.reducer