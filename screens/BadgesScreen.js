import { View, Text } from "react-native";
import BadgesToCollect from '../components/BadgesToCollect'
import MyBadges from "../components/MyBadges";

export default function BadgesScreen() {
  return (
    <View>
      <MyBadges />
      <BadgesToCollect />
    </View>
  );
}
