import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateEvaluationQuiz from "./CreateEvaluationQuiz";

describe("CreateEvaluationQuiz", () => {
  const mockSubmit = jest.fn();
  const courseId = "1";

  afterEach(() => {
    mockSubmit.mockClear();
  });

  test("renders create evaluation quiz form", () => {
    render(<CreateEvaluationQuiz courseId={courseId} onSubmit={mockSubmit} />);
    expect(screen.getByText(/Create Evaluation Quiz/i)).toBeInTheDocument();
  });

  test("adds question and sets input values correctly", () => {
    render(<CreateEvaluationQuiz courseId={courseId} onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText(/Add Question/i));

    fireEvent.change(screen.getByPlaceholderText("Question 1"), {
      target: { value: "Sample question?" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 1"), {
      target: { value: "Option A" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 2"), {
      target: { value: "Option B" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 3"), {
      target: { value: "Option C" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 4"), {
      target: { value: "Option D" },
    });

    expect(screen.getByPlaceholderText("Question 1")).toHaveValue(
      "Sample question?"
    );
    expect(screen.getByPlaceholderText("Option 1")).toHaveValue("Option A");
    expect(screen.getByPlaceholderText("Option 2")).toHaveValue("Option B");
    expect(screen.getByPlaceholderText("Option 3")).toHaveValue("Option C");
    expect(screen.getByPlaceholderText("Option 4")).toHaveValue("Option D");
  });

  test("submits evaluation quiz with correct values", () => {
    render(<CreateEvaluationQuiz courseId={courseId} onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText(/Add Question/i));

    fireEvent.change(screen.getByPlaceholderText("Question 1"), {
      target: { value: "Sample question?" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 1"), {
      target: { value: "Option A" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 2"), {
      target: { value: "Option B" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 3"), {
      target: { value: "Option C" },
    });

    fireEvent.change(screen.getByPlaceholderText("Option 4"), {
      target: { value: "Option D" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(mockSubmit).toHaveBeenCalledWith([
      {
        text: "Sample question?",
        options: ["Option A", "Option B", "Option C", "Option D"],
      },
    ]);
  });
});
