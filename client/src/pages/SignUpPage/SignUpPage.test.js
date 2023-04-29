import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUpPage from "./SignUpPage";
import { AuthContext } from "../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => {
  const actualModule = jest.requireActual("react-router-dom");
  return {
    ...actualModule,
    useNavigate: jest.fn(),
  };
});

describe("SignUpPage", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign-up form and handles sign-up correctly", async () => {
    const signUpMock = jest.fn(
      async (email, password, firstName, lastName, role) => {
        return Promise.resolve();
      }
    );

    render(
      <AuthContext.Provider
        value={{
          signUp: signUpMock,
        }}
      >
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Role:"), {
      target: { value: "student" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledWith(
        "john@example.com",
        "password",
        "John",
        "Doe",
        "student"
      );
    });

    // Check the history location directly
    expect(navigate).toHaveBeenCalledWith("/login");
  });
});
