import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  courseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  courseTitle: {
    fontSize: 18,
  },
  enrollButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  enrollButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default styles;
