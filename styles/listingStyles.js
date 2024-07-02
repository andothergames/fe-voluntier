import { StyleSheet } from "react-native";

export const listingStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 25,
    width: "100%",
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 25,
  },
  description: {
    flex: 1,
    fontSize: 14,
    color: "white",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    padding: 15,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  hoursContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba( 0, 0, 0, 0.5)",
    padding: 15,
    borderRadius: 50,
  },
  hours: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  smallTextContainer: {
    width: "100%",
    flexDirection: "row",
  },
  left: {
    textAlign: "right",
  },
});
