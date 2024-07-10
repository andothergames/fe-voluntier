import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { singleListingStyles as styles } from '../styles/singleListingStyles';
import {
  postFavourite,
  deleteFavourite,
  getFavourites,
  postApplications,
} from '../api';
import { UserContext } from '../contexts/user-context';
import { useContext, useEffect, useState } from 'react';

export default function SingleListing({
  route,
  favourites,
  setFavourites,
  myApplications,
  setMyApplications,
}) {
  const { listing } = route.params;
  const date = new Date(listing.list_date);
  const time = new Date(`1970-01-01T${listing.list_time}`);
  const { user } = useContext(UserContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const favouriteListing = favourites.find(
      (favourite) => favourite.list_id === listing.list_id
    );
    if (favouriteListing) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favourites]);

  const formattedDate = date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  function handleFavouritePress() {
    if (disabled) return;
    setDisabled(true);
    if (isFavourite) {
      deleteFavourite(listing.list_id, user.vol_id, user.token)
        .then(() => {
          setFavourites((currVal) =>
            currVal.filter((item) => item.list_id !== listing.list_id)
          );
          setIsFavourite(false);
        })
        .catch((err) => {
          console.log('error:', err);
        })
        .finally(() => {
          setTimeout(() => setDisabled(false), 2000);
        });
    } else {
      postFavourite(listing.list_id, user.vol_id, user.token)
        .then(() => {
          setFavourites((currVal) => [...currVal, listing]);
          setIsFavourite(true);
        })
        .catch((err) => {
          console.log('error:', err);
        })
        .finally(() => {
          setTimeout(() => setDisabled(false), 2000);
        });
    }
  }
  function handleApplicationPress() {
    const body = {
      listing_id: listing.list_id,
      vol_user_id: user.vol_id,
    };
    // if (disabledApply) return;
    // setDisabledApply(true);
    // console.log("body:", body);
    postApplications(body, user.token)
      .then(() => {
        console.log('application posted');
        setMyApplications((currVal) => [...currVal, listing]);
        // setIsApplied(true);
      })
      .catch((err) => {
        console.log('error:', err);
      });
    // .finally(() => {
    //   setDisabledApply(false);
    // });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{listing.list_title}</Text>
        <Text style={styles.orgName}>{listing.org_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}></View>

        <View style={styles.favourite}>
          <TouchableOpacity
            onPress={handleFavouritePress}
            disabled={disabled}>
            <FontAwesomeIcon
              icon={faHeart}
              size={35}
              style={{ color: isFavourite ? '#ff0505' : '#FFC1C1' }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Duration: {listing.list_duration} hours</Text>
        <Text style={styles.text}>
          {formattedDate} {formattedTime}
        </Text>

        <View>
          <Image
            source={require('../assets/listing-image.jpg')}
            style={styles.image}>
            {listing.list_img}
          </Image>
        </View>
        <Text style={styles.titleText}>What you'll be doing:</Text>
        <Text style={styles.text}>{listing.list_description}</Text>
        <View style={{ marginHorizontal: 'auto' }}>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={handleApplicationPress}
            disabled={disabled}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
