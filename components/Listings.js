import { View, FlatList } from "react-native";
import { listingStyles } from "../styles/listingStyles";
import { useEffect, useState } from "react";
import { getListings } from "../api";
import ListingCard from "./ListingCard";

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
    <View style={listingStyles.container}>
      <FlatList
        data={listings}
        renderItem={(item) => {
          return <ListingCard listing={item.item}></ListingCard>;
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    </View>
  );
}
