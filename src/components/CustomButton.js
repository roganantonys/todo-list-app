import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const MyButton = ({ onPress, title }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed ? styles.buttonPressed : null,
      ]}
      //   android_ripple={{ color: "#F5EFFF", borderless: false }}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "40%",
    height: 40,
    backgroundColor: "#A294F9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensures ripple effect stays within the button bounds
  },
  buttonPressed: {
    opacity: 0.7, // Optional: add opacity change on press for visual feedback
  },
  buttonText: {
    textAlign: "center",
    color: "#E5D9F2",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default MyButton;
