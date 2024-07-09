import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user-context';
import axios from 'axios';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { getAuthHeader } from '../api';

export default function MyListingsScreen({favourites, setFavourites}) {
  // const [favListings, setFavListings] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const { user } = useContext(UserContext);

  const userId = user.vol_id;

  useEffect(() => {
    // getFavListings(userId);
    getVolApplications(userId);
  }, []);
console.log(favourites, 'favourites')
  // const getFavListings = (userId) => {
  //   userId = user.vol_id;
  //   axios
  //     .get(
  //       `https://voluntier-api.codermatt.com/api/favourites/3/listings`,
  //       getAuthHeader(user.token)
  //     )
  //     .then((data) => setFavListings(data.data.favourite_listings))
  //     .catch((err) =>
  //       console.log('error fetching your favourite listings:', err)
  //     );
  // };
  const getVolApplications = (userId) => {
    userId = user.vol_id;
    // user.vol_id;
    axios
      .get(
        `https://voluntier-api.codermatt.com/api/applications/vol/${userId}`,
        getAuthHeader(user.token)
      )
      .then((data) =>
        // console.log(data.data.applications, 'data from applications')
        setMyApplications(data.data.applications)
      )
      .catch((err) =>
        console.log('error fetching your favourite listings:', err)
      );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My favourite opportunities</Text>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>

        {favourites.map((listing) => {
          
          return (
            <TouchableOpacity
              style={styles.card}
              key={listing.list_id}>
              <Image
                source={require('../assets/list-img1.png')}
                style={styles.image}
              />

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{listing.list_title}</Text>
                <Text style={styles.cardDescription}>
                  {listing.list_description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Text style={styles.title}>My current applications</Text>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {myApplications.map((application) => {
          // console.log(application, "here data");
          return (
            <TouchableOpacity
              style={styles.card}
              key={application.listing_id}>
              <Image
                source={require('../assets/list-img1.png')}
                style={styles.image}
              />

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{application.list_title}</Text>
                <Text style={styles.cardTitle}>{application.org_name}</Text>
                <Text style={styles.cardDescription}>
                  {application.list_description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  scrollView: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: 250,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
