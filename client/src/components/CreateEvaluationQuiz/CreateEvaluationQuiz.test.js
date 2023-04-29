import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateEvaluationQuiz from "./CreateEvaluationQuiz";
import "@testing-library/jest-dom/extend-expect";

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

    fireEvent.change(screen.getAllByPlaceholderText("Option 1")[0], {
      target: { value: "Option A" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Option 2")[0], {
      target: { value: "Option B" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Option 3")[0], {
      target: { value: "Option C" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Option 4")[0], {
      target: { value: "Option D" },
    });

    expect(screen.getByPlaceholderText("Question 1")).toHaveValue(
      "Sample question?"
    );
    expect(screen.getAllByPlaceholderText("Option 1")[0]).toHaveValue(
      "Option A"
    );
    expect(screen.getAllByPlaceholderText("Option 2")[0]).toHaveValue(
      "Option B"
    );
    expect(screen.getAllByPlaceholderText("Option 3")[0]).toHaveValue(
      "Option C"
    );
    expect(screen.getAllByPlaceholderText("Option 4")[0]).toHaveValue(
      "Option D"
    );
  });

  test("submits evaluation quiz with correct values", () => {
    render(<CreateEvaluationQuiz courseId={courseId} onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText(/Add Question/i));

    fireEvent.change(screen.getByPlaceholderText("Question 1"), {
      target: { value: "Sample question?" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Option 1")[0], {
      target: { value: "Option A" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Option 2")[0], {
      target: { value: "Option B" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Option 3")[0], {
      target: { value: "Option C" },
    });

    fireEvent.change(screen.getAllByPlaceholderText("Option 4")[0], {
      target: { value: "Option D" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          text: "Sample question?",
          options: ["Option A", "Option B", "Option C", "Option D"],
        }),
      ])
    );
  });
});
