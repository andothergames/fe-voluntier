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
      .then((articles) => {
        setListings(articles);
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
      });
  }, []);

  console.log(listings);

  return (
    <View style={styles.listingsContainer}>
      {listings.map((listing) => (
          <ListingCard key={listing.list_id} listing={listing}></ListingCard>
      ))}
    </View>
  );
}
