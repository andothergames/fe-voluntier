import { View, Text, Pressable, TextInput, Switch, Alert } from "react-native";
import { loginStyles } from "../styles/loginStyles";

export function LogoutForm({ handleSubmitLogout, user }) {
  let userName;

  if (user) {
    if (user.role === "volunteer") {
      userName = user.vol_email;
    } else {
      userName = user.org_email;
    }
  }

  return (
    <View>
      <Text style={loginStyles.title}>You are currently logged in as:</Text>
      <Text style={loginStyles.userName}>{userName}</Text>
      <View style={loginStyles.buttonContainer}>
        <Pressable style={loginStyles.button} onPress={handleSubmitLogout}>
          <Text style={loginStyles.white}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
