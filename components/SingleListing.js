import { View, ScrollView, Text, Image } from "react-native";
import { singleListingStyles as styles } from "../styles/singleListingStyles";

export default function SingleListing({ route }) {
  const { listing } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{listing.list_title}</Text>
        <Text style={styles.orgName}>{listing.org_name}</Text>
        <Text style={styles.text}>Duration: {listing.list_duration} hours</Text>
        <Text style={styles.text}>
          {listing.list_date} {listing.list_time}
        </Text>
        <View>
          <Image
            source={require("../assets/listing-image.jpg")}
            style={styles.image}
          >
            {listing.list_img}
          </Image>
        </View>
        <Text style={styles.titleText}>What you'll be doing:</Text>
        <Text style={styles.text}>{listing.list_description}</Text>
      </View>
    </ScrollView>
  );
}
