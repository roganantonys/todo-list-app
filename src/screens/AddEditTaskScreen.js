import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import TaskSlices, { addTask, editTask } from "../store/slices/TaskSlices";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddEditTaskScreen = ({ navigation, route }) => {
  const dispatch = useDispatch(TaskSlices);
  // Safely access route.params and fallback to default values
  const { task } = route?.params || {};
  const [taskTitle, setTaskTitle] = useState(task?.taskTitle || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate) : new Date()
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errors, setErrors] = useState({
    taskTitle: "",
    description: "",
    dueDate: "",
  });

  const validateFields = () => {
    let isValid = true;
    let errorMessages = {
      taskTitle: "",
      description: "",
      dueDate: "",
    };

    // Validate taskTitle
    if (!taskTitle) {
      errorMessages.taskTitle = "Task Title is required";
      isValid = false;
    }

    // Validate description
    if (!description) {
      errorMessages.description = "Description is required";
      isValid = false;
    }

    // Validate dueDate
    if (!dueDate) {
      errorMessages.dueDate = "Due Date is required";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      if (task) {
        handleUpdate(); // Update the task if it's an existing one
      } else {
        handleSave(); // Save a new task
      }
    }
  };

  const handleSave = () => {
    const data = {
      id: uuid.v4(),
      taskTitle: taskTitle,
      description: description,
      dueDate: dueDate.toISOString().split("T")[0],
      status: false,
    };
    console.log("Task saved:", data);
    dispatch(addTask(data));
    navigation.goBack();
  };

  const handleUpdate = () => {
    const data = {
      id: task.id, // Use task instead of item
      taskTitle: taskTitle,
      description: description,
      dueDate: dueDate.toISOString().split("T")[0],
      status: task.status, // Use task's status
    };
    console.log("Task updated:", data);
    dispatch(editTask(data));
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setDueDate(currentDate);
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    navigation.setOptions({ title: task ? "Edit Task" : "Add Task" });
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View
          style={{
            width: "90%",
            height: "110%",
            borderWidth: 0.5,
            borderRadius: 20,
            borderColor: "white",
            backgroundColor: "#E5D9F2",
            alignItems: "center",
          }}
        >
          <View style={{ width: "80%" }}>
            <TextInput
              label="Task Title"
              value={taskTitle}
              mode="outlined"
              onChangeText={(text) => setTaskTitle(text)}
              style={{ marginTop: 30 }}
            />
            {errors.taskTitle ? (
              <Text style={styles.errorText}>{errors.taskTitle}</Text>
            ) : null}
            <View style={{ marginBottom: 20 }} />
            <TextInput
              label="Task Description"
              value={description}
              mode="outlined"
              onChangeText={(text) => setDescription(text)}
              numberOfLines={10}
              style={{ height: 100 }}
            />
            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}
            <View style={{ marginBottom: 20 }} />
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <TextInput
                label="Due Date"
                value={dueDate ? dueDate.toLocaleDateString() : ""}
                mode="outlined"
                numberOfLines={10}
                style={{ marginVertical: 10 }}
                editable={false}
              />
            </TouchableOpacity>
            {errors.dueDate ? (
              <Text style={styles.errorText}>{errors.dueDate}</Text>
            ) : null}
            <View style={{ marginBottom: 20 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <CustomButton
                title={task ? "Update" : "Save"}
                onPress={handleSubmit}
              />
              <CustomButton title="Cancel" onPress={handleCancel} />
            </View>
          </View>
        </View>

        {isDatePickerVisible && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFFF",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A294F9",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#CDC1FF",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: "#E5D9F2",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  dateText: {
    color: "#A294F9",
    fontSize: 16,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginVertical: 5,
  },
});

export default AddEditTaskScreen;
