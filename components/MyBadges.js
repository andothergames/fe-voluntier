import { View, Text, Image, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import { getMyBadges } from "../api";
import { badgeStyles } from "../styles/badgeStyles";
import { UserContext } from "../contexts/user-context";

export default function MyBadges() {
  const [myBadges, setMyBadges] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getMyBadges(user.vol_id, user.token).then((badges) => {
      setMyBadges(badges);
    });
  }, []);

  return (
    <View style={badgeStyles.container}>
      <Text style={{ fontWeight: "bold" }}> My Badges: </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={badgeStyles.badgesContainer}>
          {myBadges.map((badge) => (
            <View key={badge.badge_id} style={badgeStyles.badgeItem}>
              <Image
                source={require("../assets/example-badge.png")}
                style={badgeStyles.badgeIcon}
              ></Image>
              <View style={badgeStyles.badgeTextContainer}>
                <Text style={badgeStyles.badgeName}>{badge.badge_name}</Text>
                <Text style={badgeStyles.badgePoints}>
                  {" "}
                  Points: {badge.badge_points}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
