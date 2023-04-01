import { addItem } from "./../../redux/actions/stocks";
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addItem: (data) => {
    dispatch(addItem(data));
  },
});

export { mapDispatchToProps, mapStateToProps };
