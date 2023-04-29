import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddCourseForm from "./AddCourseForm";
const coaches = [
  { id: 1, name: "Coach 1" },
  { id: 2, name: "Coach 2" },
];

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
];

describe("AddCourseForm", () => {
  it("renders the add course form correctly", () => {
    const onSubmitMock = jest.fn();
    render(
      <AddCourseForm
        onSubmit={onSubmitMock}
        coaches={coaches}
        categories={categories}
      />
    );

    // You can add more input fields and labels to test if they render correctly
    expect(screen.getByLabelText("Title:")).toBeInTheDocument();
    expect(screen.getByLabelText("Description:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Course" })
    ).toBeInTheDocument();
  });

  it("handles adding a course correctly", () => {
    const onSubmitMock = jest.fn();
    render(
      <AddCourseForm
        onSubmit={onSubmitMock}
        coaches={coaches}
        categories={categories}
      />
    );

    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "New Course" },
    });
    fireEvent.change(screen.getByLabelText("Description:"), {
      target: { value: "Course description" },
    });
    // Add interactions for all fields
    fireEvent.change(screen.getByLabelText("Start Date:"), {
      target: { value: "2023-04-20" },
    });
    fireEvent.change(screen.getByLabelText("End Date:"), {
      target: { value: "2023-05-20" },
    });
    fireEvent.change(screen.getByLabelText("Max Students:"), {
      target: { value: "30" },
    });
    fireEvent.click(screen.getByLabelText("Is Online:")); // Change this line
    fireEvent.change(screen.getByLabelText("Location:"), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByLabelText("Link:"), {
      target: { value: "http://example.com" },
    });
    fireEvent.change(screen.getByLabelText("Category:"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Coach:"), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add Course" }));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({
      title: "New Course",
      description: "Course description",
      startDate: "2023-04-20",
      endDate: "2023-05-20",
      maxStudents: "30",
      isOnline: true,
      location: "New York (, )",
      link: "http://example.com",
      CategoryId: "1",
      coachId: "2",
    });
  });
});
