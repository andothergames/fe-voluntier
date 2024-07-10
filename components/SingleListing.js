import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { singleListingStyles as styles } from '../styles/singleListingStyles';
import {
  postFavourite,
  deleteFavourite,
  getFavourites,
  postApplications,
  getB64Image
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
  const [isApplied, setIsApplied] = useState(false);
  const [disabledApply, setDisabledApply] = useState(false);
  const [img, setImg] = useState(null);
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const favouriteListing = favourites.find(
      (favourite) => favourite.list_id === listing.list_id
    );
    if (favouriteListing) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
    const appliedListing = myApplications.find(
      (application) => application.listing_id === listing.list_id
    );
    setIsApplied(!!appliedListing);
    setDisabledApply(!!appliedListing);
  }, [favourites, myApplications, listing.list_id]);

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
    if (disabledApply) return;
    setDisabledApply(true);
    const body = {
      listing_id: listing.list_id,
      vol_user_id: user.vol_id,
    };
    postApplications(body, user.token)
      .then((newApplicaton) => {
        console.log(newApplicaton, '***********application posted');
        setMyApplications((currVal) => [...currVal, newApplicaton]);
      })
      .catch((err) => {
        console.log('error:', err);
      })
      .finally(() => {
        setDisabledApply(true);
      });
  }

   //image handling

   const imagePlaceholders = {
    0: require('../assets/images/volunteer.jpg'),
    1: require('../assets/images/garden-cleanup.jpg'),
    2: require('../assets/images/beach-cleanup.jpg'),
    3: require('../assets/images/fun-run.jpg'),
    4: require('../assets/images/food-bank.jpg'),
    5: require('../assets/images/garden-cleanup.jpg'),
    6: require('../assets/images/book-sale.jpg'),
    7: require('../assets/images/dinner-service.jpg'),
    8: require('../assets/images/sports-coaching.jpg'),
  };
  
  useEffect(() => {
    const { list_img_id } = listing;
    // Get image if not null
    if (list_img_id) {
      getB64Image(list_img_id)
        .then(({ img_b64_data }) => {
          setImg(img_b64_data);
        })
        .catch((err) => {
          console.log('ERROR: Cannot fetch image!');
        });
    } else {
      // Get placeholder image
      if (imagePlaceholders[listing.list_id]) {
        setPlaceholder(imagePlaceholders[listing.list_id])
      } else {
        setPlaceholder(imagePlaceholders[0])
      }
    }
  }, [listing]);

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
        {user && user.vol_id ? (
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
        ) : null}

        <Text style={styles.text}>Duration: {listing.list_duration} hours</Text>
        <Text style={styles.text}>
          {formattedDate} {formattedTime}
        </Text>

        <View>
          {img ? (
            <Image source={{ uri: img }} style={styles.image} />
          ) : (
            <Image
              source={placeholder}
              style={styles.image}
            />
          )}
        </View>
        <Text style={styles.titleText}>What you'll be doing:</Text>
        <Text style={styles.text}>{listing.list_description}</Text>
        {user && user.vol_id ? (
          <View style={{ marginHorizontal: 'auto' }}>
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={handleApplicationPress}
              disabled={disabledApply}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {isApplied ? 'Applied' : 'Apply'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
