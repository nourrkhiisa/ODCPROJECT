import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddStudentForm from "./AddStudentForm";

describe("AddStudentForm", () => {
  it("renders the add student form correctly", () => {
    const onSubmitMock = jest.fn();
    render(<AddStudentForm onSubmit={onSubmitMock} />);

    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Student" })
    ).toBeInTheDocument();
  });

  it("handles adding a student correctly", () => {
    const onSubmitMock = jest.fn();
    render(<AddStudentForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "student@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "Doe" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add Student" }));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({
      email: "student@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    });
  });
});
