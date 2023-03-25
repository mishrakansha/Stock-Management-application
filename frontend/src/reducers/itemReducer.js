// import { ActionTypes } from "@mui/base";
import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  LOADING,
  EDIT_ITEM,
  DELETE_ITEM,
} from "../actions/types";
const initialState = [];
const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return { ...state, items: payload };
    case GET_ALL_ITEMS:
      return { ...state, items: payload };
    case GET_ONE_ITEM:
      return { payload };
    case EDIT_ITEM:
      return state;
    case DELETE_ITEM:
      return state;
    case LOADING:
      return { ...state, isloading: payload };

    default:
      return state;
  }
};
export default itemReducer;
