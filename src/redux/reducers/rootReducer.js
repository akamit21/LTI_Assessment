import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { userReducer } from "./user.reducer";
import { eventReducer, fetchEventReducer } from "./event.reducer";

const rootReducer = combineReducers({
  authReducer,
  eventReducer,
  fetchEventReducer,
  userReducer,
});

export default rootReducer;
