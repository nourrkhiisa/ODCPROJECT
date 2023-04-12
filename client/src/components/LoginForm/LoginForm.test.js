import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders the login form with email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("calls the login function when the form is submitted", async () => {
    const loginMock = jest.fn();
    render(<LoginForm login={loginMock} />);

    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "stud@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "student" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("stud@gmail.com", "student");
    });
  });
});
