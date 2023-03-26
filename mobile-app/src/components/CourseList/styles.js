import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  courseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  courseTitle: {
    fontSize: 16,
  },
  enrollButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  enrollButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
