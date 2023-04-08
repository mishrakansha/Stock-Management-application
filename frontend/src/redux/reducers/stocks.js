// import { ActionTypes } from "@mui/base";
import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  LOADING,
  EDIT_ITEM,
  ADD_FORM_POPUP,
  DELETE_ITEM,
  EDIT_FORM_POPUP,
} from "../actionTypes/types";
const initialState = {
  stockItems: [],
  singleStockDetails: {},
  isloading: false,
  isEditPopperOpen: { isPopperOpen: false, id: "" },
  isAddPopperOpen: false,
};
const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      const { stockItems } = state;
      const copyOfStockItems = [...stockItems, payload];
      return {
        ...state,
        stockItems: copyOfStockItems,
      };
    case GET_ALL_ITEMS:
      return { ...state, stockItems: payload };
    case GET_ONE_ITEM:
      return { ...state, singleStockDetails: payload };
    case EDIT_ITEM:
      const { data } = payload;
      const { _id: id } = payload.data;
      const updatedData = state.stockItems.map((item) => {
        const { _id: itemId } = item;
        if (itemId === id) {
          return {
            ...data,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        stockItems: updatedData,
      };
    case DELETE_ITEM:
      const newData = state.stockItems.filter(
        (element) => element._id !== payload
      );
      return {
        ...state,
        stockItems: newData,
      };
    case LOADING:
      return { ...state, isloading: payload };
    case EDIT_FORM_POPUP:
      return { ...state, isEditPopperOpen: payload };
    case ADD_FORM_POPUP:
      console.log("payload", payload);
      return { ...state, isAddPopperOpen: payload };
    default:
      return state;
  }
};
export default itemReducer;
