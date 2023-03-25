import {
  ADD_ITEM,
  GET_ALL_ITEMS,
  GET_ONE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  LOADING,
} from "./types";
import axios from "axios";
export const addItem = (data) => (dispatch) => {
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
};
export const getAllItem = () => (dispatch) => {
  dispatch(isLoading(true));

  axios
    .get("http://localhost:5000/api/stock/allItem")
    .then((data) => {
      dispatch({
        type: GET_ALL_ITEMS,
        payload: data.data,
      });
      dispatch(isLoading(false));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getOneItem = (id) => async (dispatch) => {
  const res = await axios
    .get(`http://localhost:5000/api/stock/getOneItem/${id}`)
    .then((data) => {
      dispatch({
        type: GET_ONE_ITEM,
        payload: data.data,
      });
      return Promise.resolve(data.data);
    })
    .catch((err) => {
      return Promise.resolve(err);
    });
  return res;
};

export const editItem = (id, data) => (dispatch) => {
  try {
    axios.put(`http://localhost:5000/api/stock/modifyItem/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: EDIT_ITEM,
      payload: data.data,
    });
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const deleteItem = (id) => (dispatch) => {
  try {
    const res = axios.delete(
      `http://localhost:5000/api/stock/deleteItem/${id}`
    );
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const isLoading = (data) => ({
  type: LOADING,
  payload: data,
});
