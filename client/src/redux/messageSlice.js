// messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      // Append new messages to the existing state.messages array
      state.messages = [...state.messages, ...action.payload];
    }
  }
});


export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
