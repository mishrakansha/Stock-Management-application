import { combineReducers } from "redux";
import stocksReducer from "./stocksReducer";
import navBar from "./navBar";
const reducers = combineReducers({
  items: stocksReducer,
  navBar: navBar,
});
export default reducers;
