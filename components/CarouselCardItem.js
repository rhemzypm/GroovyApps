import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

// const uri = "http://10.10.28.139:5000/v1/ga/";

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.postImage }} style={styles.image} />
      <Text style={styles.header}>{item.postTitle}</Text>
      <Text style={styles.body}>{item.postDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: ITEM_WIDTH,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
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
    paddingRight: 20,
  },
});

export default CarouselCardItem;