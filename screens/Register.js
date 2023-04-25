import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

export default function Register() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [nomorHP, setNomorHP] = useState("");

  const handleRegisterPress = async () => {
    console.log("Sending request...");

    // send POST request to API endpoint
    await axios
      .post("http://10.10.28.121:5000/v1/ga/users/signUp", {
        firstName,
        lastName,
        emailAddress,
        nomorHP,
      })
      .then((res) => {
        if (res.data.status === 0) {
          console.log(res.data);
          console.log(res.data.msg);

          // redirect to input OTP
          navigation.navigate("InputOTP");
        } else if (res.data.status === 1 || res.data.status === 2) {
          console.log(res.data);
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/img/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-10 pt-16"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">First Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="Enter Name"
          />
          <Text className="text-gray-700 ml-4">Last Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder="Enter Name"
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={emailAddress}
            onChangeText={(text) => setEmailAddress(text)}
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Phone Number</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            value={nomorHP}
            onChangeText={(text) => setNomorHP(text)}
            placeholder="Number"
          />
          <TouchableOpacity
            onPress={() => handleRegisterPress()}
            className="py-5 bg-yellow-400 rounded-xl"
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
