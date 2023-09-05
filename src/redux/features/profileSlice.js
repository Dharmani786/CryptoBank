import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {STORAGE_KEYS, removeFromStorage} from '../../constants/Storage'
import { API_URL, END_POINTS } from "../../constants/Urls";
import { errorToast } from "../../constants/ShowToast";

export const profileData = createAsyncThunk(
  "Profile/profileData",
  async (userDetails) => {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEYS.token));

    try {
      const response = await axios.put(
        `${API_URL}${END_POINTS.update_profile}`,
        userDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response && response.status === 200) {
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
      }
    } catch (error) {
      throw error;
    }
  }
);

const profileDataSlice = createSlice({
    name: "profile ",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },


reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileData.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(profileData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(profileData.rejected, (state, action) => {
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


export default profileDataSlice.reducer;