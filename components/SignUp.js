import { UserContext } from "../contexts/user-context";
import { useState, useContext, useEffect } from "react";
import { View, Text, Pressable, TextInput, Switch, Alert } from "react-native";
import { createVolAccount, createOrgAccount } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyles } from "../styles/loginStyles";
import { useNavigation } from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";

export default function SignUp() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [org_name, setOrgName] = useState("");
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

  const volBody = {
    first_name,
    last_name,
    email,
    password,
  };

  const orgBody = {
    org_name,
    email,
    password,
    org_type_id: 1
  };

  const handleCreateAccount = () => {
    if (!first_name.trim().length) {
      alert("First name can not be empty!");

      return;
    }

    if (!last_name.trim().length) {
      alert("Last name can not be empty!");

      return;
    }
    

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

    createVolAccount(volBody)
      .then(({ user }) => {
        alert("Account created");

        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("ERROR: Unable to create account");
      });
  };

  const handleCreateOrgAccount = () => {

    if (!org_name.trim().length) {
      alert("Organisation Name can not be empty!");

      return;
    }
    

    if (!email.trim().length) {
      alert("Email cannot be empty!");

      return;
    }

    if (!password.trim().length) {
      alert("Password cannot be empty!");

      return;
    }

    setMessage("");

    createOrgAccount(orgBody)
      .then(({ user }) => {
        console.log(user);
        alert("Account created");
        setOrgName("")
        setEmail("")
        setPassword("")
        navigation.navigate("Login");
      
      })
      .catch((err) => {
        console.log("ERROR: Unable to create account");
      });


  }

  return (
    <SafeAreaView style={loginStyles.container}>
      <ScrollView style={loginStyles.form}>
        <>
          <Text style={loginStyles.title}>{`Sign up as ${role}`}</Text>
          <Switch
            style={loginStyles.switch}
            trackColor={{ false: "#767577", true: "#001FFF" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#7BB9F8"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={loginStyles.switchText}>{switchText}</Text>


          {role === 'organisation' ? <View style={loginStyles.input}>
            <Text style={loginStyles.inputLabel}>Organisation Name
            </Text>
            <TextInput
              style={loginStyles.inputControl}
              value={org_name}
              onChangeText={(org_name) => setOrgName(org_name)}
            />
          </View> : <View style={loginStyles.input}>
            <Text style={loginStyles.inputLabel}>First Name</Text>
            <TextInput
              style={loginStyles.inputControl}
              value={first_name}
              onChangeText={(first_name) => setFirstName(first_name)}
            />
          </View> }
          




          {role === "organisation" ? null : (
            <View style={loginStyles.input}>
              <Text style={loginStyles.inputLabel}>Last Name</Text>
              <TextInput
                style={loginStyles.inputControl}
                value={last_name}
                onChangeText={(last_name) => setLastName(last_name)}
              />
            </View>
          )}

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


          {role === "organisation" ? 
          <View>
          <Pressable onPress={handleCreateOrgAccount} style={loginStyles.signUpButton}>
            <Text style={loginStyles.white}>Create Account</Text>
          </Pressable>
        </View>

          : 
          <View>
          <Pressable onPress={handleCreateAccount} style={loginStyles.signUpButton}>
            <Text style={loginStyles.white}>Create Account</Text>
          </Pressable>
        </View>
              
          }



          



        </>
      </ScrollView>
    </SafeAreaView>
  );
}
