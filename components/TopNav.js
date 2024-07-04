import { View, Image } from 'react-native';
import { headerStyles } from '../styles/headerStyles';

export default function TopNav() {
  return (
    <View style={headerStyles.iconContainer}>
      <Image
        source={require('../assets/settings-icon.png')}
        style={headerStyles.settingsIcon}></Image>
      <Image
        source={require('../assets/account-icon.png')}
        style={headerStyles.accountIcon}></Image>
    </View>
  );
}
