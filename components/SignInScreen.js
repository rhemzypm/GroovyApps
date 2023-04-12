import React, { useState } from "react";
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

const LoginScreen = ({ navigation }) => {
  const [nomorHP, setNomorHP] = useState("");

  const handleLoginPress = async () => {
    console.log("Sending request...");

    // send post request to API endpoint
    await axios
      .post("http://10.10.28.121:5000/v1/users/signIn", {
        nomorHP,
      })
      .then((res) => {
        if (res.data.status === 0) {
          console.log(res.data);
          console.log(res.data.msg);

          // redirect to input OTP
          navigation.navigate("InputOTP");
        } else if (res.data.status === 1) {
          console.log(res.data.message);
        } else if (res.data.status === 2) {
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
          label={"Phone Number"}
          value={nomorHP}
          onChangeText={(text) => setNomorHP(text)}
          keyboardType="number-pad"
        />
        <CustomButton label={"Login"} onPress={() => handleLoginPress()} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 100,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#F79944", fontWeight: "700" }}>
              {" "}
              Register
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
});

export default LoginScreen;
