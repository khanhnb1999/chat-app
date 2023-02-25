import { createSlice } from '@reduxjs/toolkit';
import { useRef } from 'react';

const messageSlice = createSlice({
       name: 'reply-message',
       initialState: {
              replyMessage: {
                     user: '',
                     content: '',
                     completeReply: false
              },
              toggleHideShow: {
                     isCompleted: false
              }
       },
       reducers: {
              showReply: (state, action) => {
                     state.replyMessage = action.payload;
              },
              hiddenReply: (state, action) => {
                     state.replyMessage.completeReply = action.payload;
              },
              toggleCompleted: (state, action) => {
                     state.toggleHideShow.isCompleted = action.payload;
              }
       }
})

export const { 
       showReply, 
       hiddenReply,
       toggleCompleted,
} = messageSlice.actions;

export default messageSlice.reducer;

