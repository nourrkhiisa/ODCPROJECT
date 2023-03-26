import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { CourseProvider } from "./src/contexts/CourseContext";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <AuthProvider>
      <CourseProvider>
        <AppNavigator />
      </CourseProvider>
    </AuthProvider>
  );
};

export default App;
