import { View, Text, Image, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import { getBadges, getMyBadges } from "../api";
import { badgeStyles } from "../styles/badgeStyles";
import { UserContext } from "../contexts/user-context";

export default function BadgesToCollect() {
  const [badgesToCollect, setBadgesToCollect] = useState([]);
  const [myBadges, setMyBadges] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getBadges().then((badges) => {
      setBadgesToCollect(badges);
    });
  }, []);

  useEffect(() => {
    getMyBadges(user.vol_id, user.token).then((badges) => {
      setMyBadges(badges);
    });
  }, []);

  const myBadgesIds = myBadges.map((badge) => badge.badge_id);

  const filteredBadgesToCollect = badgesToCollect.filter(
    (badge) => !myBadgesIds.includes(badge.badge_id)
  );

  return (
    <View style={badgeStyles.container}>
      <Text style={{ fontWeight: "bold" }}> Badges To Collect:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={badgeStyles.badgesContainer}>
          {filteredBadgesToCollect.map((badge) => (
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
