import { styles } from "./styles"; 
import Nav from './components/Nav';
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}

