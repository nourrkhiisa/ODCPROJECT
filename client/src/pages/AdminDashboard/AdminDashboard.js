import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

/*import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useQuizContext } from "../../contexts/QuizContext";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import AddCourseForm from "../../components/AddCourseForm/AddCourseForm";
import CourseList from "../../components/CourseList/CourseList";
import "./AdminDashboard.css";
import CreateRatingQuizForm from "../../components/CreateRatingQuizForm/CreateRatingQuizForm";
*/
import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useQuizContext } from "../../contexts/QuizContext";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import AddCourseForm from "../../components/AddCourseForm/AddCourseForm";
import CourseList from "../../components/CourseList/CourseList";
import "./AdminDashboard.css";
import CreateRatingQuizForm from "../../components/CreateRatingQuizForm/CreateRatingQuizForm";

import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";

import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox";

const AdminDashboard = () => {
  const { createRatingQuiz } = useQuizContext();
  const { users, students, coaches } = useContext(UserContext);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [questions, setQuestions] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDuration, setCourseDuration] = useState(0);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseStartDate, setCourseStartDate] = useState(null);
  const [courseEndDate, setCourseEndDate] = useState(null);
  const [maxStudents, setMaxStudents] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [courseLocation, setCourseLocation] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coachId, setCoachId] = useState("");
  const [name, setName] = useState("");

  const { courses, createCourse, createCategory, categories, courseRatings } =
    useContext(CourseContext);

  const toast = useRef(null);
  const showSuccessToast = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showErrorToast = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const handleAddCourse = async (course) => {
  //   try {
  //     await createCourse(course);
  //     alert("Course added successfully!");
  //   } catch (err) {
  //     alert("Error adding course: " + err.message);
  //   }
  // };
  const handleAddCourse = async () => {
    try {
      await createCourse({
        title: courseTitle,
        duration: courseDuration,
        description: courseDescription,
        startDate: courseStartDate,
        endDate: courseEndDate,
        maxStudents: maxStudents,
        isOnline: isOnline,
        location: courseLocation,
        link: courseLink,
        categoryId: categoryId,
        coachId: coachId,
      });
      showSuccessToast("Course added successfully!");
      setCourseTitle("");
      setCourseDuration(0);
      setCourseDescription("");
      setCourseStartDate(null);
      setCourseEndDate(null);
      setMaxStudents(0);
      setIsOnline(false);
      setCourseLocation("");
      setCourseLink("");
      setCategoryId("");
      setCoachId("");
    } catch (err) {
      showErrorToast("Error adding course: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    console.log("Course Ratings:", courseRatings);
  }, [courseRatings]);

  const handleCreateRatingQuiz = async (questions) => {
    try {
      if (!selectedCourseId) {
        alert("Please select a course.");
        return;
      }
      await createRatingQuiz(selectedCourseId, questions);
      alert("Rating quiz created successfully!");
    } catch (err) {
      alert("Error creating rating quiz: " + err.message);
    }
  };
  const handleAddCategory = async (category) => {
    try {
      await createCategory(category); // You'll need to add createCategory to your CourseContext
      showSuccessToast("Category added successfully!");
    } catch (err) {
      showErrorToast("Error adding category: " + err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <Button
        label="Logout"
        onClick={handleLogout}
        className="p-button-raised p-button-danger"
      />
      <TabView className="p-mt-3">
        <TabPanel header="Create Course">
          <div className="p-grid p-justify-center">
            <div className="p-col-12 p-md-8 p-lg-6">
              <Card title="Create Course" className="p-shadow-3 p-mt-4 p-mb-4">
                <div className="p-fluid">
                  <div className="p-field">
                    <label htmlFor="courseTitle" className="p-d-block">
                      Course Title
                    </label>
                    <InputText
                      id="courseTitle"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="courseDuration" className="p-d-block">
                      Course Duration (hours)
                    </label>
                    <InputNumber
                      id="courseDuration"
                      value={courseDuration}
                      onValueChange={(e) => setCourseDuration(e.target.value)}
                      integeronly
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="courseDescription" className="p-d-block">
                      Course Description
                    </label>
                    <InputTextarea
                      id="courseDescription"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="courseStartDate" className="p-d-block">
                      Start Date
                    </label>
                    <Calendar
                      id="courseStartDate"
                      value={courseStartDate}
                      onChange={(e) => setCourseStartDate(e.value)}
                      dateFormat="yy-mm-dd"
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="courseEndDate" className="p-d-block">
                      End Date
                    </label>
                    <Calendar
                      id="courseEndDate"
                      value={courseEndDate}
                      onChange={(e) => setCourseEndDate(e.value)}
                      dateFormat="yy-mm-dd"
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="maxStudents" className="p-d-block">
                      Max Students
                    </label>
                    <InputNumber
                      id="maxStudents"
                      value={maxStudents}
                      onValueChange={(e) => setMaxStudents(e.target.value)}
                      integeronly
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field-checkbox">
                    <Checkbox
                      inputId="isOnline"
                      checked={isOnline}
                      onChange={(e) => setIsOnline(e.checked)}
                    />
                    <label htmlFor="isOnline">Is Online</label>
                  </div>
                  <div className="p-field">
                    <label htmlFor="courseLocation" className="p-d-block">
                      Course Location
                    </label>
                    <InputText
                      id="courseLocation"
                      value={courseLocation}
                      onChange={(e) => setCourseLocation(e.target.value)}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="courseLink" className="p-d-block">
                      Course Link
                    </label>
                    <InputText
                      id="courseLink"
                      value={courseLink}
                      onChange={(e) => setCourseLink(e.target.value)}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="categoryId" className="p-d-block">
                      Category ID
                    </label>
                    <InputText
                      id="categoryId"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="p-inputtext-sm "
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="coachId" className="p-d-block">
                      Coach ID
                    </label>
                    <InputText
                      id="coachId"
                      value={coachId}
                      onChange={(e) => setCoachId(e.target.value)}
                      className="p-inputtext-sm"
                    />
                  </div>
                  <Button
                    label="Create Course"
                    className="p-button-raised p-button-primary p-button-sm"
                    onClick={handleAddCourse}
                  />
                </div>
                <Divider />
                <p className="p-text-center p-mt-4">
                  Fill in the form above to create a new course.
                </p>
              </Card>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Create Category">
        <div className="p-grid p-justify-center">
            <div className="p-col-12 p-md-8 p-lg-6">
              <div className="p-text-center p-mt-4">
                <h2>Create Category</h2>
              </div>
              <Card
                className="p-shadow-3 p-mt-4 p-mb-4 p-p-4 p-fluid"
                style={{ borderRadius: "1rem" }}
              >
                <AddCategoryForm onSubmit={handleAddCategory} />
              </Card>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Students">
          <div className="p-grid p-justify-center">
            {students &&
              students.length > 0 &&
              students.map((student) => (
                <div key={student.id} className="p-col-12 p-md-4 p-mb-3">
                  <Card
                    title={student.email}
                    subTitle={`ID: ${student.id}`}
                    style={{ width: "100%" }}
                  >
                    <Link
                      to={`/students/${student.id}`}
                      className="p-button p-button-raised p-button-primary"
                    >
                      View Student
                    </Link>
                  </Card>
                </div>
              ))}
          </div>
        </TabPanel>
        <TabPanel header="Categories">
          <div className="p-grid p-justify-center">
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <div key={category.id} className="p-col-12 p-md-4 p-mb-3">
                  <Card
                    title={category.name}
                    subTitle={`ID: ${category.id}`}
                    style={{ width: "100%" }}
                  >
                    <Link
                      to={`/categories/${category.id}`}
                      className="p-button p-button-raised p-button-primary"
                    >
                      View Category
                    </Link>
                  </Card>
                </div>
              ))}
          </div>
        </TabPanel>

        <TabPanel header="Coaches">
          <div className="p-grid p-justify-center">
            {coaches &&
              coaches.length > 0 &&
              coaches.map((coach) => (
                <div key={coach.id} className="p-col-12 p-md-4 p-mb-3">
                  <Card
                    title={coach.email}
                    subTitle={`ID: ${coach.id}`}
                    style={{ width: "100%" }}
                  >
                    <Link
                      to={`/coaches/${coach.id}`}
                      className="p-button p-button-raised p-button-primary"
                    >
                      View Coach
                    </Link>
                  </Card>
                </div>
              ))}
          </div>
        </TabPanel>
        <TabPanel header="Courses">
          <div className="p-grid p-justify-center">
            {courses &&
              courses.length > 0 &&
              courses.map((course) => (
                <div key={course.id} className="p-col-12 p-md-4 p-mb-3">
                  <Card
                    title={course.title}
                    subTitle={`ID: ${course.id}`}
                    style={{ width: "100%" }}
                  >
                    <Link
                      to={`/courses/${course.id}`}
                      className="p-button p-button-raised p-button-primary"
                    >
                      View Course
                    </Link>
                  </Card>
                </div>
              ))}
          </div>
        </TabPanel>
        <TabPanel header="Create Rating Quiz">
          <div className="p-grid p-fluid">
            <div className="p-col-12">
              <h3>Select a course</h3>
              <Dropdown
                value={selectedCourseId}
                options={courses.map((course) => ({
                  label: course.title,
                  value: course.id,
                }))}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                placeholder="Select a course"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-col-12">
              <h3>Questions</h3>
              <InputTextarea
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                rows={10}
                cols={30}
                placeholder="Enter questions separated by new lines"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-col-12">
              <Button
                label="Create Rating Quiz"
                className="p-button-raised p-button-primary"
                onClick={handleCreateRatingQuiz}
              />
            </div>
          </div>
        </TabPanel>
      </TabView>

      {/* <button onClick={handleLogout}>Logout</button> */}
      {/* <div className="section">
        <h2>Create Course</h2>
        <AddCourseForm onSubmit={handleAddCourse} />
      </div>

      <div className="section">
        <h2>Create Category</h2>
        <AddCategoryForm onSubmit={handleAddCategory} />
      </div>

      <div className="section">
        <h2>Students</h2>
        <ul>
          {students &&
            students.length > 0 &&
            students.map((student) => (
              <li key={student.id}>
                {student.id} - {student.email}
              </li>
            ))}
        </ul>
      </div> */}
      {/* <div className="section">
        <h2>Categories</h2>
        <ul>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <li key={category.id}>
                {category.id}-{category.name}
              </li>
            ))}
        </ul>
      </div> */}
      {/* <div className="section">
        <h2>Coaches</h2>
        <ul>
          {coaches &&
            coaches.length > 0 &&
            coaches.map((coach) => (
              <li key={coach.id}>
                {coach.id} - {coach.email}
              </li>
            ))}
        </ul>
      </div> */}

      {/* <div className="section">
        <h2>Courses</h2>
        <ul>
          {courses &&
            courses.length > 0 &&
            courses.map((course) => (
              <li key={course.id}>
                <Link to={`/courses/${course.id}`}>
                  {course.id} - {course.title}
                </Link>
              </li>
            ))}
        </ul>
      </div> */}
      {/* <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
      >
        <option value="">Select a course</option>
        {courses &&
          courses.length > 0 &&
          courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
      </select> */}
      {/* <h2>Create Rating Quiz</h2>
      <CreateRatingQuizForm onSubmit={handleCreateRatingQuiz} /> */}
      {/* Add more administrative features as needed */}
      {/* <div className="section">
        <h2>Course Ratings</h2>
        <ul>
          {courseRatings.map((rating) => (
            <li key={rating.id}>
              Student ID: {rating.studentId} - Course ID: {rating.CourseId} -
              Rating: {rating.score}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
