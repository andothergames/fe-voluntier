import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SingleListing from "./SingleListing";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: null,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SingleListing"
        component={SingleListing}
        options={{
          headerTitle: null,
        }}
      />
    </Stack.Navigator>
  );
}
