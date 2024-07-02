import { View, Image } from "react-native";
import { styles } from "../styles";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BadgesScreen from "../screens/BadgesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const homeIcon = require("../assets/home-icon.png");
const myListingsIcon = require("../assets/my-listings-icon.png");
const badgeIcon = require("../assets/badge-icon.png");


const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TabHome"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image source={homeIcon} style={{ height: 30, width: 30 }} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="TabMyListings"
        component={MyListingsScreen}
        options={{
          title: "My Listings",
          tabBarIcon: ({ focused }) => (
            <Image source={myListingsIcon} style={{ height: 30, width: 30 }} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="TabBadges"
        component={BadgesScreen}
        options={{
          title: "Badges",
          tabBarIcon: ({ focused }) => (
            <Image source={badgeIcon} style={{ height: 30, width: 30 }} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}


const StackNavigatior = () => {
    return (
        <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
};

export default function Nav() {
  return (
        <StackNavigatior />
  );
}