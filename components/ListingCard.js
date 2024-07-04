import { View, Text, Image } from 'react-native';
import { listingStyles as styles } from '../styles/listingStyles';

export default function ListingCard({ listing }) {
  return (
    <View style={styles.card}>
      <View>
        <Image
          source={require('../assets/listing-image.jpg')}
          style={styles.image}></Image>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {listing.list_title}
        </Text>
        <Text style={styles.orgName}>
          {listing.org_name}
        </Text>
        <View style={styles.smallTextContainer}>
          <Text style={styles.date}>
            {listing.list_date} {listing.list_time}
          </Text>
        </View>
      </View>
      <View style={styles.hoursContainer}>
        <Text style={styles.hours}>{listing.list_duration}</Text><Text style={styles.hrs}>hrs</Text>
      </View>
    </View>
  );
}
