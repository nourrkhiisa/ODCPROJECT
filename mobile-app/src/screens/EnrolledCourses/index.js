// import React, { useState, useEffect, useContext } from "react";
// import { View, Text, FlatList } from "react-native";
// import { AuthContext } from "../../contexts/AuthContext";
// import { CourseContext } from "../../contexts/CourseContext";
// import styles from "./styles";

// const EnrolledCourses = () => {
//   const { currentUser } = useContext(AuthContext);
//   const { courses, fetchCourses } = useContext(CourseContext);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);

//   useEffect(() => {
//     fetchCourses();
//   }, [fetchCourses]);

//   useEffect(() => {
//     if (courses) {
//       setEnrolledCourses(
//         courses
//           .filter((course) => course !== null && course !== undefined) // Add this line to filter out null or undefined courses
//           .filter((course) => course.students?.includes(currentUser.id))
//       );
//     }
//   }, [courses, currentUser]);

//   const renderItem = ({ item }) => (
//     <View style={styles.courseItem}>
//       <Text style={styles.courseTitle}>{item.title}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {currentUser && (
//         <Text style={styles.welcome}>Welcome, {currentUser.displayName}</Text>
//       )}
//       <Text style={styles.title}>Enrolled Courses</Text>
//       <FlatList
//         data={enrolledCourses}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// export default EnrolledCourses;
import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { CourseContext } from "../../contexts/CourseContext";
import styles from "./styles";

const EnrolledCourses = () => {
  const { currentUser } = useContext(AuthContext);
  const { enrolledCourses } = useContext(CourseContext);

  const renderItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentUser && (
        <Text style={styles.welcome}>Welcome, {currentUser.displayName}</Text>
      )}
      <Text style={styles.title}>Enrolled Courses</Text>
      <FlatList
        data={enrolledCourses.filter(
          (course) => course !== null && course !== undefined
        )} // Add filter here
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default EnrolledCourses;
