import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { changeStatus } from "../store/slices/TaskSlices";

const getBackgroundColor = (status) => {
  // Light background for completed tasks and a slightly darker one for pending tasks
  return status ? "#A294F9" : "#E5D9F2"; // Use  for completed, #E5D9F2 for pending
};

const CustomCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (taskId) => {
    dispatch(changeStatus({ id: taskId }));
  };

  return (
    <View
      style={[
        styles.taskContainer,
        { backgroundColor: getBackgroundColor(item.status) },
      ]}
    >
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{item.taskTitle}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
      </View>
      <View style={styles.statusContainer}>
        {/* <Text style={styles.statusLabel}>Task Status:</Text> */}
        <Text
          style={[
            styles.statusText,
            { color: item.status ? "green" : "red", fontWeight: "bold" }, // Updated text color
          ]}
        >
          {item.status ? "Completed" : "Pending"}
        </Text>
        <Switch
          value={item.status}
          onValueChange={() => handleStatusChange(item.id)}
          trackColor={{ false: "#A294F9", true: "#F5EFFF" }} // Updated track color
          thumbColor={item.status ? "#F5EFFF" : "#E5D9F2"} // Updated thumb color
        />
      </View>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  taskContainer: {
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
  },
  taskDetails: {
    marginBottom: 10,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#4A4A4A",
  },
  taskDescription: {
    fontSize: 14,
    color: "black",
    marginVertical: 5,
  },
  dueDate: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusText: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "600",
  },
});
