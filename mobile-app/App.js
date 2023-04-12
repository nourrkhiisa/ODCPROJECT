import React from "react";
import { AuthProvider, AuthContext } from "./src/contexts/AuthContext";
import { CourseProvider } from "./src/contexts/CourseContext";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ authToken, ...authContext }) => (
          <CourseProvider authToken={authToken}>
            <AuthContext.Provider value={authContext}>
              <AppNavigator />
            </AuthContext.Provider>
          </CourseProvider>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;
