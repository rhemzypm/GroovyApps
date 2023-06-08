import React from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

const ServiceBox = ({ initialName, Brand, Min, Discount, destination }) => {
  const navigation = useNavigation();

  const navigateToScreen = () => {
    navigation.navigate(destination);
  };

  return (
    <View style={styles.boxContainer}>
      <View style={styles.boxMargin}>
        <View style={styles.imgProfile}>
          <Text style={styles.imgProfileText}>{initialName}</Text>
        </View>
        <View>
          <View style={styles.boxMargin}>
            <Text style={styles.profileText}>{Brand}</Text>
          </View>
          <View>
            <Text style={styles.profileText3}>{Discount} </Text>
            <Text style={styles.profileText3}>{Min} </Text>
          </View>
          </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={navigateToScreen}>
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
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ServiceBox;
