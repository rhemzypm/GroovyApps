import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import logo from "../assets/img/logo.png";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ServiceButton from "../components/ServiceButton";
import CarouselCards from "../components/CarouselCards";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const buttons = [
  { id: "1", label: "Token", imageSource: logo },
  { id: "2", label: "Pulsa", imageSource: logo },
  { id: "3", label: "Food", imageSource: logo },
  { id: "4", label: "More", imageSource: logo },
  // Add more buttons with different image sources
];

export default function PointScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const getPointCategory = async () => {
    const token = await AsyncStorage.getItem("token");

    // code
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.buttonWrapper]}>
      <ServiceButton
        label={item.label}
        imageSource={item.imageSource}
        onPress={() =>
          navigation.navigate("ServiceNavigator", { screen: item.label })
        }
      />
    </View>
  );

  useEffect(() => {
    // getPointCategory();
  }, []);

  return (
    <View>
      <Lottie
        source={require("../assets/img/deco3_1.json")}
        autoPlay
        loop={false}
        style={{
          width: width,
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
          width: width,
          top: -150,
          right: -80,
        }}
      />
      <Text style={styles.headText}>Groovy Point</Text>
      <View style={styles.wrapContainer}>
        <View style={styles.headWrapper}>
          <Text style={styles.wrapText}>Available Points</Text>
          <View style={styles.pointWrapper}>
            <Text style={styles.coinText}>16800</Text>
            <Text style={styles.poinText}>points</Text>
          </View>
          <Lottie
            source={require("../assets/img/coin.json")}
            autoPlay
            loop={false}
            style={{
              position: "absolute",
              right: -130,
              top: -10,
            }}
          />
        </View>
      </View>
      <Text style={styles.serviceText}>Groovy Point Services</Text>
      <View style={styles.serviceWrapper}>
        <View style={styles.contentContainer}>
          <FlatList
            data={buttons}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        </View>
      </View>
      <Text style={styles.serviceText}>New Promos</Text>
      <CarouselCards />
    </View>
  );
}
// <Image style={styles.logo} source={logo}/>

const styles = StyleSheet.create({
  logo: {
    position: "relative",
    height: 60,
    width: 60,
  },
  headText: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    alignSelf: "flex-start",
    marginHorizontal: 25,
    top: 70,
    color: "black",
  },
  coinText: {
    fontSize: 35,
    marginRight: 10,
    color: "black",
  },
  poinText: {
    fontSize: 20,
    color: "black",
  },
  pointWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 50,
  },
  serviceText: {
    fontSize: 20,
    position: "relative",
    alignSelf: "flex-start",
    marginHorizontal: 25,
    marginVertical: 20,
    color: "black",
    fontWeight: "500",
  },
  serviceWrapper: {
    flexDirection: "row",
    // backgroundColor: 'black',
  },
  wrapText: {
    fontSize: 20,
    position: "absolute",
    alignSelf: "flex-start",
    marginHorizontal: 20,
    top: 15,
    color: "black",
  },
  wrapContainer: {
    marginTop: -350,
  },
  headWrapper: {
    marginHorizontal: 25,
    height: 120,
    // marginTop: -260,
    marginBottom: 20,
    backgroundColor: "#F8D344",
    elevation: 5,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: 'red',
    marginHorizontal: 25,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemSeparator: {
    width: "100%",
    height: 20,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
});
