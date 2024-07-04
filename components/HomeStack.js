import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./Settings-Dropdown";
import SingleListing from "./SingleListing";
import Login from "./Login";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SingleListing"
        component={SingleListing}
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: null,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
