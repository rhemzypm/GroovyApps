import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";

import parse from "html-react-parser";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarouselCards = () => {
  const navigation = useNavigation();
  const isCarousel = React.useRef(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get("http://andalpost.com/wp-json/wp/v2/posts/?_embed")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    };

    console.log("Post: ", data);

    getPost();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Andalpost", { slug: data.slug })}
    >
      <View style={styles.carousel}>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  carousel: {
    position: "relative",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 40,
  },
});

export default CarouselCards;
