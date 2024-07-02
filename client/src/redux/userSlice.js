import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
  name:"user",
  initialState:{
    authuser:null,
    OtherUsers:null,
    selectedUser:null,
    onlineUsers:[],
  },
  reducers:{
    setAuthUser:(state,action)=>{
      state.authuser=action.payload;
    },
    setOtherUsers:(state,action)=>{
      state.OtherUsers=action.payload;
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers=action.payload
    }
  }
})

export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers}=userSlice.actions;
export default userSlice.reducer;