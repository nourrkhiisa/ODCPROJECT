import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const fetchedUser = await authService.getCurrentUser();
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
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
        loading,
        login,
        logout,
        signUp,
        role: user?.role || "",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
