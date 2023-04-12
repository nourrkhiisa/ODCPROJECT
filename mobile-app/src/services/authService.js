import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3001";
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authService = {
  async login(email, password) {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    if (response.data.token) {
      await AsyncStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  },

  async logout() {
    const response = await axiosInstance.post(`/auth/logout`);
    return response.data;
  },

  async getCurrentUser() {
    try {
      const response = await axiosInstance.get(`/auth/me`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async register(userData) {
    const response = await axiosInstance.post(`/auth/register`, userData);
    return response.data;
  },
};

export default authService;
