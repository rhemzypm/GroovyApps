import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

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

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Andalpost", { slug: item.slug })}
      >
        <View style={styles.container} key={index.id}>
          <Image
            source={{
              uri: item._embedded["wp:featuredmedia"][0].media_details.sizes
                .medium.source_url,
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.carousel}>
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
        <Text style={styles.header3Text}>Fetching posts...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    position: "relative",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 40,
  },
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

export default CarouselCards;
