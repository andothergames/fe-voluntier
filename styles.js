import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
    height: undefined
  },
  logo: {
    width: 150,
    resizeMode: "contain",
    height: undefined
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    left: 10,
    width: 20,
    height: 20,
  },
  accountIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 20,
    height: 20,
  },
  listingsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
    width: '100%'
  },
  listingsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 25,
    width: '100%',
    overflow: 'hidden'
  },
  listingsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  listingsImage: {
    width: "100%",
    height: 250,
    borderRadius: 25,
  },
  listingsDescription: {
    flex: 1,
    fontSize: 14,
    color: "white",
  },
  listingsTextContainer: {
    position: "absolute",
    bottom: 0,
    padding: 15,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  listingsHoursContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba( 0, 0, 0, 0.5)",
    padding: 15,
    borderRadius: 50,
  },
  listingsHours: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  listingsSmallTextContainer: {
    width: "100%",
    flexDirection: "row",
  },
  left: {
    textAlign: "right",
  },
});

