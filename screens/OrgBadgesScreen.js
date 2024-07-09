import { UserContext } from "../contexts/user-context";
import { useContext, useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import { getOrgListings } from "../api";
import ListingCard from "../components/ListingCard";
import { useNavigation } from "@react-navigation/native";
import { listingStyles as styles } from "../styles/listingStyles";
import { ScrollView } from "react-native-gesture-handler";

export default function OrgBadgesScreen() {

  const { user } = useContext(UserContext);
  const [orgListings, setOrgListings] = useState([]);
  const [err, setErr] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getOrgListings(user.org_id, user.token)
      .then((listings) => {
        setOrgListings(listings);
      })
      .catch((error) => {
        setErr(error);
      });
  }, []);

  const handlePress = (listing) => {
    navigation.navigate("SingleListing", { listing });
  };
  
  return (
    <ScrollView style={styles.container}>
      {orgListings.map((listing) => {
        return (
          <View key={listing.list_id}>
            <ListingCard listing={listing}></ListingCard>
          </View>
        )
      })}
    </ScrollView>
  );
}
