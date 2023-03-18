import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

const reducers = combineReducers({
  allItem: itemReducer,
});

export default reducers;
