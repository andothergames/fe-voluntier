import { StyleSheet } from "react-native";

export const filterBarStyles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: "#f8f9fa",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#333",
    },
    dropdown: {
      backgroundColor: "#ffffff",
      borderColor: "#ccc",
      borderRadius: 5,
      height: 40,
    },
    dropdownContainer: {
      backgroundColor: "#ffffff",
      borderColor: "#ccc",
      borderRadius: 5,
    },
    dropdownLabel: {
      fontSize: 14,
      color: "#333",
    },
    dropdownArrow: {
      tintColor: "#333",
    },
  });