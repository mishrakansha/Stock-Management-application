import {
  editFormPopUp,
  editItem,
  getOneItem,
} from "../../redux/actions/stocks";
const mapStateToProps = (state) => {
  return {
    oneItem: state.items.singleStockDetails,
    isPopperOpen: state.items.isPopperOpen.isPopperOpen,
    editFormId: state.items.isPopperOpen.id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOneItem: async (id) => {
    await dispatch(getOneItem(id));
  },
  editItem: (id, data) => {
    dispatch(editItem(id, data));
  },
  editFormPopUp: (data, id) => {
    dispatch(editFormPopUp(data, id));
  },
});
export { mapStateToProps, mapDispatchToProps };
