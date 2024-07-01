import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { getListings } from "../api";
import ListingCard from "./ListingCard"

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    getListings()
      .then((listings) => {
        setListings(listings);
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
      });
  }, []);


  return (
    <View style={styles.listingsContainer}>
      {listings.map((listing) => (
          <ListingCard key={listing.list_id} listing={listing}></ListingCard>
      ))}
    </View>
  );
}
