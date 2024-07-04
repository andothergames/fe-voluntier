import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import { drawerStyles as styles } from "../styles/drawerStyles";

export default function DeleteAccount() {
  const handlePress = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure? Your profile, listings and data will be permanently deleted. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => console.log("Delete Pressed"),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.9;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../assets/listing-image.jpg")}
          style={[styles.image, { width: imageWidth }]}
        />
        <Text>
          Are you sure? Your profile, listings and data will be permanently
          deleted. This action cannot be undone.
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          style={styles.deleteButton}
        >
          <Text style={styles.white}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
