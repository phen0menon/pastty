import { combineReducers } from "redux";
import guestReducer from "./guestReducer";

export default combineReducers({
  guest: guestReducer
});
