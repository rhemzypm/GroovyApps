import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import Carousel from "react-native-snap-carousel";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

import api from "../api";
import { BACKEND_URL } from "../backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarouselPromo = () => {
  const isCarousel = React.useRef(null);

  const [data, setData] = useState([]);

  const getPromo = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await api
        .get("/promos/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    getPromo();
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.container} key={item._id}>
        <Image
          source={{
            uri: `${item.promoImage.replace(
              "http://127.0.0.1:5000/v1/ga/",
              BACKEND_URL
            )}`,
          }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.promoTitle}</Text>
        <Text style={styles.body}>{item.promoContent}</Text>
      </View>
    );
  };

  return (
    <View>
      {data.length > 0 ? (
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      ) : (
        <Text style={styles.header3Text}>No promos are fetched.</Text>
      )}
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
  header3Text: {
    position: "relative",
    alignContent: "flex-start",
    fontSize: 15,
    fontWeight: 500,
    color: "black",
    marginHorizontal: 25,
    marginBottom: 10,
  },
});

export default CarouselPromo;
