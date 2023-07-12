import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductDetail = ({ packageData }) => {
  const ProductDescription = ({ packageName, packageDescription }) => {
    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{packageName}</Text>
        <Text style={styles.descriptionText}>{packageDescription}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ProductDescription
        packageName={packageData.packageName}
        packageDescription={packageData.packageDescription}
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
