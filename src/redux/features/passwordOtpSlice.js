import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STORAGE_KEYS, removeFromStorage, setToStorage } from "../../constants/Storage";
import { errorToast } from "../../constants/ShowToast";

export const resetOtp = createAsyncThunk(
  "Verify/resetOtp",
  async (veificationData) => {
    
    try {
      const response = await axios.post(
        "https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/otp_verfication",
        veificationData
      );
      const responseData = response.data;
      setToStorage(STORAGE_KEYS.token, JSON.stringify(responseData?.data.token || ""));
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
    } catch (error) {
      throw error;
    }
  }
);

 
const resetOtpSlice = createSlice({
  name: " resetotp",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetOtp.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(resetOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(resetOtp.rejected, (state, action) => {
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
export default resetOtpSlice.reducer;