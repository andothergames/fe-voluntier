import React from "react";
import { View } from "react-native";
import { styles } from "../styles/appStyles";
import OrgListings from "../components/OrgListings";

export default function OrgHomeScreen({ setOrgListings, orgListings }) {
  return (
    <View style={styles.container}>
      <OrgListings setOrgListings={setOrgListings} orgListings={orgListings} />
    </View>
  );
}
