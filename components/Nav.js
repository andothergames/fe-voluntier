import { UserContext } from "../contexts/user-context";
import { Image, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgesScreen from "../screens/BadgesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import AddListingScreen from "../screens/AddListing";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const homeIcon = require("../assets/home-icon.png");
const myListingsIcon = require("../assets/my-listings-icon.png");
const addListingIcon = require("../assets/add-listing-icon.png");
const badgeIcon = require("../assets/badge-icon.png");

const TabNavigator = () => {
  const { user } = useContext(UserContext);

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
          } else if (route.name === "TabAddListing") {
            icon = addListingIcon;
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
          } else if (route.name === "TabAddListing") {
            label = "Add Listing";
          } else if (route.name === "TabBadges") {
            label = "Badges";
          }

          return <Text style={{ color: color }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen
        name="TabHome"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      {user && user.role === 'volunteer' && (
        <Tab.Screen
          name="TabMyListings"
          component={MyListingsScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      {user && user.role === 'organisation' && (
        <Tab.Screen
          name="TabAddListing"
          component={AddListingScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Tab.Screen
        name="TabBadges"
        component={BadgesScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = ({ isVisible }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {() => (
          <>
            {isVisible && <TabNavigator />}
            {!isVisible && <HomeStack />}
          </>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default function Nav() {
  const { user } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!user); // Convert user to boolean (true if user exists, false otherwise)
  }, [user]);

  return <StackNavigator isVisible={isVisible} />;
}
