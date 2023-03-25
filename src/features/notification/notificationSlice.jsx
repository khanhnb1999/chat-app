import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

export const notification = createSlice({
   name: 'notification',
   initialState: {
      alert: {},
      error: {
         username: '',
         email: '',
         password: '',
         complete: false
      }
   },
   reducers: {
      showsAlert: (state, action) => {
         state.alert = action.payload
         message.open(state.alert)
      },
      showsError: (state, action) => {
         state.error = action.payload;
      }
   }
})

export const { showsAlert, showsError } = notification.actions;
export default notification.reducer;

