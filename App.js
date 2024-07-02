import { styles } from "./styles/appStyles";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import Header from "./components/Header";
import TopNav from "./components/Top-Nav";
import Nav from "./components/Nav";
import UserContextProvider from "./contexts/user-context";

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
          <Header />
        <View style={styles.container}>
          <View style={styles.navigationContainer}>
            <Nav />
          </View>
        </View>
      </NavigationContainer>
    </UserContextProvider>
  );
}
