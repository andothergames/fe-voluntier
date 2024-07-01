import { View } from 'react-native';
import { styles } from "./styles"; 
import Header from './components/Header';
import Nav from './components/Nav'
import TopNav from './components/Top-Nav';

export default function App() {
  return (
    <View style={styles.container}>
      <TopNav />
      <Header />
      <Nav />
    </View>
  );
}

