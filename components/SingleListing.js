import { View, Text } from "react-native";
import { listingStyles } from "../styles/listingStyles";
import { appStyles } from "../styles/appStyles"


export default function SingleListing( { route }) {

  const { listing } = route.params 

  return (
    <View style={appStyles.container}>
    <Text style={listingStyles.title}>{listing.title}</Text>
    <Text>{listing.description}</Text>
    <Text>in the single listing</Text>
  </View>
  )
}
