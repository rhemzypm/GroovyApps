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
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";

import ServiceBox from "../../components/services/ServiceBox";
import { FoodData } from "../../components/services/FoodData";

const screenWidth = Dimensions.get("window").width;

import api from "../../api";

export default function Food() {
  const { top } = useSafeAreaInsets();

  // const [data, setData] = useState([]);

  // const getVouchers = async () => {
  // const token = await AsyncStorage.getItem("token");

  //   await api
  //     .get("/vouchers/", { headers: { Authorization: `Bearer ${token}` } })
  //     .then((res) => {
  //       console.log(res.data);

  //       setData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, err.message);
  //     });
  // };

  useEffect(() => {
    // getVouchers();
  }, []);

  return (
    <SafeAreaView style={[tw`flex-1`]}>
          <Text style={styles.headerText}>Food & Beverage</Text>
          <View style={styles.topView}>
          </View>
          <ScrollView style={styles.scrollViewContainer2}>
            {FoodData.map((data) => (
            <ServiceBox
              key={data.id}
              initialName={data.initialName}
              Brand={data.Brand}
              Min={data.Min}
              Discount={data.Discount}
              destination={data.destination}
              description={data.description}
              id={data.id}
              deadline={data.deadline}
              GPoint={data.GPoint}
            />
            ))}
            
            </ScrollView>
            <View style={styles.bottomView}></View>
      </SafeAreaView>
      );
    }

const styles = StyleSheet.create({
  topView: {
    // marginTop: 30,
    // height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    // marginBottom: 90,
    // height: 10,
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
    position: "relative",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 25,
    marginVertical: 25,
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