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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ServiceBox from "../../components/services/ServiceBox";
import { PulsaData } from "../../components/services/PulsaData";

const screenWidth = Dimensions.get("window").width;

export default function Pulsa() {
  const { top } = useSafeAreaInsets();
  const token = AsyncStorage.getItem("token");

  return (
    <SafeAreaView style={[tw`flex-1`]}>
          <Text style={styles.headerText}>Pulsa</Text>
          <View style={styles.topView}>
          </View>
          <ScrollView style={styles.scrollViewContainer2}>
            {PulsaData.map((data) => (
            <ServiceBox
              key={data.id}
              initialName={data.initialName}
              Brand={data.Brand}
              Min={data.Min}
              Discount={data.Discount}
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