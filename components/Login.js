import { UserContext } from "../contexts/user-context";
import { useState, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { login, logout } from "../api";

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
    return (
        <View>
            <Text>Hello {user}</Text>
            <Pressable onPress={handleSubmitLogin}><Text>Login</Text></Pressable>
            <Pressable onPress={handleSubmitLogout}><Text>Logout</Text></Pressable>
        </View>
    )
}