import { StyleSheet } from "react-native";

export const badgeStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  badgeItem: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  badgeIcon: {
    width: 50,
    height: 50,
  },
  badgeTextContainer: {
    alignItems: "center",
  },
  badgeName: {
    fontWeight: "bold",
  },
  badgePoints: {
    color: "gray",
  },
});