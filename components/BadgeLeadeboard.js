import { View, Text, Image, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { getBadgeLeaderboard } from "../api"
import { badgeStyles } from "../styles/badgeStyles"


export default function BadgeLeaderboard() {

    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        getBadgeLeaderboard().then((badges) => {
            console.log(badges, 'leaderboard badges')
            setLeaderboard(badges)
        })
    }, [])

    return (
        <View style={badgeStyles.container}>
      <Text style={{ fontWeight: "bold" }}> Badges Leaderboard:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={badgeStyles.badgesContainer}>
          {leaderboard.map((user) => (
            <View key={user.vol_last_name} style={badgeStyles.badgeItem}>
              <Image
                source={require("../assets/account-icon.png")}
                style={badgeStyles.badgeIcon}
              ></Image>
              <View style={badgeStyles.badgeTextContainer}>
                <Text style={badgeStyles.badgeName}>{user.vol_first_name}</Text>
                <Text style={badgeStyles.badgeName}>
                  {user.vol_last_name}
                </Text>
                <Text style={badgeStyles.badgePoints}>{user.points}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>

    )
}