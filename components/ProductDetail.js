import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetail = (id) => {
  // Data deskripsi produk
  const [data, setData] = useState([]);

  const productDescription =
    "Introducing our premium broadband service offering fast and reliable internet access for up to 4 devices. \nWith speeds of 10 Mbps, expandable to 20 Mbps annually, enjoy seamless streaming,gaming, and browsing.\nBenefit from a static IP address, 24/7 support, Wi-Fi access point, and a convenient ticketing system. \nGet started with a one-time installation fee of Rp 499,500 and a one-month deposit, \nAll taxes included for transparent pricing.\n";
  const productTittle = "Level 1 Personal";

  const getProductDetail = async (id) => {
    const token = await AsyncStorage.getItem("token");

    // code here
    if (token) {
      await api
        .get(`/packages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);

          setData(res.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  const ProductDescription = ({ tittle, description }) => {
    const paragraphs = description.split("\n");

    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{tittle}</Text>
        {paragraphs.map((paragraph, index) => (
          <Text style={styles.descriptionText} key={index}>
            {paragraph}
          </Text>
        ))}
      </View>
    );
  };

  useEffect(() => {
    // getProductDetail();
  }, []);

  return (
    <View style={styles.container}>
      <ProductDescription
        tittle={productTittle}
        description={productDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 8,
    marginTop: -15,
  },
  descriptionContainer: {
    padding: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 10,
    textAlign: "justify",
  },
});

export default ProductDetail;
