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
import ProductBox from "../components/ProductBox";

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

  const productData = [
    {
      id: 1,
      initialName: "20",
      userName: "Personal Plan",
      price: "69.420",
      expDate: "20 Mbps",
      destination: "Home",
    },
    {
      id: 2,
      initialName: "150",
      userName: "Business Plan",
      price: "123.45",
      expDate: "150 Mbps",
      destination: "Point",
    },
    {
      id: 3,
      initialName: "150",
      userName: "Business Plan",
      price: "123.45",
      expDate: "150 Mbps",
      destination: "Point",
    },
    {
      id: 4,
      initialName: "150",
      userName: "Business Plan",
      price: "123.45",
      expDate: "150 Mbps",
      destination: "Point",
    },
    {
      id: 5,
      initialName: "150",
      userName: "Business Plan",
      price: "123.45",
      expDate: "150 Mbps",
      destination: "Point",
    },
    // Add more objects for additional product data
  ];

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
              <View style={[styles.boxContainerCoverage]}>
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
            {productData.map((data) => (
            <ProductBox
              key={data.id}
              initialName={data.initialName}
              userName={data.userName}
              price={data.price}
              expDate={data.expDate}
              destination={data.destination}
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