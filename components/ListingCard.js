import { View, Text, Image } from "react-native";
import { listingStyles as styles } from "../styles/listingStyles";
import * as api from "../api";
import { useEffect, useState } from "react";

export default function ListingCard({ listing }) {
  const [img, setImg] = useState(null);
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const { list_img_id } = listing;

    console.log(listing);

    // Get image if not null
    if (list_img_id) {
      api
        .getB64Image(list_img_id)
        .then(({ img_b64_data }) => {
          setImg(img_b64_data);
        })
        .catch((err) => {
          console.log("ERROR: Cannot fetch image!");
        });
    }

    // Get skills
    if (!skills) {
      // api.getSkillsForListId(listing.list_id)
    }
  }, [listing]);

  const date = new Date(listing.list_date);
  const time = new Date(`1970-01-01T${listing.list_time}`);

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

  return (
    <View style={styles.card}>
      <View>
        {img ? (
          <Image source={{ uri: img }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/listing-image.jpg")}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{listing.list_title}</Text>
        <Text style={styles.orgName}>{listing.org_name}</Text>
        <View style={styles.smallTextContainer}>
          <Text style={styles.date}>
            {formattedDate} {formattedTime}
          </Text>
        </View>
      </View>
      <View style={styles.hoursContainer}>
        <Text style={styles.hours}>{listing.list_duration}</Text>
        <Text style={styles.hrs}>hrs</Text>
      </View>
    </View>
  );
}
