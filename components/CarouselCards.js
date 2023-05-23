import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import data from "./data";

const CarouselCards = () => {
  const isCarousel = React.useRef(null);

  // const [data, setData] = useState([]);

  // const getPost = async () => {
  //   const token = await AsyncStorage.getItem("token");

  //   if (token) {
  //     await api
  //       .get("/posts/", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         setData(res.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err, err.message);
  //       });
  //   }
  // };

  useEffect(() => {
    // getPost();
  }, []);

  return (
    <View>
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
  );
};

export default CarouselCards;
