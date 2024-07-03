import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "../styles/appStyles";

export default function Contact() {
    return (
        <View style={styles.container}>
        <Text style={styles.aboutHeader}>Contact Us</Text>
        <Image source={require("../assets/listing-image.jpg")} style={styles.image} />
        <ScrollView>
            <Text style={styles.text}>
            If you have any questions or feedback, please feel free to contact us at
            Voluntier. We are always looking for ways to improve our platform and
            make it easier for you to connect with others. You can reach us by
            email at info@voluntier.org, by phone at 555-555-5555 or submit a message through our contact form below.
            </Text>
        </ScrollView>
        </View>
    );
}
