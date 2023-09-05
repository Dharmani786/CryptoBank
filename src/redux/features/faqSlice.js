import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {STORAGE_KEYS} from '../../constants/Storage'
import { API_URL, END_POINTS } from "../../constants/Urls";


export const faq = createAsyncThunk('faq/getFaq', async () => {
  const token =  localStorage.getItem(STORAGE_KEYS.token);
    console.log('new',token)
    const response = await fetch(`${API_URL}${END_POINTS?.faq}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    // if (!response.ok) {
    //   throw new Error('failed');
    // }
    const faqdata = await response.json();
    return faqdata;
  }); 


const faqSlice = createSlice({
    name: 'faq',
    initialState: {
      status: 'idle',
      error: null,
      data: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(faq.pending, (state) => {
            console.log('no',state)
            state.status = 'loading';
          })
         .addCase(faq.fulfilled, (state, action) => {
            console.log('yes',action.payload)
            state.status = 'succeeded';
            state.user = action.payload;
          })
         .addCase(faq.rejected, (state, action) => {
            console.log('rej')
            state.status = 'failed';
            state.error = action.error.message;
          });
      }
   
  });

  export default faqSlice.reducer