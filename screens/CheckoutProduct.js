import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ProductBox from "../components/ProductBox";
import ProductDetailsContainer from "../components/ProductDetailsContainer";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const productData = [
  {
    id: 1,
    initialName: "20",
    userName: "Personal Plan",
    price: "69.420",
    expDate: "20 Mbps",
    destination: "Home",
  },
];

const CheckoutProduct = () => {
  // const [productData, setProductData] = useState([]);

  const handleBuy = () => {
    // Implementasikan logika pembelian sesuai dengan kebutuhan Anda
    // Misalnya, lakukan integrasi dengan sistem pembayaran atau lanjutkan ke halaman pembayaran

    // Tampilkan pesan atau aksi setelah pembelian berhasil
    console.log("Pembelian berhasil");
  };

  // const getProductData = async () => {
  //   const token = await AsyncStorage.getItem("token");
  // };

  useEffect(() => {
    // getProductData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Groovy{"\n"}Product</Text>
      {productData.map((data) => (
        <ProductDetailsContainer
          key={data.id}
          initialName={data.initialName}
          userName={data.userName}
          price={data.price}
          expDate={data.expDate}
          destination={data.destination}
        />
      ))}
      <Button title="Beli" onPress={handleBuy} />
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
    position: "relative",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 25,
    marginTop: 50,
  },
});

export default CheckoutProduct;
