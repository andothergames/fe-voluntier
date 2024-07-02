import { View, Image } from "react-native";
import { headerStyles } from "../styles/headerStyles";

export default function Header() {
  return (
    <View style={headerStyles.logoContainer}>
      <Image
        source={require("../assets/voluntierlogo.png")}
        style={headerStyles.logo}
      ></Image>
    </View>
  );
}
