import { View, ScrollView, Text, Image } from "react-native";
import { singleListingStyles as styles } from "../styles/singleListingStyles";

export default function SingleListing({ route }) {
  const { listing } = route.params;
const date = new Date(listing.list_date);
const time = new Date(`1970-01-01T${listing.list_time}`);

const formattedDate = date.toLocaleString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formattedTime = time.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{listing.list_title}</Text>
        <Text style={styles.orgName}>{listing.org_name}</Text>
        <Text style={styles.text}>Duration: {listing.list_duration} hours</Text>
        <Text style={styles.text}>
          {formattedDate} {formattedTime}
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
