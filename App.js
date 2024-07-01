import { View } from 'react-native';
import { styles } from "./styles"; 
import Header from './components/Header';
import Nav from './components/Nav'
import TopNav from './components/Top-Nav';
import Listings from './components/Listings';
import SearchBar from './components/SearchBar';
import { useState } from 'react';




export default function App() {
  const [filterDistance, setFilterDistance] = useState('')
const [filterSkill, setFilterSkill] = useState('')
const [filterOrgType, setFilterOrgType] = useState('')
const [filterKeyWord, setFilterKeyWord] = useState('')


  return (
    <View style={styles.container}>
      <TopNav />
      <Header />
      <SearchBar />
      <Listings />
      <Nav />
    </View>
  );
}

