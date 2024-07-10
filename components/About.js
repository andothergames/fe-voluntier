import React from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { drawerStyles as styles } from "../styles/drawerStyles";

export default function About() {

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.9;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={require("../assets/images/volunteers-needed.jpg")} style={[styles.image, { width: imageWidth }]} />
        <Text style={styles.text}>
          Voluntier is a platform that connects volunteers with organisations that
          need help. We believe that everyone has something to offer, and that by
          working together, we can make a difference in our communities. Whether
          you're looking to volunteer your time, skills, or resources, Voluntier
          can help you find the perfect opportunity to give back. Join us today
          and start making a difference!
        </Text>
      </ScrollView>
    </View>
  );
}