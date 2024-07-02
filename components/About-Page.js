import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "../styles/appStyles";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutHeader}>About Us</Text>
      <Image source={require("../assets/listing-image.jpg")} style={styles.image} />
      <ScrollView>
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