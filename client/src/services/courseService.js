import api from "./api/api";

const courseService = {
  getAllCourses: async () => {
    try {
      const response = await api.get("/admin/courses");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllCourseRatings: async () => {
    try {
      const response = await api.get("/admin/course-ratings");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  submitQuizRating: async (courseId, rating) => {
    try {
      const response = await api.post(
        `/students/course/${courseId}/quiz-rating`,
        {
          rating,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getQuizByCourseId: async (courseId) => {
    try {
      const response = await api.get(`/students/courses/${courseId}/quiz`);
      console.log(`Quiz for course ${courseId}:`, response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getEnrolledCourses: async (studentId) => {
    try {
      console.log(
        "Inside courseService.getEnrolledCourses, studentId:",
        studentId
      );
      const response = await api.get(`/students/enrolled-courses`);
      console.log("Response from getEnrolledCourses API call:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  enrollInCourse: async (studentId, courseId) => {
    try {
      // Make sure you're sending the correct data format and required properties
      const response = await api.post(`/students/courses/${courseId}/enroll`, {
        studentId,
      });
      return response.data;
    } catch (error) {
      console.error("Error enrolling in the course", error);
      throw error;
    }
  },
  unenrollFromCourse: async (courseId) => {
    try {
      const response = await api.post(`/courses/${courseId}/unenroll`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createCategory: async (category) => {
    try {
      const response = await api.post("/admin/categories", category);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCourse: async (course) => {
    try {
      const response = await api.post("/admin/courses", course);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAssignedCourses: async (coachId) => {
    try {
      const response = await api.get(`/coaches/trainings/${coachId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllCategories: async () => {
    try {
      const response = await api.get("/admin/categories");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default courseService;
