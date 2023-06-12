import React from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { TokenData } from "../../../components/services/TokenData";
import { PulsaData } from "../../../components/services/PulsaData";
import { FoodData } from "../../../components/services/FoodData";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';

const screenWidth = Dimensions.get("window").width;

const RewardDetail = ({ route }) => {
  // Extract the id from route params
  const { id } = route.params;
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.navigate('ServiceNavigator');
  };

  // Determine the data source based on the ID prefix
  const dataPrefix = id.toString().charAt(0);
  let selectedItem;

  if (dataPrefix === '1') {
    selectedItem = TokenData.find((item) => item.id === id);
  } else if (dataPrefix === '2') {
    selectedItem = PulsaData.find((item) => item.id === id);
  } else if (dataPrefix === '3') {
    selectedItem = FoodData.find((item) => item.id === id);
  }

  if (!selectedItem) {
    // Handle the case when no item is found
    return (
      <View>
        <Text>No item found for ID: {id}</Text>
      </View>
    );
  }

  // Access the properties of the selected item
  const { initialName, Brand, Min, Discount, description, deadline, GPoint } = selectedItem;

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity onPress={handleBackButton}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Reward Details</Text>
      <View style={styles.detail}>
        <View style={styles.imgProfile}>
          <Text style={styles.imgProfileText}>{initialName}</Text>
        </View>
        <Text style={styles.title}>{Brand} {Min}</Text>
        <Text style={styles.date}>Valid Until {deadline}</Text>
        <View style={styles.line}></View>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.text}>{GPoint} Groovy Point</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Redeem')}>
        <Text style={styles.buttonText}>Redeem</Text>
      </TouchableOpacity>
      <View style={styles.lottie}>
        <Lottie 
          source={require('../../../assets/img/rewardecor.json')} 
          autoPlay
          loop={false}
          style={{}} 
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  lottie: {
    position: "absolute",
    left: -15,
    bottom: 30,
    width: 180,
    height: 450,
  },
  detail:{
    width: screenWidth * 0.85,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  header:{
    fontSize: 25,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  imgProfile: {
    width: screenWidth * 0.85,
    height: 170,
    borderRadius: 10,
    backgroundColor: "#ACACAC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
    imgProfileText: {
    color: "white",
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "light",
    color: "#7f7f7f",
  },
  desc: {
    fontSize: 15,
    marginBottom: 50,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#D45239",
    width: "100%",
    marginBottom: 10,
  },
  back:{
    position: "absolute",
    top: 5,
    left: 25,
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#F8D344",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
};

export default RewardDetail;
