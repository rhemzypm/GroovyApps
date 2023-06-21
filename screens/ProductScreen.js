import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import tw from "tailwind-react-native-classnames";

import ProductBox from "../components/ProductBox";
import { productData } from "../components/product/productData";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

export default function ProductScreen({ navigation }) {
  const { top } = useSafeAreaInsets();

  const [imgDashboard, setImgDashboard] = useState(
    require("../assets/img/head.png")
  );

  const [imgLogo, setImgLogo] = useState(
    require("../assets/img/G-Point-3.png")
  );

  const [notification, setNotification] = useState(100);

  const [userData, setUserData] = useState([]);
  const [packageData, setPackageData] = useState([]);

  // get user data
  const getUserData = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await api
        .get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  // get product
  const getPackageData = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await api
        .get("/packages/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setPackageData(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    getUserData();
    getPackageData();
  }, []);

  return (
    <SafeAreaView style={[tw`flex-1`]}>
      <View style={styles.container}>
        <Lottie
          source={require("../assets/img/deco3_1.json")}
          autoPlay
          loop={false}
          style={{
            width: screenWidth,
            top: -120,
            right: -60,
          }}
        />
        <Lottie
          source={require("../assets/img/deco3_2.json")}
          autoPlay
          loop={false}
          style={{
            position: "absolute",
            width: screenWidth,
            top: -150,
            right: -80,
          }}
        />
      </View>
      <Text style={styles.headerText}>Groovy{"\n"}Product</Text>
      <View style={styles.topView}></View>
      <ScrollView style={styles.scrollViewContainer2}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FormCheckCoverage")}
        >
          <View style={[styles.screenContainer]}>
            <View style={[styles.boxContainerCoverage]}>
              <View style={[styles.flexRowCoverage]}>
                <Image
                  style={styles.coverage}
                  source={require("../assets/img/Frame.png")}
                />
                <Text style={styles.coverageText}>
                  Check{"\n"}Coverage Area
                </Text>
                <View style={styles.headerCoverage}></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.header2Text}>Our Product</Text>
        {packageData.map((data) => (
          <ProductBox
            key={data._id}
            packageData={data}
            onPress={() =>
              navigation.navigate("CheckoutProduct", { id: data._id })
            }
          />
        ))}
      </ScrollView>
      <View style={styles.bottomView}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topView: {
    marginTop: -530,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    marginBottom: 90,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scrollViewContainer2: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 25,
    marginTop: 50,
  },
  header2Text: {
    position: "relative",
    alignContent: "flex-start",
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  boxContainerCoverage: {
    backgroundColor: "#F8D344",
    paddingBottom: 16,
    marginBottom: 16,
    width: screenWidth * 0.9,
    borderRadius: 20,
    elevation: 5,
  },
  flexRowCoverage: {
    flexDirection: "row",
    alignItems: "center",
  },
  coverage: {
    top: 10,
    right: 5,
  },
  coverageText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    bottom: 10,
    left: 5,
  },
});
