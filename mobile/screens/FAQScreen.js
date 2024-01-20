import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import AccordionItem from "../components/AccordionItem";
import FloatingButton from "../components/FloatingButton";

import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAQScreen = () => {
  const { top } = useSafeAreaInsets();

  const [faqData, setFaqData] = useState([]);

  const getFaqData = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await api
        .get("/faqs/", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res.data);

          setFaqData(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    getFaqData();
  }, []);

  return (
    <SafeAreaView style={[tw`flex-1`, { paddingTop: top }]}>
      <View style={tw`mt-10 p-6 absolute`}>
        <Text style={tw`text-4xl font-bold mb-10`}>Help Center</Text>
        <Text style={tw`text-xl font-bold`}>FAQs</Text>
      </View>
      <View style={styles.topView}></View>
      <ScrollView>
        <View style={tw`mb-2 p-6 flex-1`}>
          {faqData.map((faq, index) => (
            <AccordionItem
              key={faq._id}
              title={faq.faqTitle}
              content={faq.faqContent}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomView}></View>
      <View style={[tw`absolute`, { bottom: 90, right: -10 }]}>
        <FloatingButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    marginTop: 120,
    height: 10,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    marginBottom: 90,
    height: 10,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FAQScreen;
