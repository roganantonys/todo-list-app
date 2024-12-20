import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { changeStatus, deleteTask } from "../store/slices/TaskSlices";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomCard from "../components/CustomCard";

const HomeScreen = () => {
  const tasks = useSelector((state) => state.Task.tasks);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.status;
    if (filter === "Pending") return !task.status;
  });

  const handleDelete = (taskId) => {
    dispatch(deleteTask({ id: taskId }));
  };

  const handleEdit = (task) => {
    navigation.navigate("AddEditTask", { task });
  };

  const renderHiddenItem = (data) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={[styles.hiddenButton, styles.editButton]}
        onPress={() => handleEdit(data.item)}
      >
        <MaterialIcons name="mode-edit" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.hiddenButton, styles.deleteButton]}
        onPress={() => handleDelete(data.item.id)}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "All" && styles.activeFilter]}
          onPress={() => setFilter("All")}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Completed" && styles.activeFilter,
          ]}
          onPress={() => setFilter("Completed")}
        >
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Pending" && styles.activeFilter,
          ]}
          onPress={() => setFilter("Pending")}
        >
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <SwipeListView
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CustomCard item={item} />}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-170} // Space for two buttons
          disableRightSwipe={true}
        />
      ) : (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks found</Text>
        </View>
      )}

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddEditTask")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFFF",
    padding: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E5D9F2",
    borderRadius: 25,
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: "#A294F9",
  },
  filterText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
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
    color: "#7A7A7A",
    marginVertical: 5,
  },
  dueDate: {
    fontSize: 14,
    color: "#7A7A7A",
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
  hiddenContainer: {
    height: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  hiddenButton: {
    width: 75,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 8,
  },
  hiddenButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTasksText: {
    fontSize: 18,
    color: "#7A7A7A",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#A294F9",
  },
});

export default HomeScreen;
