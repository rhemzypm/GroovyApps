import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BACKEND_URL } from "../backendURL";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

const ProductBox = ({ packageData, onPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.boxContainer}>
      <View style={styles.boxMargin}>
        <View style={styles.imgProfile}>
          {/* <Text style={styles.imgProfileText}>{initialName}</Text> */}
          <Image
            source={{
              uri: `${packageData.packageImage.replace(
                "http://127.0.0.1:5000/v1/ga/",
                BACKEND_URL
              )}`,
            }}
            width={60}
            height={60}
            borderRadius={50}
          />
        </View>
        <View>
          <View style={styles.boxMargin}>
            <Text style={styles.profileText}>{packageData.packageName}</Text>
          </View>
          {/* <View>
            <Text style={styles.profileText3}>{packageType} Broadband Speed</Text>
          </View> */}
        </View>
      </View>
      <View style={styles.text2Wrap}>
        <Text style={styles.profileText2}>
          Rp {packageData.packagePrice} / {packageData.packageType}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 14,
    marginBottom: 4,
  },
  profileText2: {
    color: "#121212",
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: -4,
    fontSize: 14,
  },
  text2Wrap: {
    position: "absolute",
    top: 20,
    right: 12,
  },
  profileText3: {
    // color: "#B1B5B8",
    color: "#121212",
    fontSize: 14,
  },
  boxMargin: {
    flexDirection: "row",
  },
  boxContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    width: screenWidth * 0.9,
    borderRadius: 20,
    elevation: 5,
    position: "relative",
    backgroundColor: "#F8D344",
  },
  button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#D45239",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ProductBox;
