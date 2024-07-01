import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import { styles } from "../styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import MyListings from "./MyListings";
import Badges from "./Badges";

export default function Nav() {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = require("../assets/home-icon.png");
              } else if (route.name === "My Listings") {
                iconName = require("../assets/my-listings-icon.png");
              } else if (route.name === "Badges") {
                iconName = require("../assets/badge-icon.png");
              }

              return (
                <Image
                  source={iconName}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              justifyContent: "space-between",
              paddingHorizontal: 30,
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="My Listings" component={MyListings} />
          <Tab.Screen name="Badges" component={Badges} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}
