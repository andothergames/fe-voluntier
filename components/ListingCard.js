import { View, Text, Image } from "react-native";
import { styles } from "../styles";


export default function ListingCard({ listing }) {
  return (
    <View style={styles.listingsCard}>
        <View>
        <Image source={require("../assets/listing-image.jpg")} style={styles.listingsImage}></Image>
        </View>
        <View style={styles.listingsTextContainer}>
            <Text style={styles.listingsTitle}>{listing.list_title} {listing.org_name}</Text>
            <View style={styles.listingsSmallTextContainer}>
                <Text style={[styles.listingsDescription, styles.left]}>{listing.list_date} {listing.list_time}</Text>
            </View>
        </View>
        <View style={styles.listingsHoursContainer}>
            <Text style={styles.listingsHours}>{listing.list_duration}</Text>
        </View>
    </View>
  );
}
