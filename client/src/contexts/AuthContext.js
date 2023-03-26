import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const setCurrentUser = (newUser) => {
    setUser(newUser);
    setUserRole(newUser?.role || "");
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const fetchedUser = await authService.getCurrentUser();
        if (fetchedUser) {
          // Check if the user object is defined
          console.log("Fetched user:", fetchedUser);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    console.log("Logged in user:", loggedInUser);
    setUser(loggedInUser);
    return loggedInUser; // Add this line to return the loggedInUser
  };
  const setLoadingState = (newState) => {
    setLoading(newState);
  };
  const logout = async () => {
    await authService.logout();
    setUser(null);
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
        setCurrentUser, // Add the setCurrentUser function here
        loading,
        setLoading: setLoadingState, // Add the setLoading function here
        login,
        logout,
        signUp,
        //  role: user?.role || "",
        role: userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
