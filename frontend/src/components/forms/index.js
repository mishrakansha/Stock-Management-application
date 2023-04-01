import { connect } from "react-redux";
import NewItemForm from "./NewItemForm";
import { mapStateToProps, mapDispatchToProps } from "./props";

export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
