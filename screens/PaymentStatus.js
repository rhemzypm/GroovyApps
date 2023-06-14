import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Lottie from "lottie-react-native";

import { TokenData } from "../components/services/TokenData";

const screenWidth = Dimensions.get("window").width;

const PaymentStatus = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          source={require("../assets/img/sukses.json")}
          autoPlay
          loop={false}
          style={{}}
        />
      </View>
      <Text style={styles.header}>Your Payment Success !</Text>
      <Text style={styles.text}>Your Groovy package has been paid</Text>
      <Text style={styles.text}>Check your E-mail to check your invoice</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Point")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 100,
  },
  lottie: {
    marginTop: 70,
    width: 330,
    height: 280,
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginTop: 100,
    backgroundColor: "#F8D344",
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 5,
    width: screenWidth * 0.4,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 10,
  },
};

export default PaymentStatus;
