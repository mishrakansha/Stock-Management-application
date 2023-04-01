import React from "react";
import { shallow } from "enzyme";
import NewItemForm from "./NewItemForm";

describe("NewItemForm", () => {
  it("Take a snapshot if do not added", () => {
    const component = shallow(<NewItemForm />);
    expect(component).toMatchSnapshot();
  });
});
