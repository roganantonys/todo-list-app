import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AddToDoScreen from "../screens/AddEditTaskScreen";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#A294F9",
          //   borderTopLeftRadius: 20,
          //   borderTopRightRadius: 20,
          height: 60,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          overflow: "hidden",
        },

        // tabBarActiveTintColor: "#F5EFFF",
        // tabBarInactiveTintColor: "#CDC1FF",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? 26 : 24}
              color={focused ? "#F5EFFF" : "#CDC1FF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#F5EFFF" : "#CDC1FF",
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="AddTodo"
        component={AddToDoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "view-dashboard" : "view-dashboard-outline"}
              size={focused ? 26 : 24}
              color={focused ? "#F5EFFF" : "#CDC1FF"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 16 : 14,
                fontWeight: focused ? "bold" : "normal",
                color: focused ? "#F5EFFF" : "#CDC1FF",
              }}
            >
              Add
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
