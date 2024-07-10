import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/appStyles";
import OrgListings from "../components/OrgListings";

export default function OrgHomeScreen({ setOrgListings, orgListings }) {
  return (
    <View style={styles.container}>
      {!orgListings.length ? 
        <Text style={styles.listingsText}>No listings yet!</Text>
       : 
        <OrgListings
          setOrgListings={setOrgListings}
          orgListings={orgListings}
        />
      }
    </View>
  );
}
