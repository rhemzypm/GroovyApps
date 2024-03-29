import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

import { BACKEND_URL } from "../backendURL";

const CarouselPromoItem = ({ item }) => {
  return (
    <View style={styles.container} key={item._id}>
      <Image
        source={{ uri: `${BACKEND_URL}${item.promoImage}` }}
        style={styles.image}
      />
      <Text style={styles.header}>{item.promoTitle}</Text>
      <Text style={styles.body}>{item.promoContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", //ini background color punya what's new
    borderRadius: 10,
    width: ITEM_WIDTH,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: ITEM_WIDTH,
    height: 150,
  },
  header: {
    color: "#222",
    fontSize: 26,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 5,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselPromoItem;
