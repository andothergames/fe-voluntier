import { UserContext } from "../contexts/user-context";
import { useState, useContext, useEffect } from "react";
import { View, Text, Pressable, TextInput, Switch, Alert } from "react-native";
import { login } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyles } from "../styles/loginStyles";
import { useNavigation } from "@react-navigation/native";

import { LogoutForm } from "./LogoutForm";

export default function Login() {
  // FOR TESTING: this is a valid user to log into the app as vol/org
  // as vol:
  //     email: "mattydemail@email.com",
  //     password: "mybadpassword"
  // as org:
  //     email: "oxfam@email.com",
  //     password: "mybadpassword"

  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [oppRole, setOppRole] = useState("organisation");
  const [message, setMessage] = useState("");
  const [switchText, setSwitchText] = useState(`Switch to ${oppRole}`);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();

  useEffect(() => {
    const newRole = isEnabled ? "organisation" : "volunteer";
    const newOppRole = isEnabled ? "volunteer" : "organisation";
    setRole(newRole);
    setOppRole(newOppRole);
  }, [isEnabled]);

  useEffect(() => {
    setSwitchText(`Switch to ${oppRole}`);
  }, [role]);

  const body = {
    email,
    password,
    role,
  };

  const handleSubmitLogin = () => {
    // Check fields are valid!
    if (!email.trim().length) {
      alert("Email cannot be empty!");

      return;
    }

    if (!password.trim().length) {
      alert("Password cannot be empty!");

      return;
    }

    console.log("Attempting to login!");
    setMessage("");

    login(body)
      .then(({ user }) => {
        console.log(`Successfully signed in as: ${user.role}!`);

        setUser(user);

        // Navigate to home page
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log("ERRROR: Unable to login!");

        if (err.response.status === 401 || err.response.status === 404) {
          console.log(err.response.data.msg);
          console.log(err.response.status);

          const str = "Invalid email or password!";

          alert(str);
          setMessage(str);

          return;
        }

        console.log(err.response.data.msg);
        console.log(err.response.status);

        const str = "An unknow error occurred whilst logging in!";
        alert(str);
        setMessage(str);
      });
  };

  const handleSubmitLogout = () => {
    setUser(null);
    setEmail("");
    setMessage("");
    setPassword("");

    alert(`You have logged out!`);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.form}>
        {!user ? (
          <>
            <Text style={loginStyles.title}>{`Sign in as ${role}`}</Text>
            <Switch
              style={loginStyles.switch}
              trackColor={{ false: "#767577", true: "#001FFF" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#7BB9F8"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={loginStyles.switchText}>{switchText}</Text>
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
                secureTextEntry={true}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <Text style={loginStyles.error}>{message}</Text>
            <View style={loginStyles.buttonContainer}>
              <Pressable onPress={handleSubmitLogin} style={loginStyles.button}>
                <Text style={loginStyles.white}>Login</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <LogoutForm handleSubmitLogout={handleSubmitLogout} user={user} />
        )}
      </View>
    </SafeAreaView>
  );
}
