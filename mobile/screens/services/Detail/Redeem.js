import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TokenData } from "../../../components/services/TokenData";
import { useNavigation } from "@react-navigation/native";
import Lottie from "lottie-react-native";

const screenWidth = Dimensions.get("window").width;

const Redeem = ({ route, navigation }) => {
  const { status, msg } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.lottie}>
        {status === "success" ? (
          <Lottie
            source={require("../../../assets/img/present.json")}
            autoPlay
            loop={false}
          />
        ) : // masukkin gambar yg gagal redeem
        null}
      </View>
      <Text style={styles.header}>Redeem {status}!</Text>
      <Text style={styles.text}>{msg}</Text>
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
    textAlign: "center",
    padding: 10,
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

export default Redeem;
