import { View } from 'react-native';
import { styles } from "./styles"; 
import Header from './components/Header';
import Nav from './components/Nav'
import TopNav from './components/Top-Nav';
import Listings from './components/Listings';

export default function App() {
  return (
    <View style={styles.container}>
      <TopNav />
      <Header />
      <Listings />
      {/* <Nav /> */}
    </View>
  );
}

