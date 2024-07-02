import { styles } from "./styles"; 
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Header from "./components/Header";
import TopNav from "./components/Top-Nav";
import Nav from './components/Nav';


export default function App() {
  return (

    <View style={styles.container}>
      <TopNav />
      <Header />
      <View style={styles.navigationContainer}>
        <NavigationContainer>
          <Nav />
        </NavigationContainer>
      </View>
    </View>
  );
}

