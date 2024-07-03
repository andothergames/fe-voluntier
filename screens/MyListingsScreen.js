import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user-context';
import axios from 'axios';
import { ScrollView, View, StyleSheet, Button, Text } from 'react-native';

export default function MyListingsScreen() {
  const [favListings, setFavListings] = useState([]);
  const [favCharities, setFavCharities] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getFavListings(userId);
    getFavCharities(userId);
  }, []);

  const userId = user.vol_id;

  const getFavListings = (userId) => {
    userId = user.vol_id;
    console.log(userId, 'userId here');
    axios
      .get(
        `https://voluntier-api.codermatt.com/api/favourites/${userId}/listings`
      )
      .then((data) =>
        // console.log(data.data.favourite_listings, 'data from favlistings')
        setFavListings(data.data.favourite_listings)
      )
      .catch((err) =>
        console.log('error fetching your favourite listings:', err)
      );
  };

  const getFavCharities = (userId) => {
    userId = user.vol_id;
    console.log(userId, 'userId here');
    axios
      .get(`https://voluntier-api.codermatt.com/api/favourites/${userId}/orgs`)
      .then((data) =>
        // console.log(data.data.favourite_orgs, 'data from favcharities')
        setFavCharities(data.data.favourite_orgs)
      )
      .catch((err) =>
        console.log('error fetching your favourite listings:', err)
      );
  };

  return (
    <View style={styles}>
      <Button
        onPress={getFavCharities}
        title="press me"
      />

      <View style={styles}>
        <Text style={styles}>My Favourite Charities</Text>
        <ScrollView
          style={styles}
          horizontal={true}>
          {favCharities.map((listing) => {
            return (
              <View
                style={{ borderWidth: 1, borderColor: 'red', width: 300 }}
                key={listing.fav_orgs_id}>
                <Text style={styles}>{listing.org_name}</Text>
                <Text style={styles}>{listing.org_avatar}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles}>
        <Text style={styles}>My favourite opportunities</Text>
        <ScrollView
          style={styles}
          horizontal={true}>
          {favListings.map((listing) => {
            return (
              <View
                style={{ borderWidth: 1, borderColor: 'red', width: 300 }}
                key={listing.fav_lists_id}>
                <Text style={styles}>{listing.list_title}</Text>
                <Text style={styles}>{listing.list_description}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles}>
        <Text style={styles}>My current applications</Text>
        <ScrollView
          style={styles}
          horizontal={true}>
          {favListings.map((listing) => {
            return (
              <View
                style={{ borderWidth: 1, borderColor: 'red', width: 300 }}
                key={listing.fav_lists_id}>
                <Text style={styles}>{listing.list_title}</Text>
                <Text style={styles}>{listing.list_description}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
