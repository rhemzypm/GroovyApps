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
import Lottie from "lottie-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import CarouselCards from "../components/CarouselCards";
import head1 from "../assets/img/headvg1.json";
import head2 from "../assets/img/headvg2.json";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

export default function Home() {
  const { top } = useSafeAreaInsets();

  const token = AsyncStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [point, setPoint] = useState("60");
  const [imgDashboard, setImgDashboard] = useState(
    require("../assets/img/head.png")
  );
  const [imgLogo, setImgLogo] = useState(
    require("../assets/img/G-Point-3.png")
  );
  const [initialName, setInitialName] = useState("TP");
  const [userName, setUserName] = useState("Rhemzy");
  const [balance, setBalance] = useState("69.420");
  const [expDate, setExpDate] = useState("28/04/2022");

  // const [userData, setUserData] = useState([]);

  // get user data
  // const getUserData = async () => {
  //   await axios
  //     .get("http://10.10.28.121:5000/v1/ga/users/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setUserData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, err.message);
  //     });
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);

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
        <Text style={styles.headerText}>Welcome, Rhemzy</Text>
        <Image resizeMode="cover" style={styles.imgLogo} source={imgLogo} />
        <Text style={styles.point}>{point} Points</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={[styles.screenContainer]}>
          <View style={[styles.boxContainer]}>
            <View style={[styles.flexRow, styles.boxMargin]}>
              <View style={styles.imgProfile}>
                <Text style={styles.imgProfileText}>{initialName}</Text>
              </View>
              <View>
                <Text style={styles.profileText}>{userName}</Text>
                <Text style={styles.profileText2}>Rp {balance}</Text>
                <Text style={styles.profileText3}>Active Until {expDate}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.andalContainer}>
          <Text style={styles.andalText}> The Andal Post </Text>
        </View>
        <View style={styles.carousel}>
          <CarouselCards />
        </View>
        <Text> Promo </Text>
        <View style={styles.PromoContainer}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 40,
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    top: -230,
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
    top: -260,
  }, 
  andalContainer: {
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
  },  
  headerText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  andalText: {
    position: "absolute",
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
    paddingBottom: 16,
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
});
