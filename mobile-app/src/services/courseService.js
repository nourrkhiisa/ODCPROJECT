// courseService.js
import axios from "axios";

export const courseService = (authToken) => {
  const API_URL = "http://localhost:3001";
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const courseServiceObj = {
    async fetchCourses() {
      const response = await axiosInstance.get(`/admin/courses`);
      return response.data;
    },
    async enrollInCourse(courseId) {
      const response = await axiosInstance.post(
        `/students/courses/${courseId}/enroll`
      ); // Updated the enrollInCourse endpoint
      return response.data;
    },
    async fetchEnrolledCourses() {
      const response = await axiosInstance.get(
        `/students/enrolled-courses` // Updated the fetchEnrolledCourses endpoint
      );
      return response.data;
    },
  };

  return courseServiceObj;
};

export default courseService;
