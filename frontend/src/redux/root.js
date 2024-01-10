import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toggleReducer from "./toggleSlice";

export default combineReducers({
  user: userReducer,
  toggle: toggleReducer,
});
