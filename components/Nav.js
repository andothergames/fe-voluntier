import { View, Image, Text } from "react-native";
import { styles } from "../styles";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BadgesScreen from "../screens/BadgesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const homeIcon = require("../assets/home-icon.png");
const myListingsIcon = require("../assets/my-listings-icon.png");
const badgeIcon = require("../assets/badge-icon.png");

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#7BB9F8" },
        tabBarIcon: ({ focused }) => {
          let icon;
          let tintColor = focused ? "#001FFF" : "#383838";

          if (route.name === "TabHome") {
            icon = homeIcon;
          } else if (route.name === "TabMyListings") {
            icon = myListingsIcon;
          } else if (route.name === "TabBadges") {
            icon = badgeIcon;
          }

          return (
            <Image
              source={icon}
              style={{ height: 30, width: 30, tintColor: tintColor }}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let label;
          let color = focused ? "#001FFF" : "#383838";

          if (route.name === "TabHome") {
            label = "Home";
          } else if (route.name === "TabMyListings") {
            label = "My Listings";
          } else if (route.name === "TabBadges") {
            label = "Badges";
          }

          return <Text style={{ color: color }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen
        name="TabHome"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="TabMyListings"
        component={MyListingsScreen}
        options={{
          headerShown: false,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="TabBadges"
        component={BadgesScreen}
        options={{
          headerShown: false,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

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
  return <StackNavigatior />;
}
