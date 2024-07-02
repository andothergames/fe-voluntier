import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Login from './Login';

export default function Header() {

  const navigation = useNavigation();

  const navigateToLogin= () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles}>
        <Image
          source={require('../assets/settings-icon.png')}
          style={styles.settingsIcon}></Image>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/voluntierlogo.png')}
          style={styles.logo}></Image>
      </View>

      <View style={styles}>
        <Pressable onPress={navigateToLogin}>
        <Image
          source={require('../assets/account-icon.png')}
          style={styles.accountIcon}></Image>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1 / 6,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 40,
  },
  logoContainer: {
    flex: 1,
    height: '70%',
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  accountIcon: {
    width: 30,
    height: 30,
  },
});
