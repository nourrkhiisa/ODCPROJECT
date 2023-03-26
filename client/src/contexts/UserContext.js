import React, { createContext, useState, useEffect } from "react";
import userService from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [coaches, setCoaches] = useState([]);
  //  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("Fetching current user...");
    fetchStudents();
    fetchCoaches();
  }, []);

  const fetchStudents = async () => {
    const fetchedStudents = await userService.getAllUsers("student");
    console.log("Fetched students:", fetchedStudents);
    setStudents(fetchedStudents);
  };

  const fetchCoaches = async () => {
    const fetchedCoaches = await userService.getAllUsers("coach");
    console.log("Fetched coaches:", fetchedCoaches);
    setCoaches(fetchedCoaches);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        students,
        coaches,
        fetchStudents,
        fetchCoaches,
        // currentUser,
        // setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
