import { View, FlatList, Pressable } from "react-native";
import { listingStyles } from "../styles/listingStyles";
import { useEffect, useState } from "react";
import { getListings } from "../api";
import ListingCard from "./ListingCard";
import { useNavigation } from "@react-navigation/native";
import SingleListing from "./SingleListing";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [err, setErr] = useState("");
  const navigation = useNavigation();

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

  const handlePress = (listing) => {
    navigation.navigate("SingleListing", { listing });
  };

  return (
    <View style={listingStyles.container}>
      <FlatList
        data={listings}
        renderItem={(item) => {
          return (
            <Pressable
              onPress={() => handlePress(item.item)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "white",
                },
              ]}
            >
              <ListingCard listing={item.item}></ListingCard>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    </View>
  );
}
