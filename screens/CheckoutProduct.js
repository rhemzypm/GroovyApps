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
import { useSafeAreaInsets, useNavigation } from "@react-navigation/native";
import ProductDetailsContainer from "../components/ProductDetailsContainer";
import ProductDetail from "../components/ProductDetail";

const productData = [
  {
    id: 1,
    initialName: "20",
    userName: "Personal Plan",
    price: "69.420",
    expDate: "20 Mbps",
    destination: "Home",
    description: "Ini adalah deskripsi produk yang sangat menarik.",
  },
];

const CheckoutProduct = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment Process</Text>
      <View style={styles.productContainer}>
        {productData.map((data) => (
          <View key={data.id}>
            <ProductDetailsContainer
              initialName={data.initialName}
              userName={data.userName}
              price={data.price}
              expDate={data.expDate}
              destination={data.destination}
            />
            <ProductDetail description={data.description} />
            <View style={styles.bottomContainer}>
              <Text style={styles.priceText}>Rp 298.590 per month</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("PasscodePage")}
              >
                <Text style={styles.buttonText}>Beli</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
