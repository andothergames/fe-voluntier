import { View, FlatList, Pressable } from "react-native";
import { listingStyles as styles } from "../styles/listingStyles";
import { useContext, useEffect, useState } from "react";
import { getListings } from "../api";
import ListingCard from "./ListingCard";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/user-context";
import * as api from "../api";

export default function Listings() {
  const { user } = useContext(UserContext);

  const [listings, setListings] = useState([]);
  const [err, setErr] = useState("");
  const navigation = useNavigation();

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    getListings()
      .then((listings) => {
        setListings(listings);
      })
      .catch((error) => {
        setErr(error);
      });

    if (user && user.vol_id) {
      console.log("Getting favourites!");
      api
        .getFavourites(user.vol_id, user.token)
        .then((favourites) => {
          const favArray = favourites.map((favourite) => {
            return favourite.list_id;
          });

          setFavourites(favArray);
        })
        .catch(({ response }) => {
          if (response.data.status === 404) {
            console.log("No favourites found!");
          }
        });
    }
  }, []);

  const handlePress = (listing) => {
    navigation.navigate("SingleListing", { listing, favourites });
  };

  return (
    <View style={styles.container}>
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
