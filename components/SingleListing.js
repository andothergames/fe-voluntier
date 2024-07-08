import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { singleListingStyles as styles } from "../styles/singleListingStyles";
import { postFavourite } from "../api";
import { UserContext } from "../contexts/user-context";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import * as api from "../api";

export default function SingleListing({ route }) {
  const { listing, favourites } = route.params;
  const date = new Date(listing.list_date);
  const time = new Date(`1970-01-01T${listing.list_time}`);
  const { user } = useContext(UserContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const [listImg, setListImg] = useState(null);
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const { list_img_id, list_id } = listing;

    // Fetch img
    if (list_img_id) {
      api
        .getB64Image(list_img_id)
        .then(({ img_b64_data }) => {
          setListImg(img_b64_data);
        })
        .catch((err) => {
          console.log("ERROR: Cannot get image data!");
        });
    }

    // Fetch skills
    if (!skills) {
      api
        .getSkillsForListId(list_id)
        .then((skills) => {
          const skillMap = skills.map((skill) => {
            return skill.skill_name;
          });

          setSkills(skillMap);
        })
        .catch((err) => {});
    }

    // Check if listing is a vol user's favourite
    if (user && user.role === "volunteer") {
      if (favourites.includes(list_id)) {
        setIsFavourite(true);
      }
    }
  }, [listing]);

  const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  function handleFavouritePress() {
    if (!user || !user.vol_id) {
      alert("You must be logged in to favourite!");

      return;
    }

    setIsFavourite((currFave) => {
      return !currFave;
    });

    let favPromise;
    if (!isFavourite) {
      favPromise = api.postFavourite(listing.list_id, user.vol_id, user.token);
    } else {
      favPromise = api.deleteFavourite(
        listing.list_id,
        user.vol_id,
        user.token
      );
    }

    favPromise
      .then(() => {
        console.log("Favourite success!");
      })
      .catch((err) => {
        console.log("ERROR: unable to favourite listing!");

        setIsFavourite((currFave) => {
          return !currFave;
        });
      });
  }

  // Don't show the favourite icon if org user
  let favouriteIcon;
  if (user && user.role !== "volunteer") {
    favouriteIcon = null;
  } else {
    favouriteIcon = (
      <View style={styles.favourite}>
        <TouchableOpacity onPress={handleFavouritePress}>
          <FontAwesomeIcon
            icon={faHeart}
            size={35}
            style={{ color: isFavourite ? "#FFC1C1" : "#ff0505" }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{listing.list_title}</Text>
        <Text style={styles.orgName}>{listing.org_name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View>

        {favouriteIcon}

        <Text style={[styles.text, listingStyles.bold]}>
          Duration:{" "}
          <Text style={listingStyles.normal}>
            {listing.list_duration} hours
          </Text>
        </Text>
        <Text style={[styles.text, listingStyles.bold, listingStyles.grey]}>
          {formattedDate} {formattedTime}
        </Text>

        <View style={listingStyles.imageContainer}>
          {listImg ? (
            <Image source={{ uri: listImg }} style={styles.image} />
          ) : (
            <Image
              source={require("../assets/listing-image.jpg")}
              style={styles.image}
            />
          )}
        </View>
        <Text style={styles.titleText}>What you'll be doing:</Text>
        <Text style={styles.text}>{listing.list_description}</Text>
        <View>
          {skills ? (
            <>
              <Text style={styles.titleText}>Skills:</Text>
              <View style={listingStyles.skillsContainer}>
                {skills.map((skill, index) => {
                  return (
                    <Text key={index} style={listingStyles.skill}>
                      {skill}
                    </Text>
                  );
                })}
              </View>
            </>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const listingStyles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },

  grey: {
    color: "#383838",
  },

  normal: {
    fontWeight: "normal",
  },

  skillsContainer: {
    margin: 1,
    marginTop: 3,
    marginBottom: 3,
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },

  imageContainer: {
    marginTop: 5,
    marginBottom: 5,
  },

  skill: {
    borderRadius: 10,
    backgroundColor: "lightgrey",
    padding: 11,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
    overflow: "hidden",
    display: "inline",
  },
});
