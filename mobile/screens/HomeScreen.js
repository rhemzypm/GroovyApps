import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Lottie from "lottie-react-native";
import tw from "tailwind-react-native-classnames";

import CarouselCards from "../components/CarouselCards";
import CarouselPromo from "../components/CarouselPromo";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

// formatting date
const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "numeric", year: "numeric" };

  return date.toLocaleString("id-ID", options);
};

export default function Home() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const [imgDashboard, setImgDashboard] = useState(
    require("../assets/img/head.png")
  );

  const [imgLogo, setImgLogo] = useState(
    require("../assets/img/G-Point-3.png")
  );

  const [initialName, setInitialName] = useState("RZ");
  // const [text, setText] = useState("Your Groovy Subscription Status");
  // const [balance, setBalance] = useState("Groovy Paket Hemat");
  // const [point, setPoint] = useState("60");
  // const [expDate, setExpDate] = useState("Next Payment : 09/10/2023");

  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);

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

  // get user current package
  const getUserPackage = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await api
        .get("/users/packages", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    getUserData();
    getUserPackage();
  }, []);

  return (
    <SafeAreaView style={[tw`flex-1`]}>
      <View style={styles.container}>
        <Lottie
          source={require("../assets/img/headvg1.json")}
          autoPlay
          loop={false}
          style={{
            width: screenWidth,
            top: -15,
          }}
        />
        <Lottie
          source={require("../assets/img/headvg2.json")}
          autoPlay
          loop={false}
          style={{
            position: "absolute",
            width: screenWidth,
            top: -90,
            right: -90,
          }}
        />
      </View>
      <View style={styles.homeHeaderContainer}>
        <Text style={styles.headerText}>Welcome, {userData.firstName}</Text>
        <Image resizeMode="cover" style={styles.imgLogo} source={imgLogo} />
        <Text style={styles.point}>{userData.point} Points</Text>
      </View>
      <View style={styles.topView}></View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={[styles.screenContainer]}>
          <View style={[styles.boxContainer]}>
            <View style={[styles.flexRow, styles.boxMargin]}>
              <View style={styles.imgProfile}>
                <Text style={styles.imgProfileText}>{initialName}</Text>
              </View>
              <View>
                <Text style={styles.profileText}>
                  Your Groovy Subscription Status
                </Text>
                <Text style={styles.profileText2}>No purchased packages</Text>
                <Text style={styles.profileText3}>
                  You haven't purchased any subscriptions yet
                </Text>
              </View>

              {/* {data === null ? (
                <View>
                  <Text style={styles.profileText}>
                    Your Groovy Subscription Status
                  </Text>
                  <Text style={styles.profileText2}>No purchased packages</Text>
                  <Text style={styles.profileText3}>
                    You haven't purchased any subscriptions yet
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.profileText}>
                    Your Groovy Subscription Status
                  </Text>
                  <Text style={styles.profileText2}>{data.packageName}</Text>
                  <Text style={styles.profileText3}>
                    Next payment: {data.packageNextPayment}
                  </Text>
                </View>
              )} */}
            </View>
          </View>
        </View>
        <View style={styles.andalContainer}>
          <Text style={styles.andalText}>The Andal Post </Text>
        </View>
        <CarouselCards />
        <View style={styles.PromoContainer}>
          <Text style={styles.PromoText}>What's New ?</Text>
        </View>
        <CarouselPromo />
        <View></View>
      </ScrollView>
      <View style={styles.bottomView}></View>
    </SafeAreaView>
  );
}

// <View style={styles.PromoContainer}>
// <Text style={styles.PromoText}> Promo </Text>
// </View>

const styles = StyleSheet.create({
  carousel: {
    position: "relative",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carousel2: {
    position: "relative",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    // top: 20,
    top: 80,
  },
  screenContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  homeHeaderContainer: {
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    alignItems: "center",
    // top: -30,
    top: 50,
  },
  andalContainer: {
    marginHorizontal: 25,
    marginVertical: 25,
  },
  PromoContainer: {
    marginHorizontal: 25,
    marginVertical: 25,
  },
  headerText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    bottom: 15,
  },
  andalText: {
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  PromoText: {
    position: "relative",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  point: {
    top: 35,
    marginLeft: 16,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  imgLogo: {
    top: 35,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  imgProfile: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#ACACAC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  imgProfileText: {
    color: "white",
  },
  profileText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 4,
  },
  profileText2: {
    color: "#121212",
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 14,
  },
  profileText3: {
    color: "#B1B5B8",
    fontSize: 10,
  },
  boxMargin: {
    padding: 16,
  },
  boxContainer: {
    backgroundColor: "white",
    marginBottom: 16,
    width: ITEM_WIDTH,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4.84,
    elevation: 10,
  },
  flexRow: {
    flexDirection: "row",
  },
  andalpostContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  andalpost: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 16,
    left: 24,
    bottom: 20,
  },
  topView: {
    // marginTop: 30,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    marginBottom: 150,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
