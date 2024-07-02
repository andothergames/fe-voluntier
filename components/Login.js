import { UserContext } from "../contexts/user-context";
import { useState, useContext } from "react";
import { View, Text, Pressable, Input } from "react-native";
import { login, logout } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyles } from "../styles/loginStyles";

export default function Login() {

    const userInfo = {
        email: "mattydemail@email.com",
        password: "mybadpassword",
        role: "volunteer"
    }

    const handleSubmitLogin = () => {
        login(userInfo).then((data) => {
            // setUser(data)
            console.log(user);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleSubmitLogout = () => {
        logout().then(() => {
            console.log('logged out');
        }).catch((err) => {
            console.log(err);
        })
    }

    const { user, setUser } = useContext(UserContext);
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();


    const onChangeEmail = (e) => {
        setEmailInput(e.value)
    }

    const onChangePassword = (e) => {
        setPasswordInput(e.value)
    }

    return (
        <SafeAreaView style={loginStyles.container}>
            <Text style={loginStyles.title}>Sign in to Voluntier</Text>
      <View style={loginStyles.form}>
            <Text>Hello {user}</Text>
            <Pressable onPress={handleSubmitLogin} style={loginStyles.button}><Text>Login</Text></Pressable>
            <Pressable onPress={handleSubmitLogout} style={loginStyles.button}><Text>Logout</Text></Pressable>
      </View>

        </SafeAreaView>
    )
}



  