import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateRatingQuizForm from "./CreateRatingQuizForm";

describe("CreateRatingQuizForm", () => {
  const onSubmitMock = jest.fn();

  afterEach(() => {
    onSubmitMock.mockClear();
  });

  it("renders the create rating quiz form correctly", () => {
    render(<CreateRatingQuizForm onSubmit={onSubmitMock} />);
    expect(screen.getByText("Add Question")).toBeInTheDocument();
    expect(screen.getByText("Create Rating Quiz")).toBeInTheDocument();
  });

  it("adds and removes questions correctly", () => {
    render(<CreateRatingQuizForm onSubmit={onSubmitMock} />);
    fireEvent.click(screen.getByText("Add Question"));

    expect(screen.getByLabelText("Question 1:")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("Remove")[0]);

    expect(screen.queryByLabelText("Question 2:")).not.toBeInTheDocument();
  });

  it("submits rating quiz with correct questions", () => {
    render(<CreateRatingQuizForm onSubmit={onSubmitMock} />);
    fireEvent.change(screen.getByLabelText("Question 1:"), {
      target: { value: "Sample question?" },
    });

    fireEvent.click(screen.getByText("Add Question"));
    fireEvent.change(screen.getByLabelText("Question 2:"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Create Rating Quiz"));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(["Sample question?", ""]);
  });
});
