import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, END_POINTS } from "../../constants/Urls";
import { STORAGE_KEYS, getFromStorage, removeFromStorage } from "../../constants/Storage";
import { errorToast } from "../../constants/ShowToast";

export const logOut = createAsyncThunk(
  "logout/logOut",
  async () => {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEYS.token));
    const response = await fetch(
      `${API_URL}${END_POINTS.log_out}`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    const logout = await response.json();
    if (logout?.statusCode === 401) {
      const errors = Object.values(logout);
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
    return logout;
  }
);

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    loading: false,
    error: null,
    logoutData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.logoutData = null;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.logoutData = action.payload;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;
