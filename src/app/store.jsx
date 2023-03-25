import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../features/notification/notificationSlice';
import messageReducer from '../features/message/messageSlice';
import accountReducer from '../features/account/accountSlice';

const store = configureStore({
   reducer: {
      notification: notificationReducer,
      reply: messageReducer,
      account: accountReducer
   }
})

export default store