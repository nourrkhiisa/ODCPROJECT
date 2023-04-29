import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { CourseContext } from "../../contexts/CourseContext";
import EnrolledCourses from "./EnrolledCourses";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

describe("EnrolledCourses", () => {
  const studentId = 1;
  const enrolledCoursesWithQuizzes = [
    {
      course: { id: 1, title: "Course 1" },
      quiz: { id: 1, questions: [] },
    },
    {
      course: { id: 2, title: "Course 2" },
      quiz: { id: 2, questions: [] },
    },
  ];

  const fetchEnrolledCourses = jest.fn();

  const mockContext = {
    enrolledCoursesWithQuizzes,
    fetchEnrolledCourses,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders and fetches enrolled courses", async () => {
    render(
      <CourseContext.Provider value={mockContext}>
        <EnrolledCourses studentId={studentId} />
      </CourseContext.Provider>
    );

    expect(fetchEnrolledCourses).toHaveBeenCalledTimes(1);
    expect(fetchEnrolledCourses).toHaveBeenCalledWith(studentId);
    expect(screen.getByText("Select a course")).toBeInTheDocument();
  });

  it("displays enrolled courses", async () => {
    render(
      <CourseContext.Provider value={mockContext}>
        <EnrolledCourses studentId={studentId} />
      </CourseContext.Provider>
    );

    const select = screen.getByTestId("enrolled-courses-select");

    fireEvent.change(select, { target: { value: "1" } });

    await act(async () => {
      expect(screen.getByText("Course 1")).toBeInTheDocument();
      expect(screen.getByText("Course 2")).toBeInTheDocument();
    });
  });
});
