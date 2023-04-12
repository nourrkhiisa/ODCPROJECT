import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { CourseProvider } from "./CourseContext"; // Add this import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const fetchedUser = await authService.getCurrentUser();
        if (fetchedUser) {
          setUser(fetchedUser);
          setAuthToken(fetchedUser.token); // Set authToken when fetching user
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
          console.log("Unauthorized. Please log in.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
    setAuthToken(loggedInUser.token); // Set authToken when logging in
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setAuthToken(null); // Remove authToken when logging out
  };

  const signUp = async (email, password, firstName, lastName, role) => {
    return await authService.register({
      email,
      password,
      firstName,
      lastName,
      role,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        authToken,
        loading,
        login,
        logout,
        signUp,
        role: user?.role || "",
      }}
    >
      <CourseProvider authToken={authToken}>
        {!loading && children}
      </CourseProvider>{" "}
      {/* Move the CourseProvider here */}
    </AuthContext.Provider>
  );
};
