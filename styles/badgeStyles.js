import { StyleSheet, Dimensions } from "react-native";


export const badgeStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
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
    width: 100
  },
  badgeName: {
    fontWeight: "bold",
    flexWrap: 'wrap',
    textAlign: "center"

  },
  badgePoints: {
    color: "gray",
  }})
