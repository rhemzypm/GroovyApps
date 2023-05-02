import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native"; // Menambahkan Alert
import CustomButton from "./CustomButton";
import InputField from "./InputField";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const InputOTP = ({ navigation }) => {
  const [otp, setOTP] = useState("");
  const [msg, setMsg] = useState("");

  const handleResendOTP = () => {
    Alert.alert("Resend OTP", "Are you sure you want to resend the OTP?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Resend",
        onPress: async () => {
          // Kode untuk mengirim ulang OTP

          console.log("Sending request...");

          await axios
            .get("http://10.10.28.121:5000/v1/ga/users/resendOTP")
            .then((res) => {
              if (res.data.status === 0) {
                console.log(res.data);
                console.log(res.data.msg);
              } else if (res.data.status === 1 || res.data.status === 2) {
                console.log(res.data);
                console.log(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
        },
      },
    ]);
  };

  const handleVerifyOTP = async () => {
    console.log("Sending request...");

    // send POST request to API endpoint
    await axios
      .post("http://10.10.28.121:5000/v1/ga/users/verified", {
        otp,
      })
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
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/img/logo.png")}
            resizeMode="contain"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          ></Image>
        </View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          We've already sent OTP in your email
        </Text>
        <InputField
          label={"OTP"}
          value={otp}
          onChangeText={(text) => setOTP(text)}
          keyboardType="number-pad"
        />
        <CustomButton
          label={"Login"}
          onPress={() => navigation.navigate("TabNavigator")}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 100,
          }}
        >
          <Text>Didn't Receive The Code?</Text>
          <TouchableOpacity onPress={() => handleResendOTP()}>
            <Text style={{ color: "#F79944", fontWeight: "700" }}>
              {" "}
              Resend OTP
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

export default InputOTP;