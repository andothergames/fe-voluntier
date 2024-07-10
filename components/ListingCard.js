import { View, Text, Image } from "react-native";
import { listingStyles as styles } from "../styles/listingStyles";
import * as api from "../api";
import { useEffect, useState } from "react";

export default function ListingCard({ listing }) {
  const [img, setImg] = useState(null);
  const [placeholder, setPlaceholder] = useState("");

  const imagePlaceholders = {
    0: require("../assets/images/volunteer.jpg"),
    1: require("../assets/images/garden-cleanup.jpg"),
    2: require("../assets/images/beach-cleanup.jpg"),
    3: require("../assets/images/fun-run.jpg"),
    4: require("../assets/images/food-bank.jpg"),
    5: require("../assets/images/garden-cleanup.jpg"),
    6: require("../assets/images/book-sale.jpg"),
    7: require("../assets/images/dinner-service.jpg"),
    8: require("../assets/images/sports-coaching.jpg"),
  };

  useEffect(() => {
    const { list_img_id } = listing;
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
    } else {
      // Get placeholder image
      if (imagePlaceholders[listing.list_id]) {
        setPlaceholder(imagePlaceholders[listing.list_id]);
      } else {
        setPlaceholder(imagePlaceholders[0]);
      }
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
          <Image source={placeholder} style={styles.image} />
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
