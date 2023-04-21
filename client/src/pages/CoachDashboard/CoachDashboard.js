// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../contexts/UserContext";
// import { CourseContext } from "../../contexts/CourseContext";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// //import CreateEvaluationQuiz from "../../components/CreateEvaluationQuiz/CreateEvaluationQuiz";
// import { QuizContext } from "../../contexts/QuizContext";
// import CourseCreateEvaluationQuiz from "../../components/CourseCreateEvaluationQuiz/CourseCreateEvaluationQuiz";

// const CoachDashboard = () => {
//   console.log("Rendering CoachDashboard...");
//   //const { currentUser } = useContext(UserContext);
//   const { currentUser } = useContext(UserContext);

//   const { courses, assignedCourses, fetchAssignedCourses } =
//     useContext(CourseContext);
//   const { logout } = useContext(AuthContext);
//   const { createQuiz } = useContext(QuizContext);
//   // const [assignedCourses, setAssignedCourses] = useState([]);
//   const navigate = useNavigate();

//   const handleCreateQuiz = () => {
//     navigate("/create-quiz");
//   };

//   const handleCreateQuizSubmit = async (questions) => {
//     try {
//       await createQuiz(questions);
//       alert("Quiz created successfully!");
//       navigate("/"); // Navigate to a different page, e.g., the coach's dashboard
//     } catch (error) {
//       alert("Error creating quiz: " + error.message);
//     }
//   };

//   // useEffect(() => {
//   //   if (currentUser) {
//   //     const coachCourses = courses.filter(
//   //       (course) => course.coachId === currentUser.id
//   //     );
//   //    // setAssignedCourses(coachCourses);
//   //   }
//   // }, [currentUser, courses]);
//   useEffect(() => {
//     console.log("currentUser in CoachDashboard:", currentUser);
//     if (currentUser && currentUser.id) {
//       console.log("Fetching assigned courses for coach ID:", currentUser.id);
//       fetchAssignedCourses(currentUser.id);
//     }
//   }, [currentUser]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div className="coach-dashboard">
//       <h1>Coach Dashboard</h1>
//       {/* <CourseCreateEvaluationQuiz courseId={1} /> */}
//       <button onClick={handleLogout}>Logout</button>

//       <h2>Assigned Courses</h2>
//       <ul>
//         {assignedCourses.map((course) => (
//           <li key={course.id}>
//             {course.title} <CourseCreateEvaluationQuiz courseId={course.id} />
//           </li>
//         ))}
//       </ul>

//       {/* Add more coach-specific features as needed */}
//     </div>
//   );
// };

// export default CoachDashboard;


// import React, { useContext, useEffect } from "react";
// import { UserContext } from "../../contexts/UserContext";
// import { CourseContext } from "../../contexts/CourseContext";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { QuizContext } from "../../contexts/QuizContext";
// import CourseCreateEvaluationQuiz from "../../components/CourseCreateEvaluationQuiz/CourseCreateEvaluationQuiz";

// const CoachDashboard = () => {
//   console.log("Rendering CoachDashboard...");
//   const { currentUser, setCurrentUser } = useContext(AuthContext); // Destructure setCurrentUser from AuthContext

//   const { courses, assignedCourses, fetchAssignedCourses } =
//     useContext(CourseContext);
//   const { logout } = useContext(AuthContext);
//   const { createQuiz } = useContext(QuizContext);
//   const navigate = useNavigate();

//   const handleCreateQuiz = () => {
//     navigate("/create-quiz");
//   };

//   const handleCreateQuizSubmit = async (questions) => {
//     try {
//       await createQuiz(questions);
//       alert("Quiz created successfully!");
//       navigate("/"); // Navigate to a different page, e.g., the coach's dashboard
//     } catch (error) {
//       alert("Error creating quiz: " + error.message);
//     }
//   };

//   useEffect(() => {
//     console.log("currentUser in CoachDashboard:", currentUser);
//     if (currentUser && currentUser.id) {
//       console.log("Fetching assigned courses for coach ID:", currentUser.id);
//       fetchAssignedCourses(currentUser.id);
//     }
//   }, [currentUser]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//       setCurrentUser(null); // Call setCurrentUser from UserContext after logout
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <div className="coach-dashboard">
//       <h1>Coach Dashboard</h1>
//       <button onClick={handleLogout}>Logout</button>

//       <h2>Assigned Courses</h2>
//       <ul>
//         {assignedCourses.map((course) => (
//           <li key={course.id}>
//             {course.title} <CourseCreateEvaluationQuiz courseId={course.id} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CoachDashboard;

import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../contexts/QuizContext";
import CourseCreateEvaluationQuiz from "../../components/CourseCreateEvaluationQuiz/CourseCreateEvaluationQuiz";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { ListBox } from 'primereact/listbox';


const CoachDashboard = () => {
  console.log("Rendering CoachDashboard...");
  const { currentUser, setCurrentUser } = useContext(AuthContext); // Destructure setCurrentUser from AuthContext

  const { courses, assignedCourses, fetchAssignedCourses } =
    useContext(CourseContext);
  const { logout } = useContext(AuthContext);
  const { createQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate("/create-quiz");
  };

  const handleCreateQuizSubmit = async (questions) => {
    try {
      await createQuiz(questions);
      alert("Quiz created successfully!");
      navigate("/"); // Navigate to a different page, e.g., the coach's dashboard
    } catch (error) {
      alert("Error creating quiz: " + error.message);
    }
  };

  useEffect(() => {
    console.log("currentUser in CoachDashboard:", currentUser);
    if (currentUser && currentUser.id) {
      console.log("Fetching assigned courses for coach ID:", currentUser.id);
      fetchAssignedCourses(currentUser.id);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setCurrentUser(null); // Call setCurrentUser from UserContext after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const itemTemplate = (course) => {
    return (
      <Card title={course.title}>
        <CourseCreateEvaluationQuiz courseId={course.id} />
      </Card>
    )
  }

  return (
    <div className="coach-dashboard">
      <h1 style={{ color: "black" }}>Coach Dashboard</h1>
      <Button label="Logout" className="p-button-danger" onClick={handleLogout} />

      <Divider />

      <div className="section">
        <h2 style={{ color: "black" }}>Assigned Courses</h2>
        <ListBox options={assignedCourses} itemTemplate={itemTemplate} />
      </div>
    </div>
  );
};

export default CoachDashboard;