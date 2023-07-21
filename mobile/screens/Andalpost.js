import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import parse from "html-react-parser";

import { FontAwesome } from "@expo/vector-icons";

import axios from "axios";

const Andalpost = ({ route, navigation }) => {
  const { slug } = route.params;

  const [data, setData] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    image:
      "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png",
  });

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`http://andalpost.com/wp-json/wp/v2/posts/?_embed&slug=${slug}`)
        .then((res) => {
          const data = res.data[0];

          setData({
            title: data.title.rendered,
            author: data.yoast_head_json.author,
            description: data.yoast_head_json.description,
            content: data.excerpt.rendered,
            image:
              data._embedded["wp:featuredmedia"][0].media_details.sizes.medium
                .source_url,
          });
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    };
    getPost();
  }, []);

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <FontAwesome
          name="chevron-left"
          style={styles.backIcon}
          testID="backIcon"
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Image source={{ uri: data.image }} style={styles.image} />
        <Text style={styles.title}>{parse(data.title)}</Text>
        <Text style={styles.author}>By {data.author}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.content}>{data.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    fontSize: 20,
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
    color: "#888",
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Andalpost;
