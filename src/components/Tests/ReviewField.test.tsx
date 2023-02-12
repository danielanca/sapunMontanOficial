/* eslint-env jest */

import React from "react";
import { render, screen } from "@testing-library/react";
import ReviewField from "../ReviewField";
import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";

describe("ReviewField", () => {
  it("renders the review cards when productData is not null and allReviews has at least one item", () => {
    const productData = {};
    const productIdentification = "123";
    const allReviews = [{ id: "1" }, { id: "2" }];

    render(
      <ReviewField productData={productData} productIdentification={productIdentification} allReviews={allReviews} />
    );

    expect(screen.getByTestId("review-card")).toBeInTheDocument();
  });

  it("renders the no reviews component when productData is null or allReviews has no items", () => {
    const productData = null;
    const productIdentification = "123";
    const allReviews = [];

    render(
      <ReviewField productData={productData} productIdentification={productIdentification} allReviews={allReviews} />
    );

    expect(screen.getByText("Nu exista recenzii")).toBeInTheDocument();
    expect(screen.getByTestId("add-review")).toBeInTheDocument();
  });
});
