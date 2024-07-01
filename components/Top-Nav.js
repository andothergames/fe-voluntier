import { View, Text, Image } from "react-native";
import { styles } from "../styles";

export default function TopNav() {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={require("../assets/settings-icon.svg")}
        style={styles.settingsIcon}
      ></Image>
      <Image
        source={require("../assets/account-icon.svg")}
        style={styles.accountIcon}
      ></Image>
    </View>
  );
}
