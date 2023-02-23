import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import FooterMontan from "../FooterMontan";
import { afterEach, describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../services/emails";

jest.mock("../../services/emails");

afterEach(cleanup);

describe("FooterMontan", () => {
  it("Renders the scenario where commercial data cannot be fetched from server", async () => {
    // const fetchStringListMock = jest.spyOn(FooterMontan.prototype, "getStringsList");
    // fetchStringListMock.mockImplementation(() => Promise.reject(new Error()));
    api.getStringsList.mockImplementation(() => Promise.reject(new Error()));

    await act(async () => {
      render(
        <BrowserRouter>
          <FooterMontan />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("footer-container")).toBeInTheDocument();
    expect(screen.getByText("EROARE DE AFISARE Date Comerciale. Contactati administratorul")).toBeInTheDocument();
  });
});

describe("FooterMontan", () => {
  it("renders the scenario where commercial data are fetched from Server and displayed", async () => {
    api.getStringsList.mockImplementation(() =>
      Promise.resolve({
        resultSent: {
          legalData: {
            address: "str. Fragariste nr.28 loc. Turda, Cluj",
            fiscalNumber: "J12/2529/10.05.2022",
            idNumber: "RO46091570",
            name: "ELYS MOMOANE S.R.L"
          }
        }
      })
    );

    await act(async () => {
      render(
        <BrowserRouter>
          <FooterMontan />
        </BrowserRouter>
      );
    });
    expect(screen.getByText("ELYS MOMOANE S.R.L")).toBeInTheDocument();
  });
});
