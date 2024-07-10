import { StyleSheet } from "react-native";
import { listingStyles } from "./listingStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  navigationContainer: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: "black",
  },
  image: {
    width: 375,
    height: 200,
    marginBottom: 20,
  },
  aboutHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listingsText: {
    fontSize: 16,
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
    color: "#001FFF"
  },
});
