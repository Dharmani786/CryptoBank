import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { API_URL, END_POINTS } from "../../constants/Urls";
import { STORAGE_KEYS, getFromStorage, removeFromStorage } from "../../constants/Storage";
import { errorToast } from "../../constants/ShowToast";

export const payEmi = createAsyncThunk("Emi/payemi", async (id) => {
  const token = JSON.parse(getFromStorage(STORAGE_KEYS.token));

  const response = await fetch(
    `https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/payEmi/${id?.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseData = await response.json();

  console.log("payemiDataget", responseData);
  return responseData;
});

export const activeLoanDetails = createAsyncThunk(
  "Activeloandetails/activeloandetails",
  async (id) => {
    const token = JSON.parse(getFromStorage(STORAGE_KEYS.token));

    const response = await fetch(
      `https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/activeLoanById/${id?.id}`,
      {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();
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
);

export const getEmi = createAsyncThunk("Getemi/getemi", async (emiData) => {
  const token = JSON.parse(getFromStorage(STORAGE_KEYS.token));

  console.log({ emiData });

  const response = await fetch(
    `https://decentralizedbankapi.appgrowthcompany.com/api/v1/user/getemi/${emiData?.id}`,
    {
      method: "POST",
      body: JSON.stringify(emiData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseData = await response.json();

  console.log("getemiDataget", responseData);
  return responseData;
});

const emiSlice = createSlice({
  name: "emi",
  initialState: {
    loading: false,
    error: null,
    data: null,
    activeLoan: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(payEmi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(payEmi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(payEmi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(activeLoanDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.activeLoan = null;
      })
      .addCase(activeLoanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.activeLoan = action.payload;
      })
      .addCase(activeLoanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEmi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getEmi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getEmi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default emiSlice.reducer;
