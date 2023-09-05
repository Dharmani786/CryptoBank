import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, END_POINTS } from "../../constants/Urls";
import { STORAGE_KEYS, removeFromStorage } from "../../constants/Storage";
import axios from "axios";
import { errorToast } from "../../constants/ShowToast";


export const registerUser = createAsyncThunk(
  "Register/registerUser",
  async (userCredential) => {
    
      const response = await axios.post(
        `${API_URL}${END_POINTS.signUp}`,
        userCredential
      );

      if (response) {
        const responseData = response.data;
        if (responseData?.statusCode === 401) {
          const errors = Object.values(responseData);
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
        return responseData;
      } else {
        throw new Error("Registration failed");
      }
    
  }
);


const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
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

export default registerSlice.reducer;
