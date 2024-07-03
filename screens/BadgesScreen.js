import { View } from "react-native";
import BadgesToCollect from '../components/BadgesToCollect'
import MyBadges from "../components/MyBadges";
import BadgeLeaderboard from "../components/BadgeLeadeboard"

export default function BadgesScreen() {
  
  return (
    <View>
      <BadgeLeaderboard />
      <MyBadges />
      <BadgesToCollect />
    </View>
  );
}
