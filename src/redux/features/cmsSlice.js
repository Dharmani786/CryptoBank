import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {STORAGE_KEYS} from '../../constants/Storage'
import { API_URL, END_POINTS } from "../../constants/Urls";


export const CMS = createAsyncThunk('CMS/GETCMS', async () => {
  const token =  localStorage.getItem(STORAGE_KEYS.token);
    console.log('new',token)
    const response = await fetch(`${API_URL}${END_POINTS?.cms}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    // if (!response.ok) {
    //   throw new Error('failed');
    // }
    const CMSDATA = await response.json();
    return CMSDATA;
  }); 


const CmsSlice = createSlice({
    name: 'CMS',
    initialState: {
      status: 'idle',
      error: null,
      data: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(CMS.pending, (state) => {
            console.log('no',state)
            state.status = 'loading';
          })
         .addCase(CMS.fulfilled, (state, action) => {
            console.log('yes',action.payload)
            state.status = 'succeeded';
            state.user = action.payload;
          })
         .addCase(CMS.rejected, (state, action) => {
            console.log('rej')
            state.status = 'failed';
            state.error = action.error.message;
          });
      }
   
  });

  export default CmsSlice.reducer