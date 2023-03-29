// import { ActionTypes } from "@mui/base";
import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  LOADING,
  EDIT_ITEM,
  DELETE_ITEM,
  EDIT_FORM_POPUP,
} from "../actions/types";
const initialState = {
  stockItems: [],
  singleStockDetails: {},
  isloading: false,
  isPopperOpen: false,
};
const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        stockItems: [...state.stockItems, payload],
      };
    case GET_ALL_ITEMS:
      return { ...state, stockItems: payload };
    case GET_ONE_ITEM:
      return { ...state, singleStockDetails: payload };
    case EDIT_ITEM:
      // return state;
      let arr = state.stockItems.map((item) => {
        if (item._id === payload.data._id) {
          return {
            ...payload.data,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        stockItems: arr,
      };
    case DELETE_ITEM:
      return {
        ...state,
        stockItems: state.stockItems.filter(
          (element) => element._id !== payload
        ),
      };

    // return state;
    case LOADING:
      return { ...state, isloading: payload };
    case EDIT_FORM_POPUP:
      // console.log("payload", payload);
      // console.log(state);
      return { ...state, isPopperOpen: payload };

    default:
      return state;
  }
};
export default itemReducer;
