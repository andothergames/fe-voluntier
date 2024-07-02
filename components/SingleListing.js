import { View, Text } from "react-native";
import { styles } from "../styles";


export default function SingleListing( { route }) {

  const { listing } = route.params 

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{listing.title}</Text>
    <Text>{listing.description}</Text>
    <Text>in the single listing</Text>
  </View>
  )
}
