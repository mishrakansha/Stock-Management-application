import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
} from "./types";
import axios from "axios";
export const addItem = (data) => async (dispatch) => {
  try {
    axios.post("http://localhost:5000/api/stock/additem", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: ADD_ITEM,
      payload: data.data,
    });
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }

  // return {
  //   type: ADD_ITEM,
  //   payload: item,
  // };
};
export const getAllItem = () => (dispatch) => {
  console.log("action");
  axios
    .get("http://localhost:5000/api/stock/allItem")
    .then((data) => {
      dispatch({
        type: GET_ALL_ITEMS,
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getOneItem = (item) => {
  return {
    type: GET_ONE_ITEM,
    payload: item,
  };
};
export const editItem = (item) => {
  return {
    type: EDIT_ITEM,
    payload: item,
  };
};
export const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    payload: item,
  };
};
