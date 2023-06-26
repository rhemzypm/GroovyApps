import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

import parse from "html-react-parser";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index.id}>
      <Image
        source={{
          uri: item._embedded["wp:featuredmedia"][0].media_details.source_url,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.header} numberOfLines={1}>
        {parse(item.title.rendered)}
      </Text>
      <Text style={styles.body} numberOfLines={2}>
        {item.yoast_head_json.description}
      </Text>
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
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 5,
  },
  body: {
    color: "#222",
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
