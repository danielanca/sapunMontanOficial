import React from "react";
import FinishOrder from "./FinishOrder";
import * as ReactDOM from "react-dom";
describe("Input component test", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<FinishOrder />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Render correctly initial document", () => {
    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toHaveLength(8);
  });
});
