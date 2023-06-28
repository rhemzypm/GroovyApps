import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BACKEND_URL } from "../../backendURL";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

const ServiceBox = ({ voucherData, onPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.boxContainer}>
      <View style={styles.boxMargin}>
        <View style={styles.imgProfile}>
          {/* <Text style={styles.imgProfileText}>{voucherData.initialName}</Text> */}

          <Image
            source={{
              uri: `${voucherData.voucherImage.replace(
                "http://127.0.0.1:5000/v1/ga/",
                BACKEND_URL
              )}`,
            }}
            width={170}
            height={100}
            borderRadius={10}
          />
        </View>
        <View>
          <View style={styles.boxMargin}>
            <Text style={styles.profileText}>{voucherData.voucherTitle}</Text>
          </View>
          {/* <View>
            <Text style={styles.profileText3}>{Discount} </Text>
            <Text style={styles.profileText3}>{Min} </Text>
          </View> */}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imgProfile: {
    width: 170,
    height: 100,
    borderRadius: 10,
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
    backgroundColor: "#D45239",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#F8D344",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ServiceBox;
