import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const CourseList = ({ courses, enrollInCourse }) => {
  return (
    <View style={styles.container}>
      {courses.map((course) => (
        <View key={course.id} style={styles.courseItem}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <TouchableOpacity
            style={styles.enrollButton}
            onPress={() => enrollInCourse(course.id)}
          >
            <Text style={styles.enrollButtonText}>Enroll</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default CourseList;
