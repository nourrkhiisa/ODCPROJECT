import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddCategoryForm from "./AddCategoryForm";

describe("AddCategoryForm", () => {
  it("renders the add category form correctly", () => {
    const onSubmitMock = jest.fn();
    render(<AddCategoryForm onSubmit={onSubmitMock} />);

    expect(screen.getByLabelText("Category Name:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Category" })
    ).toBeInTheDocument();
  });

  it("handles adding a category correctly", () => {
    const onSubmitMock = jest.fn();
    render(<AddCategoryForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByLabelText("Category Name:"), {
      target: { value: "New Category" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add Category" }));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ name: "New Category" });
  });
});
