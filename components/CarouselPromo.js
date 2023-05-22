import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselPromoItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselPromoItem'
import data2 from './data2'

const CarouselPromo = () => {
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data2}
        renderItem={CarouselPromoItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  )
}


export default CarouselPromo