import api from "./api/api";

const authService = {
  register: async (user) => {
    try {
      const response = await api.post("/auth/register", {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePassword: async (password) => {
    try {
      const response = await api.put("/me/password", { password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfilePicture: async (picture) => {
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      const response = await api.put("/me/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
