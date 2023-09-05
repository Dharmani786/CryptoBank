import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, END_POINTS } from "../../constants/Urls";
import {STORAGE_KEYS, getFromStorage, removeFromStorage} from '../../constants/Storage'
import { successToast,errorToast } from "../../constants/ShowToast";


export const changePassword = createAsyncThunk(
    "Changepassword/changePassword",
    async (ChangePasswordData) => {
      const token = JSON.parse(getFromStorage(STORAGE_KEYS.token));
      console.log('yehdsbnm=================', ChangePasswordData);
  
        const response = await fetch(
            `${API_URL}${END_POINTS.change_pass}`,
           {
            method : "POST",
            body: JSON.stringify(ChangePasswordData),
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
           }
        );
        const changepassdata = await response.json();

        if (response.status === 200) {
          successToast('Password changed successfully'); 
        } else {
          errorToast('Current password is invalid'); 
        }
        if (changepassdata?.statusCode === 401) {
          const errors = Object.values(changepassdata);
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

       return changepassdata
          
     }); 

  const changePasswordSlice = createSlice({
    name: "changepassword ",
    initialState: {
      loading: false,
      user: null,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(changePassword.pending, (state) => {
          state.loading = true;
          state.user = null;
          state.error = null;
        })
        .addCase(changePassword.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(changePassword.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          console.log(action.error.message);
          if (action.error.message === "Request failed with status code 401") {
            state.error = "Access Denied! Invalid credentials";
          } else {
            state.error = action.error.message;
          }
        });
    },
  });
  export default changePasswordSlice.reducer;