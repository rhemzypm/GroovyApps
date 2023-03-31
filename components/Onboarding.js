import { StyleSheet, Text, View, FlatList, Animated, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import slides from '../slides';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={styles.container}>
    <Image style={styles.decor} source={require("../assets/img/decor.png")} />
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
          }}
          ref={slidesRef}
        />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    decor: {
     position: 'absolute',
     left: -9,
     top: 0,
     width: 180,
     height: 200,
     resizeMode: 'contain',
    },
});
