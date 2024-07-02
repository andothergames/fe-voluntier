import { View, Text, Image } from 'react-native';
import { listingStyles } from '../styles/listingStyles';

export default function ListingCard({ listing }) {
  console.log(listing, 'herelisting');
  return (
    <View style={listingStyles.card}>
      <View>
        <Image
          source={require('../assets/listing-image.jpg')}
          style={listingStyles.image}></Image>
      </View>
      <View style={listingStyles.textContainer}>
        <Text style={listingStyles.title}>
          {listing.list_title} {listing.org_name}
        </Text>
        <View style={listingStyles.smallTextContainer}>
          <Text style={[listingStyles.description, listingStyles.left]}>
            {listing.list_date} {listing.list_time}
          </Text>
        </View>
      </View>
      <View style={listingStyles.hoursContainer}>
        <Text style={listingStyles.hours}>{listing.list_duration}</Text>
      </View>
    </View>
  );
}
