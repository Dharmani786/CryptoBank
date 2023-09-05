import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEYS, removeFromStorage } from '../../constants/Storage';
import { API_URL, END_POINTS } from '../../constants/Urls';
import { errorToast } from '../../constants/ShowToast';

export const fetchRevertLoanData = createAsyncThunk(
  'revertLoan/fetchRevertLoanData',
  async (loanNumber) => {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEYS.token));
    console.log(token, loanNumber, 'sdsgsf')
    try {
      const queryParams = new URLSearchParams(loanNumber).toString();
      const url = `${API_URL}${END_POINTS.revertLoan}${loanNumber}`;
      console.log(url, 'url')
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': "Bearer " + token
        }
      })
      const data = await response.json();
      if (data?.statusCode === 401) {
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
      console.log(error, 'gfdayugfa')
      throw new Error('Error fetching requested loan data: ', error);
    }
  }
);

const revertLoanSlice = createSlice({
  name: 'revertLoan',
  initialState: {
    data: [],
    headers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevertLoanData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevertLoanData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;

      })
      .addCase(fetchRevertLoanData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default revertLoanSlice.reducer;