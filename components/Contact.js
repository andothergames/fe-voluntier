import React, { useState } from "react";
import {
  Linking,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { contactStyles as styles } from "../styles/contactStyles";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setError("All fields are required");
    } else {
      Alert.alert("Form submitted", "Your message has been sent");
      setName("");
      setEmail("");
      setMessage("");
      setError("");
    }
  };

  const handleEmail = () => {
    Linking.openURL("mailto:info@voluntier.org");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textForm}>
          If you have any questions or feedback, please feel free to contact us
          at Voluntier. We are always looking for ways to improve our platform
          and make it easier for you to connect with others. You can reach us by
          email at{" "}
          <Text
            style={{ color: "blue", textDecorationLine: "underline" }}
            onPress={handleEmail}
          >
            info@voluntier.org
          </Text>
          , by phone at 555-555-5555 or submit a message through our contact
          form below.
        </Text>
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.inputLabel}>Message</Text>
          <TextInput
            style={styles.messageTextInput}
            placeholder="Enter your message"
            value={message}
            onChangeText={setMessage}
            maxLength={500}
            multiline
            textAlignVertical="top"
          />
          <Text style={styles.inputLabel}>{message.length}/500</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}


