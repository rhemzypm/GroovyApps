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

import ProductBox from "../components/ProductBox";
import ProductDetailsContainer from "../components/ProductDetailsContainer";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProductDetail from "../components/ProductDetail";

// const productData = [
//   {
//     id: 1,
//     initialName: "20",
//     userName: "Personal Plan",
//     price: "69.420",
//     expDate: "20 Mbps",
//     destination: "Home",
//     description: "Ini adalah deskripsi produk yang sangat menarik.",
//   },
// ];

const CheckoutProduct = ({ route, navigation }) => {
  const { id } = route.params;

  const [packageData, setPackageData] = useState([]);

  const getPackageData = async () => {
    const token = await AsyncStorage.getItem("token");

    // code here
    await api
      .get(`/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setPackageData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getPackageData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment Process</Text>
      <View style={styles.productContainer}>
        <View key={packageData._id}>
          <ProductDetailsContainer packageData={packageData} />
          <ProductDetail packageData={packageData} />
          <View style={styles.bottomContainer}>
            <Text style={styles.priceText}>
              Rp {packageData.packagePrice} per{" "}
              {packageData.packageType === "Monthly" ? "month" : "year"}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("PasscodePage")}
            >
              <Text style={styles.buttonText}>Beli</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 25,
    marginTop: 50,
  },
  productContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutProduct;
