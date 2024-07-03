import { UserContext } from "../contexts/user-context";
import { useState, useContext } from "react";
import { View, Text, Pressable, TextInput, Switch } from "react-native";
import { login, logout } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyles } from "../styles/loginStyles";

export default function Login() {
  // FOR TESTING: this is a valid user to log into the app
  //   const loginInfoForTesting = {
  //     email: "mattydemail@email.com",
  //     password: "mybadpassword",
  //   };

  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [message, setMessage] = useState("");
  const [switchText, setSwitchText] = useState("Login as Organisation");
  const [isOrganisation, setIsOrganisation] = useState(false);
  const toggleSwitch = () => {
    setIsOrganisation((previousState) => !previousState);
    
};

  const body = {
    email,
    password,
    role,
  };

  const handleSubmitLogin = () => {
    login(body).then(({ user }) => {
      if (user !== undefined) {
        setEmail("");
        setPassword("");
        setUser(user);
        setMessage(`Hello ${user.vol_first_name}`);
      } else {
        setMessage("Sorry, there has been an error");
        setEmail("");
        setPassword("");
      }
    });
  };

  const handleSubmitLogout = () => {
    logout().then(() => {
      setMessage(`You have logged out`);
    });
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <Switch
        style={loginStyles.switch}
        trackColor={{ false: "#767577", true: "#001FFF" }}
        thumbColor={isOrganisation ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#7BB9F8"
        onValueChange={toggleSwitch}
        value={isOrganisation}
      />
      <Text style={loginStyles.switchText}>{switchText}</Text>
      <View style={loginStyles.form}>
        <Text style={loginStyles.title}>Sign in to Voluntier</Text>
        <View style={loginStyles.input}>
          <Text style={loginStyles.inputLabel}>Email address</Text>
          <TextInput
            style={loginStyles.inputControl}
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={loginStyles.input}>
          <Text style={loginStyles.inputLabel}>Password</Text>
          <TextInput
            style={loginStyles.inputControl}
            secureTextEntry="true"
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Text style={loginStyles.error}>{message}</Text>
        <Pressable onPress={handleSubmitLogin} style={loginStyles.button}>
          <Text style={loginStyles.white}>Login</Text>
        </Pressable>
        <Pressable onPress={handleSubmitLogout} style={loginStyles.button}>
          <Text style={loginStyles.white}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
