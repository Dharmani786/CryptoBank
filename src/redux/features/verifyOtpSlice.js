import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, END_POINTS } from "../../constants/Urls";
import { STORAGE_KEYS, setToStorage } from "../../constants/Storage";

export const verifyOtp = createAsyncThunk(
  "Verify/verifyOtp",
  async (veificationData) => {
    try {
      
      const response = await axios.post(
        `${API_URL}${END_POINTS.otp_verify}`,
        veificationData
      );
      if (response!== '' && response.status === 200) {
        const responseData = response.data;
        console.log(responseData.data.token)
        setToStorage(STORAGE_KEYS.token, JSON.stringify(responseData?.data.token || ""));
        console.log(responseData.data.token)
      }
    } catch (error) {
      throw error;
    }
  }
);

const otpVerifySlice = createSlice({
  name: " verify",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
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

export default otpVerifySlice.reducer;
