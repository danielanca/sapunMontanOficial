import React from "react";
import { getByTestId, render, screen, cleanup, act } from "@testing-library/react";
import OrderDone from "../CartPage/OrderDone";
import FinishOrder from "../CartPage/FinishOrder";
import { BrowserRouter } from "react-router-dom";
import { areInputsValid } from "../CartPage/funcs";
import Checkboxer from "../MiniComponents/Checkboxer";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { describe, expect, test, afterEach } from "@jest/globals";
import "@testing-library/jest-dom";

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);

let mockObject = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  deliveryAddress: "",
  city: "",
  county: "",
  paymentMethod: "",
  cartProducts: "",
  phoneNo: "",
  cartSum: 0,
  shippingTax: 15,
  orderNotes: "",
  deliveryName: "DPD Curier",
  paymentStatus: "NOT_PAID"
};

let mockObjectFullFilled = {
  firstName: "Daniel",
  lastName: "Anca",
  emailAddress: "ancadaniel1994@gmailcom",
  deliveryAddress: "Plopilor nr.3",
  city: "Turda",
  county: "Cluj",
  paymentMethod: "",
  cartProducts: "",
  phoneNo: "0745469907",
  cartSum: 0,
  shippingTax: 15,
  orderNotes: "",
  deliveryName: "DPD Curier",
  paymentStatus: "NOT_PAID"
};
let mockObject_firstNameEmpty = {
  ...mockObjectFullFilled,
  firstName: "D"
};
let mockObject_lastNameEmpty = {
  ...mockObjectFullFilled,
  lastName: "D"
};

describe("[FinishOrder] Checks the areInputsValid functions", () => {
  test("Inputs are initialized with empty strings", () => {
    expect(areInputsValid(mockObject)).not.toBe(true);
  });

  test("(AllInputFields) filled with over 4characters each", () => {
    expect(areInputsValid(mockObjectFullFilled)).toBe(true);
  });
  test("(InputField) First Name -> have 1 character", () => {
    expect(areInputsValid(mockObject_firstNameEmpty)).toBe(false);
  });
  test("(InputField) Last Name -> have 1 character", () => {
    expect(areInputsValid(mockObject_lastNameEmpty)).toBe(false);
  });
});

describe("FinishOrder Component", () => {
  it("renders the Finish Form and Cash option is clicked, without Accepting Terms and Conditions", () => {
    render(
      <BrowserRouter>
        <FinishOrder />
      </BrowserRouter>
    );
    const onSwitchEnabled = (value: boolean, optionChoosed?: string) => {
      console.log("Switch turned:", value);
    };
    const checkBoxerComponent = mount(<Checkboxer onSwitchEnabled={onSwitchEnabled} name="Numerar" />);
    const checkboxItem = checkBoxerComponent.find('input[type="checkbox"]');
    const thePath = checkBoxerComponent.find("path");

    expect(screen.getByTestId("rightContainer")).toBeInTheDocument();
    checkboxItem.simulate("change", { target: { checked: true } });
    checkboxItem.simulate("click");
    console.log("ThePath", thePath.at(0).prop("fill"));
    // expect(thePath.at(0).prop('fill')).not.toBe('none')

    // console.log("Check", checkboxItem.getElements());
  });
});
