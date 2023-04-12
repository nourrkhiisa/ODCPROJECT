import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "./LoginPage";
import { AuthContext } from "../../contexts/AuthContext";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
describe("LoginPage", () => {
  it("renders the login form and handles login correctly", async () => {
    const loginMock = jest.fn().mockResolvedValue({
      role: "student",
    });
    const setCurrentUserMock = jest.fn();

    render(
      <AuthContext.Provider
        value={{
          login: loginMock,
          setCurrentUser: setCurrentUserMock,
          role: "",
        }}
      >
        <Router>
          <LoginPage />
        </Router>
      </AuthContext.Provider>
    );

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

    await waitFor(() => {
      expect(setCurrentUserMock).toHaveBeenCalledWith({
        role: "student",
      });
    });
  });
});
