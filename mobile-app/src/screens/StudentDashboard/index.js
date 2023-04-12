import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { CourseContext } from "../../contexts/CourseContext";
import EnrolledCourses from "../EnrolledCourses";
import styles from "./styles";

const StudentDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { courses, fetchCourses, enrollInCourse } = useContext(CourseContext);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (courses) {
      setFilteredCourses(
        courses.filter((course) => !course.students?.includes(currentUser.id))
      );
    }
  }, [courses, currentUser]);

  const renderItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <TouchableOpacity
        style={styles.enrollButton}
        onPress={() => enrollInCourse(item.id)}
      >
        <Text style={styles.enrollButtonText}>Enroll</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentUser && (
        <Text style={styles.welcome}>Welcome, {currentUser.displayName}</Text>
      )}
      <Text style={styles.title}>Available Courses</Text>
      <FlatList
        data={filteredCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <EnrolledCourses />
    </View>
  );
};

export default StudentDashboard;
