import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import StackNavigation from "./src/navigation/StackNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        {/* <BottomTabNavigation /> */}
        <StackNavigation />
      </Provider>
    </NavigationContainer>
  );
}
