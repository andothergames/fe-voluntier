import { View, FlatList, Pressable } from 'react-native';
import { listingStyles as styles } from '../styles/listingStyles';
import { useContext, useEffect, useState } from 'react';
import { getListings } from '../api';
import ListingCard from './ListingCard';
import { useNavigation } from '@react-navigation/native';
import * as api from '../api';

export default function Listings({ listings }) {
  const navigation = useNavigation();

  const handlePress = (listing) => {
    navigation.navigate('SingleListing', { listing });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'white',
              },
            ]}
          >
            <ListingCard listing={item}></ListingCard>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
