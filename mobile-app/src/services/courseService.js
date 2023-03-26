import axios from "axios";

const API_URL = "http://localhost:3001";

const courseService = {
  async fetchCourses() {
    const response = await axios.get(`${API_URL}/admin/courses`);
    return response.data;
  },

  async enrollInCourse(courseId) {
    const response = await axios.post(`${API_URL}/courses/enroll`, {
      courseId,
    });
    return response.data;
  },
};

export default courseService;
