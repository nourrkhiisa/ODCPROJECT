import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CourseRatingQuiz from "./CourseRatingQuiz";
import "@testing-library/jest-dom";

describe("CourseRatingQuiz", () => {
  const mockSubmit = jest.fn();

  const enrolledCourses = [
    { id: "1", title: "Course 1" },
    { id: "2", title: "Course 2" },
  ];

  const assignedCoaches = [
    { id: "1", name: "Coach 1" },
    { id: "2", name: "Coach 2" },
  ];

  const questions = ["Question 1", "Question 2", "Question 3"];

  afterEach(() => {
    mockSubmit.mockClear();
  });

  test("renders course selection, coach selection, and questions", () => {
    render(
      <CourseRatingQuiz
        enrolledCourses={enrolledCourses}
        assignedCoaches={assignedCoaches}
        questions={questions}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByText(/Course:/i)).toBeInTheDocument();
    expect(screen.getByText(/Coach:/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 1:/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 2:/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 3:/i)).toBeInTheDocument();
  });

  test("submits rating quiz with correct values", () => {
    render(
      <CourseRatingQuiz
        enrolledCourses={enrolledCourses}
        assignedCoaches={assignedCoaches}
        questions={questions}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Course:/i), {
      target: { value: enrolledCourses[0].id },
    });

    fireEvent.change(screen.getByLabelText(/Coach:/i), {
      target: { value: assignedCoaches[0].id },
    });

    questions.forEach((_, index) => {
      fireEvent.change(
        screen.getByLabelText(new RegExp(`Question ${index + 1}:`, "i")),
        {
          target: { value: `Answer ${index + 1}` },
        }
      );
    });

    fireEvent.click(screen.getByText(/Submit Rating Quiz/i));

    expect(mockSubmit).toHaveBeenCalledWith(
      enrolledCourses[0].id,
      assignedCoaches[0].id,
      ["Answer 1", "Answer 2", "Answer 3"]
    );
  });
});
