import axios from "axios";
import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  LOADING,
  EDIT_FORM_POPUP,
} from "../actionTypes/types";
export const addItem = (data) => async (dispatch) => {
  try {
    const addedItem = await axios.post(
      "http://localhost:5000/api/stock/additem",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: ADD_ITEM,
      payload: addedItem.data,
    });
  } catch (err) {
    return err;
  }
};
export const getAllItem = () => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    let allItems = await axios.get("http://localhost:5000/api/stock/allItem");
    dispatch({
      type: GET_ALL_ITEMS,
      payload: allItems.data,
    });
    dispatch(isLoading(false));
  } catch (err) {
    console.log(err);
  }
};
export const getOneItem = (id) => async (dispatch) => {
  try {
    const oneItem = await axios.get(
      `http://localhost:5000/api/stock/getOneItem/${id}`
    );
    dispatch({
      type: GET_ONE_ITEM,
      payload: oneItem.data,
    });
  } catch (err) {
    return err;
  }
};

export const editItem = (id, data) => async (dispatch) => {
  try {
    let updatedItem = await axios.put(
      `http://localhost:5000/api/stock/modifyItem/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: EDIT_ITEM,
      payload: updatedItem,
    });
    return updatedItem;
  } catch (err) {
    return err;
  }
};
export const deleteItem = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/stock/deleteItem/${id}`
    );
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const isLoading = (data) => ({
  type: LOADING,
  payload: data,
});
export const editFormPopUp = (data, id) => ({
  type: EDIT_FORM_POPUP,
  payload: { isPopperOpen: data, id: id },
});
