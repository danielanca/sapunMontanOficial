import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound/NotFound";
import * as ReactDOM from "react-dom";

test(' render learn react link'), ()=>{

  render(<NotFound />);
  const linkElement = screen.getByText(/Pagina nu există/i);

  expect(linkElement).toBeInTheDocument();
}

// describe("Input component test", () => {
//   let container: HTMLDivElement;

//   beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//     ReactDOM.render(<FinishOrder />, container);
//   });

//   afterEach(() => {
//     document.body.removeChild(container);
//     container.remove();
//   });

//   it("Render correctly initial document", () => {
//     const inputs = container.querySelectorAll("input");
//     expect(inputs.length).toHaveLength(8);
//   });
});
