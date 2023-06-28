import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import Lottie from "lottie-react-native";

import api from "../../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BACKEND_URL } from "../../../backendURL";

const screenWidth = Dimensions.get("window").width;

const RewardDetail = ({ route, navigation }) => {
  // Extract the id from route params
  const { id } = route.params;

  const [voucherData, setVoucherData] = useState([]);

  // formatting date
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };

    return date.toLocaleString("en-us", options);
  };

  const getVoucherDetail = async () => {
    const token = await AsyncStorage.getItem("token");

    await api
      .get(`/vouchers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setVoucherData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const handleRedeem = async (id) => {
    const token = await AsyncStorage.getItem("token");

    await api
      .patch(`/vouchers/${id}/redeem`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        navigation.navigate("Redeem");
      })
      .catch((err) => {
        console.log(err, err.response.data.msg);
      });
  };

  const handleBackButton = () => {
    navigation.navigate("ServiceNavigator");
  };

  useEffect(() => {
    getVoucherDetail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => handleBackButton()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Reward Details</Text>
      <View style={styles.detail}>
        <View style={styles.imgProfile}>
          {/* <Text style={styles.imgProfileText}>{initialName}</Text> */}
          <Image
            source={{
              uri: `${voucherData.voucherImage.replace(
                "http://127.0.0.1:5000/v1/ga/",
                BACKEND_URL
              )}`,
            }}
            width={screenWidth * 0.85}
            height={170}
            borderRadius={10}
          />
        </View>
        <Text style={styles.title}>{voucherData.voucherTitle}</Text>
        <Text style={styles.date}>
          Valid Until {formattedDate(voucherData.validUntilDate)}
        </Text>
        <View style={styles.line}></View>
        <Text style={styles.desc}>{voucherData.voucherDescription}</Text>
        <Text style={styles.text}>{voucherData.voucherPrice} Groovy Point</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRedeem(voucherData._id)}
      >
        <Text style={styles.buttonText}>Redeem</Text>
      </TouchableOpacity>
      <View style={styles.lottie}>
        <Lottie
          source={require("../../../assets/img/rewardecor.json")}
          autoPlay
          loop={false}
          style={{}}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  lottie: {
    position: "absolute",
    left: -15,
    bottom: 30,
    width: 180,
    height: 450,
  },
  detail: {
    width: screenWidth * 0.85,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  imgProfile: {
    width: screenWidth * 0.85,
    height: 170,
    borderRadius: 10,
    backgroundColor: "#ACACAC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  imgProfileText: {
    color: "white",
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "light",
    color: "#7f7f7f",
  },
  desc: {
    fontSize: 15,
    marginBottom: 50,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#D45239",
    width: "100%",
    marginBottom: 10,
  },
  back: {
    position: "absolute",
    top: 5,
    left: 25,
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#F8D344",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
};

export default RewardDetail;
