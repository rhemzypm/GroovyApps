import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import Lottie from "lottie-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

export default function ProductScreen() {
  const { top } = useSafeAreaInsets();
  const token = AsyncStorage.getItem("token");

  const [imgDashboard, setImgDashboard] = useState(
    require("../assets/img/head.png")
  );

  const [imgLogo, setImgLogo] = useState(
    require("../assets/img/G-Point-3.png")
  );

  const [notification, setNotification] = useState(100);

  const [initialName, setInitialName] = useState("TP");
  const [userName, setUserName] = useState("Rhemzy");
  const [balance, setBalance] = useState("69.420");
  const [point, setPoint] = useState("60 Points");
  const [expDate, setExpDate] = useState("28/04/2022");

  // const [userData, setUserData] = useState([]);
  // const [packageData, setPackageData] = useState([]);

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

  // get product
  // const getProductData = async () => {
  //   await axios
  //     .get("http://10.10.28.121:5000/v1/ga/packages/", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setPackageData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, err.message);
  //     });
  // }

  // useEffect(() => {
  //   getUserData();
  //   getPackageData();
  // }, []);

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
      <Text style={styles.headerText}>Nusa Solution{"\n"}Product</Text>
      <ScrollView style={styles.scrollViewContainer2}>
        <View style={[styles.screenContainer]}>
          <View style={[styles.boxContainer]}>
            <View style={[styles.flexRow, styles.boxMargin]}>
              <View style={styles.imgProfile}>
                <Text style={styles.imgProfileText}>{initialName}</Text>
              </View>
              <View style={styles.headerCoverage}>
                <Text style={styles.profileText}>{userName}</Text>
                <Text style={styles.profileText2}>{balance}</Text>
                <Text style={styles.profileText3}> {expDate}</Text>
              </View>
            </View>
          </View>
        {/* </View> */}
        <Text style={styles.header2Text}>Our Product</Text>
        {/* <View style={[styles.screenContainer]}> */}
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
  
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    top: 1,
  },
  scrollViewContainer2: {
    flex: 0,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  homeHeaderContainer: {
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    alignItems: "center",
    top: 0,
  },
  headerText: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 50,
  },
  header2Text: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "normal",
    color: "black",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 280,
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
    width: screenWidth * 0.9,
    borderRadius: 20,
  },
  headerCoverage: {
    top: 5,
  },
  flexRow: {
    flexDirection: "row",
  },
});
