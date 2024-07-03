import { View, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getBadges } from "../api";
import { badgeStyles } from "../styles/badgeStyles";

export default function BadgesToCollect() {
  const [badgesToCollect, setBadgesToCollect] = useState([]);

  useEffect(() => {
    getBadges().then((badges) => {
      setBadgesToCollect(badges);
    });
  }, []);

  return (
    <View style={badgeStyles.container}>
        <Text style={{ fontWeight: "bold" }}> Badges To Collect:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>


      <View style={badgeStyles.badgesContainer}>
        {badgesToCollect.map((badge) => (
          <View key={badge.badge_id} style={badgeStyles.badgeItem}>
            <Image
              source={require("../assets/example-badge.png")}
              style={badgeStyles.badgeIcon}
            ></Image>
            <View style={badgeStyles.badgeTextContainer}>
            <Text style={badgeStyles.badgeName}>{badge.badge_name}</Text>
            <Text style={badgeStyles.badgePoints}> Points: {badge.badge_points}</Text>
            </View>
            
          </View>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}
