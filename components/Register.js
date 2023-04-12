import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomButton from "./CustomButton";
import InputField from "./InputField";

import axios from "axios";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nomorHP, setNomorHP] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const handleRegisterPress = async () => {
    console.log("Sending request...");

    // send POST request to API endpoint
    await axios
      .post("http://10.10.28.121:5000/v1/users/signUp", {
        firstName,
        lastName,
        nomorHP,
        emailAddress,
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
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/img/logo.png")}
            resizeMode="contain"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          />
        </View>
        <InputField
          style={styles.fname}
          label={"First Name"}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          keyboardType="email-address"
        />
        <InputField
          label={"Last Name"}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          keyboardType="email-address"
        />
        <InputField
          label={"Phone Number"}
          value={nomorHP}
          onChangeText={(text) => setNomorHP(text)}
          keyboardType="number-pad"
        />
        <InputField
          label={"E-mail"}
          value={emailAddress}
          onChangeText={(text) => setEmailAddress(text)}
          keyboardType="email-address"
        />
        <CustomButton
          label={"Register"}
          onPress={() => handleRegisterPress()}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 100,
          }}
        >
          <Text>Have an Account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={{ color: "#F79944", fontWeight: "700" }}>
              {" "}
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  rootScreen: {
    width: 158,
    height: 258,
  },
  fname: {
    flexDirection: "row",
    paddingBottom: 40,
    marginBottom: 10,
  },
});

export default Register;
