import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    // Store only the necessary information about the socket
    socketId: null,
  },
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
  },
});

export const { setSocketId } = socketSlice.actions;
export default socketSlice.reducer;
