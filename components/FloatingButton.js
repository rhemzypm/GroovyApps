

import React, { useState} from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MessageScreen from "../screens/messages/MessageScreen";
import { useNavigation } from "@react-navigation/native";
const FloatingButton = () => {
  const navigation = useNavigation();
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  return(
    <View style={{
      flex: 1
    }}>
      <Animated.View style={[styles.circle, { bottom: icon_1}]}>
        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
          <FontAwesomeIcon name="comment" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { right: icon_3}]}>
        <TouchableOpacity>
          <FontAwesomeIcon name="envelope" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <FontAwesomeIcon name="question" size={25} color="#FFFF" />
      </TouchableOpacity>
    </View>
  )

}

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
     backgroundColor: '#F79944',
     width: 60,
     height: 60,
     position: 'absolute',
     bottom: 40,
     right: 40,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
  }
})