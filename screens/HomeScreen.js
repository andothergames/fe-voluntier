import React from "react";
import { View } from "react-native";
import { styles } from "../styles/appStyles";
import Listings from "../components/Listings";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function HomeScreen() {
  const [filterDistance, setFilterDistance] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [filterOrgType, setFilterOrgType] = useState("");
  const [filterKeyWord, setFilterKeyWord] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SearchBar />
      <Listings />
    </View>
  );
}
