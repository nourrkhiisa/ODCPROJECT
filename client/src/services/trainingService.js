import api from "./api";

const trainingService = {
  getAllTrainings: async () => {
    try {
      const response = await api.get("/trainings");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTrainingById: async (id) => {
    try {
      const response = await api.get(`/trainings/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTraining: async (trainingData) => {
    try {
      const response = await api.post("/trainings", trainingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTraining: async (id, trainingData) => {
    try {
      const response = await api.put(`/trainings/${id}`, trainingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTraining: async (id) => {
    try {
      const response = await api.delete(`/trainings/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default trainingService;
