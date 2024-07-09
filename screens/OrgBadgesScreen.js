import { UserContext } from "../contexts/user-context";
import { useContext, useState, useEffect } from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import { getOrgListings } from "../api";
import ListingCard from "../components/ListingCard";
import { useNavigation } from "@react-navigation/native";
import { badgeStyles as bstyles } from "../styles/badgeStyles";
import { listingStyles as styles } from "../styles/listingStyles";
import { ScrollView } from "react-native-gesture-handler";

export default function OrgBadgesScreen() {
  const { user } = useContext(UserContext);
  const [orgListings, setOrgListings] = useState([]);
  const [applicants, setApplicants] = useState({});
  const [err, setErr] = useState("");
  const [tickStatus, setTickStatus] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    getOrgListings(user.org_id, user.token)
      .then((listings) => {
        setOrgListings(listings);
        const applicantsData = {};
        const promises = listings.map((listing) => {
          return getApplicants(user.org_id, listing.list_id, user.token)
          .then((applicantsForListing) => {
              console.log(applicantsForListing);
              applicantsData[listing.list_id] = applicantsForListing;
            })
            .catch((error) => {
              setErr(error.message);
            });
        });

        Promise.all(promises)
          .then(() => {
            setApplicants(applicantsData);
          })
          .catch((error) => {
            setErr(error.message);
          });
      })
      .catch((error) => {
        setErr(error.message);
      });
  }, [user.org_id, user.token]);

  const handlePress = (listing) => {
    navigation.navigate("SingleListing", { listing });
  };

  const handleTick = (listingId, volId, appId) => {
    patchApplication(appId, user.token).then((data) => {
      console.log("Accepted");
    })
    .catch((error) => {
      setErr(error.message);
    });

    confirmAttendance(appId, user.token).then((data) => {
      console.log("Attendance confirmed");
    })
    .catch((error) => {
      setErr(error.message);
    });

    toggleTick(listingId, volId);
  };

  const toggleTick = (listingId, volId) => {
    setTickStatus((prevState) => ({
      ...prevState,
      [listingId]: {
        ...prevState[listingId],
        [volId]: !prevState[listingId]?.[volId],
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {orgListings.map((listing) => (
        <View key={listing.list_id}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={bstyles.badgesContainer}>
              {(applicants[listing.list_id] || []).map((vol) => {
                const isTicked = tickStatus[listing.list_id]?.[vol.vol_id];
                return (
                  <View key={vol.vol_id} style={bstyles.badgeItem}>
                    <Image
                      source={require("../assets/account-icon.png")}
                      style={bstyles.badgeIcon}
                    />
                    <Pressable
                      onPress={() =>
                        handleTick(listing.list_id, vol.vol_id, vol.app_id)
                      }
                    >
                      <Image
                        source={
                          isTicked
                            ? require("../assets/tick-fill-icon.png")
                            : require("../assets/tick-icon.png")
                        }
                        style={[
                          tickStyles.tick,
                          isTicked && { tintColor: "green" },
                        ]}
                      />
                    </Pressable>
                    <View style={bstyles.badgeTextContainer}>
                      <Text style={bstyles.badgeName}>
                        {vol.vol_first_name}
                      </Text>
                      <Text style={bstyles.badgeName}>{vol.vol_last_name}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View>
            <Pressable onPress={() => handlePress(listing)}>
              <ListingCard listing={listing} />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// THS NEEDS MOVING TO API FILE
import axios from "axios";

const voluntierApi = axios.create({
  baseURL: "https://voluntier-api.codermatt.com/api/",
});

const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getApplicants = (orgId, listingId, token) => {
  return voluntierApi
    .get(
      `applications/org/${orgId}?listing_id=${listingId}`,
      getAuthHeader(token)
    )
    .then(({ data }) => {
      return data.applications;
    });
};

const patchApplication = (appId, token) => {
  return voluntierApi
    .patch(
      `applications/${appId}`,
      { accept: true },
      getAuthHeader(token)
    )
    .then(({ data }) => {
      return data.application;
    })
};

const confirmAttendance = (appId, token) => {
  return voluntierApi
    .patch(`applications/${appId}/confirm-attendance`, {}, getAuthHeader(token))
    .then(({ data }) => {
      return data.application;
    })

};

const tickStyles = StyleSheet.create({
  tick: {
    height: 30,
    width: 30,
  },
});
