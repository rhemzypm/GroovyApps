import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import Register from "./Register";
import InputOTP from "../components/InputOTP";

import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [nomorHP, setNomorHP] = useState("");

  const handleSignIn = async () => {
    console.log("Sending request...");

    await axios
      .post("http://10.10.28.121:5000/v1/ga/users/signIn", { nomorHP })
      .then((res) => {
        if (res.data.status === 0) {
          console.log(res.data);
          console.log(res.data.msg);

          // redirect to dashboard(??)
          navigation.navigate("InputOTP");
        } else if (res.data.status === 1 || res.data.status === 2) {
          console.log(res.data);
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start"></View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/img/login.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-10 pt-10"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Phone Number</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
            placeholder="number"
            value={nomorHP}
            onChangeText={(text) => setNomorHP(text)}
          />
          <TouchableOpacity
            onPress={() => handleSignIn()}
            className="py-4 bg-yellow-400 rounded-xl"
            style={{ marginTop: 10 }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-10">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
