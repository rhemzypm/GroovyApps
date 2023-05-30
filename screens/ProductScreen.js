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
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

export default function ProductScreen() {
  const { top } = useSafeAreaInsets();
  const token = AsyncStorage.getItem("token");
  const navigation = useNavigation();
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
  //   await api
  //     .get("/users/me", {
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
  //   await api
  //     .get("/packages/", {
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
          <Text style={styles.headerText}>Groovy{"\n"}Product</Text>
          <View style={styles.topView}>
          </View>
          <ScrollView style={styles.scrollViewContainer2}>
            <TouchableOpacity onPress={()=> navigation.navigate("FormCheckCoverage")}>
            <View style={[styles.screenContainer]}>
              <View style={[styles.boxContainer]}>
                <View style={[styles.flexRowCoverage]}>
                  <Image style={styles.coverage} source={require("../assets/img/Frame.png")}/>
                  <Text style= {styles.coverageText}>Check{"\n"}Coverage Area</Text>
                  <View style={styles.headerCoverage}>
                  </View>
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <Text style={styles.header2Text}>Our Product</Text>
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
              {/*ini batas per container product list*/}
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
  scrollViewContainer: {
    top: 1,
  },
  scrollViewContainer2: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  homeHeaderContainer: {
    flexDirection: "row",
    marginHorizontal: 25,
    alignItems: "center",
    top: 0,
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
    elevation: 5,
  },
  headerCoverage: {
    top: 5,
  },
  flexRow: {
    flexDirection: "row",
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
  flexRowCoverage : {
    flexDirection: "row",
    alignItems: 'center',
  },
});
