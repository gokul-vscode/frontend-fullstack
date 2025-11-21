import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("userName");

const initialState = {
  userName: savedUser ? JSON.parse(savedUser):"",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userName = "";
      localStorage.removeItem("userName");
    }
  }
});

export const { setUserName, logoutUser } = userSlice.actions;

export default userSlice.reducer;
