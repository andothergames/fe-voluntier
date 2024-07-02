import { View } from "react-native";
import { styles } from "../styles/appStyles";
import Header from '../components/Header';
import TopNav from '../components/Top-Nav';
import Listings from '../components/Listings';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";


export default function HomeScreen() {
  const [filterDistance, setFilterDistance] = useState('')
  const [filterSkill, setFilterSkill] = useState('')
  const [filterOrgType, setFilterOrgType] = useState('')
  const [filterKeyWord, setFilterKeyWord] = useState('')
  return (
    <View style={styles.container}>
      {/* <TopNav />
      <Header /> */}
      <SearchBar />
      <Listings />
    </View>
  );
}
