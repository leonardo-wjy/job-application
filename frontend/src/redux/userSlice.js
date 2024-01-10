import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    data: {},
    token: "",
  },
  reducers: {
    setUser: (state, action) => ({
      ...state,
      data: { ...action.payload.data },
      token: action.payload.data.token,
    }),
    removeUser: (state) => ({
      data: {},
      token: "",
    }),
  },
});

export const { setUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
