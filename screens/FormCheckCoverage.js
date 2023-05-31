import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormCheckCoverage = () => {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [nomorHP, setNomorHP] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("Product");
  };

  const handleFormSubmit = async () => {
    // const token = await AsyncStorage.getItem("token");

    console.log("Data Form:");
    console.log("Lokasi:", location);
    console.log("Nama:", name);
    console.log("Nomor Telepon:", nomorHP);
    console.log("Alamat:", detailedAddress);

    // await api
    //   .post(
    //     "/installations/",
    //     {
    //       location,
    //       name,
    //       nomorHP,
    //       detailedAddress,
    //     },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err, err.message);
    //   });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <FontAwesome
          name="chevron-left"
          style={styles.backIcon}
          testID="backIcon"
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>Enter Installation{"\n"}Address</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Lokasi"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.inputContainer}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Nama"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputContainer}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Alamat"
          value={detailedAddress}
          onChangeText={(text) => setDetailedAddress(text)}
          style={styles.inputContainer}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Nomor Telepon"
          value={nomorHP}
          onChangeText={(text) => setNomorHP(text)}
          style={styles.inputContainer}
        />
      </View>
      <TouchableOpacity style={[styles.confirmButton, styles.shadow]} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginTop: 50,
    marginHorizontal: 10,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15,
  },
  inputWrapper: {
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    width: "100%",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backIcon: {
    fontSize: 25,
    color: "#AFB1B6",
  },
  confirmButton: {
    backgroundColor: '#F2C94C',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default FormCheckCoverage;
