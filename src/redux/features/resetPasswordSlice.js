import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {STORAGE_KEYS, removeFromStorage} from '../../constants/Storage'
import { errorToast } from "../../constants/ShowToast";

export const resetPassword = createAsyncThunk('resetPassword/resetPassword', async ({  key:email,
    password}) => {
      const token =  JSON.parse(localStorage.getItem(STORAGE_KEYS.token));
    console.log('new',token)
    const response = await fetch('https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/resetPassword', {
method: 'POST',
      body: JSON.stringify({  key:email,
        password}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + token
      }
    });      
  
    // if (!response.ok) {
    //   throw new Error('failed');
    // }
    const resetData = await response.json();
    if (resetData?.statusCode === 401) {
      const errors = Object.values(resetData);
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
    return resetData;
  }); 


const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
      status: false,
      error: null,
      user: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(resetPassword.pending, (state) => {
            console.log('pending',state)
            state.status = true;
          })
         .addCase(resetPassword.fulfilled, (state, action) => {
            console.log('fulfilled',action.payload.user)
            state.status = false;
            state.user = action.payload;
          })
         .addCase(resetPassword.rejected, (state, action) => {
            console.log('rej')
            state.status = false;
            state.error = action.error.message;
          });
      }
   
  });

  export default resetPasswordSlice.reducer