import { View, Text, Image } from "react-native";
import { styles } from "../styles";

export default function Header() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("../assets/voluntierlogo.png")}
        style={styles.logo}
      ></Image>
    </View>
  );
}
