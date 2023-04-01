import { getAllItem } from "./../../redux/actions/stocks";
const mapStateToProps = (state) => ({
  isPopperOpen: state.items.isPopperOpen.isPopperOpen,
  isloading: state.items.isloading,
  item: state.items.stockItems,
});
const mapDispatchToProps = (dispatch) => ({
  getAllItem: () => {
    dispatch(getAllItem());
  },
});
export { mapStateToProps, mapDispatchToProps };
