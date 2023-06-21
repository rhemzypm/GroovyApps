import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselPromoItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "./CarouselPromoItem";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import data2 from "./data2";

const CarouselPromo = () => {
  const isCarousel = React.useRef(null);

  const [promoData, setPromoData] = useState([]);

  const getPromo = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await api
        .get("/promos/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setPromoData(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    getPromo();
  }, []);

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={promoData}
        renderItem={CarouselPromoItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  );
};

export default CarouselPromo;
