import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
        console.log('reducer',action)
        state.token= action.payload.token
        state.user = action.payload.user;
    }
  }
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;