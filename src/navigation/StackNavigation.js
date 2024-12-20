import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddEditTaskScreen from "../screens/AddEditTaskScreen";

const stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "Tasks",
          headerStyle: {
            backgroundColor: "#A294F9",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <stack.Screen
        name="AddEditTask"
        component={AddEditTaskScreen}
        options={{
          headerShown: true,
          // title: "Add Task",
          headerStyle: {
            backgroundColor: "#A294F9",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
