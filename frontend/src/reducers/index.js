import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import navBar from "./navBar";

const reducers = combineReducers({
  items: itemReducer,
  navBar: navBar,
});
export default reducers;
