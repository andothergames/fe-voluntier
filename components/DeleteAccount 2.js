import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/appStyles';

export default function DeleteAccount() {
  const handlePress = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure? Your profile, listings and data will be permanently deleted. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => console.log('Delete Pressed'),
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.aboutHeader}>Delete Account</Text>
      <Image source={require('../assets/listing-image.jpg')} style={styles.image} />
      <ScrollView>
        <Text style={styles.text}>
          Are you sure? Your profile, listings and data will be permanently deleted. This action cannot be undone.
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.deleteButton}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}