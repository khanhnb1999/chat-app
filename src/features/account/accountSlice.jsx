import { createSlice } from "@reduxjs/toolkit";
import { io } from 'socket.io-client';

const { username, email, avatar, _id } = 
JSON.parse(localStorage.getItem('chat-user')) ? 
JSON.parse(localStorage.getItem('chat-user')): {}
;

const accountSlice = createSlice({
       name: 'account',
       initialState: {
              users: {
                     currentUser: {
                            id: _id,
                            currentUserName: username,
                            email: email,
                            avatar: avatar
                     },
                     currentChat: {
                            _id: undefined,
                            username: '',
                            email: '',
                            avatar: '',
                     }
              },
              groups: {
                     nameGroup: '',
                     users: [],
                     isCompleted: false,
                     disable: false,
                     rooms: ''
              }
       },
       reducers: {
              setNameGroup: (state, action) => {
                     state.groups.nameGroup = action.payload;
              },
              setUsersGroup: (state, action) => {
                     const { _id } = action.payload;
                     const index = state.groups.users.findIndex((user) => user._id === _id);
                     if(index != -1) {
                            const result = state.groups.users.filter((user) => user._id !== _id);
                            state.groups.users = result;
                     } else {
                            state.groups.users.push(action.payload);
                     };

                     if(state.groups.users.length >= 2 ) {
                            state.groups.disable = true;
                     } else {
                            state.groups.disable = false;
                     }

              },
              setRooms: (state, action) => {
                     const socket = io('http://localhost:3003');
                     if(action.payload) {
                            state.groups.rooms = action.payload;
                            socket.emit('join__rooms', state.groups.rooms._id)
                            state.users.currentChat = {};
                     } else {
                            state.groups.rooms = '';
                     }
              },
              toggleModal: (state,action) => {
                     state.groups.isCompleted = action.payload;
                     state.groups.users = [];
              },
              setCurrentChat: (state, action) => {
                     state.users.currentChat = action.payload;
                     state.groups.rooms = '';
              },

       } 
});

export const { 
       setCurrentChat,
       setNameGroup, 
       setUsersGroup,
       setRooms,
       toggleModal,
} = accountSlice.actions;
export default accountSlice.reducer;