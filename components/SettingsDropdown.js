import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import About from "./About";
import Contact from "./Contact";
import DeleteAccount from "./DeleteAccount";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="About us" component={About} />
      <Drawer.Screen name="Contact us" component={Contact} />
      {/* <Drawer.Screen name="Delete account" component={DeleteAccount} /> */}
    </Drawer.Navigator>
  );
}
