import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../contexts/QuizContext";
import CourseCreateEvaluationQuiz from "../../components/CourseCreateEvaluationQuiz/CourseCreateEvaluationQuiz";
import "./CoachDashboard.css";

const CoachDashboard = () => {
  console.log("Rendering CoachDashboard...");
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [attendance, setAttendance] = useState([]);
  const {
    courses,
    assignedCourses,
    fetchAssignedCourses,
    studentsForAssignedCourses,
    fetchCourseDetails,
    fetchStudentsForAssignedCourses,
  } = useContext(CourseContext);
  const { logout } = useContext(AuthContext);
  const { createQuiz } = useContext(QuizContext);
  const navigate = useNavigate();
  const [fetchedCourses, setFetchedCourses] = useState(new Set());
  const handleCreateQuiz = () => {
    navigate("/create-quiz");
  };

  const handleCreateQuizSubmit = async (questions) => {
    try {
      await createQuiz(questions);
      alert("Quiz created successfully!");
      navigate("/");
    } catch (error) {
      alert("Error creating quiz: " + error.message);
    }
  };

  useEffect(() => {
    console.log("currentUser in CoachDashboard:", currentUser);
    if (currentUser && currentUser.id) {
      console.log("Fetching assigned courses for coach ID:", currentUser.id);
      fetchAssignedCourses(currentUser.id);
      fetchStudentsForAssignedCourses(currentUser.id);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAttendance = (studentId, courseId, present, day) => {
    setAttendance((prevAttendance) => {
      // Check if attendance record already exists for the student in the current course on the specific day
      const existingRecordIndex = prevAttendance.findIndex(
        (record) =>
          record.studentId === studentId &&
          record.courseId === courseId &&
          record.day === day
      );

      if (existingRecordIndex > -1) {
        // Update the existing attendance record
        const updatedAttendance = [...prevAttendance];
        updatedAttendance[existingRecordIndex].present = present;
        return updatedAttendance;
      } else {
        // Add a new attendance record
        return [
          ...prevAttendance,
          {
            studentId,
            courseId,
            present,
            day,
          },
        ];
      }
    });
  };
  useEffect(() => {
    if (assignedCourses.length > 0) {
      assignedCourses.forEach((course) => {
        if (!fetchedCourses.has(course.id)) {
          fetchCourseDetails(course.id);
          setFetchedCourses((prevFetchedCourses) => {
            const newFetchedCourses = new Set(prevFetchedCourses);
            newFetchedCourses.add(course.id);
            return newFetchedCourses;
          });
        }
      });
    }
  }, [assignedCourses, fetchedCourses, fetchCourseDetails]);
  return (
    <div className="coach-dashboard">
      <h1>Coach Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Assigned Courses</h2>
      <ul>
        {assignedCourses.map((course) => (
          <li key={course.id}>
            {course.title} <CourseCreateEvaluationQuiz courseId={course.id} />
          </li>
        ))}
      </ul>

      <h2>Students in Assigned Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            {assignedCourses.map((course) => (
              <th key={course.id}>{course.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentsForAssignedCourses.map((student) => (
            <tr key={student.id}>
              <td>
                {student.firstName} {student.lastName}
              </td>
              {assignedCourses.map((course) => (
                <td key={course.id}>
                  <div className="attendance-days">
                    {Array.from({ length: course.daysInCourse }, (_, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          checked={attendance.some(
                            (record) =>
                              record.studentId === student.id &&
                              record.courseId === course.id &&
                              record.day === index + 1 &&
                              record.present
                          )}
                          onChange={(e) =>
                            handleAttendance(
                              student.id,
                              course.id,
                              e.target.checked,
                              index + 1
                            )
                          }
                        />
                        {`Day ${index + 1}`}
                      </label>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoachDashboard;
