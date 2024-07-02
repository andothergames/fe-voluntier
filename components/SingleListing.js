import { View, Text, Image } from "react-native";
import { singleListingStyles } from "../styles/singleListingStyles";


export default function SingleListing( { route }) {

  const { listing } = route.params 


  return (
    <View>
    <View style={singleListingStyles.card}>
        <View style={[{paddingHorizontal: 15}, {paddingVertical: 15}]}>
        <Text style={singleListingStyles.title}>{listing.org_name}</Text>
        <Text>Duration: {listing.list_duration} hours</Text>
        <Text>{listing.list_date}         {listing.list_time}</Text>
        <View>
        <Image source={require('../assets/listing-image.jpg')} style={singleListingStyles.image}>{listing.list_img}</Image>
        </View>
        <Text style={{fontWeight: "bold"}}>What you'll be doing:</Text>
        <Text>{listing.list_description}</Text>
        </View>
    </View> 
    </View>

  )
}
