import { StyleSheet, FlatList, Text, View, Image, Dimensions, StatusBar } from 'react-native'
import React, {Component} from 'react'
import logo from '../assets/img/logo.png'
import Lottie from "lottie-react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import ServiceButton from '../components/ServiceButton';

const {height, width} = Dimensions.get('window');

const buttons = [
    { id: '1', label: 'Button 1', imageSource: logo },
    { id: '2', label: 'Button 2', imageSource: logo },
    { id: '3', label: 'Button 3', imageSource: logo },
    { id: '4', label: 'Button 4', imageSource: logo },
    { id: '5', label: 'Button 5', imageSource: logo },
    { id: '6', label: 'Button 6', imageSource: logo },
    { id: '7', label: 'Button 7', imageSource: logo },
    // Add more buttons with different image sources
  ];

  const renderItem = ({ item }) => (
    <View style={styles.buttonWrapper}>
    <ServiceButton
    label={item.label}
    imageSource={item.imageSource}
    onPress={() => console.log(item.label)}
    />
    </View>
  );

export default function PointScreen() {
  return (
    <View>
    <Lottie
          source={require("../assets/img/deco3_1.json")}
          autoPlay
          loop={false}
          style={{
            width: width,
            top: -120,
            right: -60,
          }}
        />
        <Lottie
          source={require("../assets/img/deco3_2.json")}
          autoPlay
          loop={false}
          style={{
            position: "absolute",
            width: width,
            top: -150,


            right: -80,
          }}
          />
    <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"/>
    <Text style={styles.headText}>Groovy Point</Text>
    <View style={styles.wrapContainer}>
      <View style={styles.headWrapper}>
        <Text style={styles.wrapText}>Available Points</Text>
        <View style={styles.pointWrapper}>
          <Text style={styles.coinText}>16800</Text>
          <Text style={styles.poinText}>points</Text>
        </View>
        <Lottie
        source={require("../assets/img/coin.json")}
        autoPlay
        loop={false}
        style={{
          position: "absolute",
          right: -130,
          top: -10,
        }}
        />
      </View>
    </View>
    <Text style={styles.serviceText}>Groovy Point Services</Text>
    <View style={styles.serviceWrapper}>
      <View style={styles.contentContainer}>
        <FlatList
          data={buttons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    </View>
    </View>
    )
  }
  // <Image style={styles.logo} source={logo}/>

const styles = StyleSheet.create({
  logo:{
    position: 'relative',
    height: 60, 
    width: 60,
  },
  headText:{
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    top: 70,
    color: 'black',
  },
  coinText: {
  fontSize: 35,
  marginRight: 10,
  color: 'black',
},
poinText: {
  fontSize: 20,
  color: 'black',
},
pointWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
  marginBottom: 20,  
  marginTop: 50,
},
serviceText:{
    fontSize: 20,
    position: 'relative',
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    marginVertical: 20,
    color: 'black',
    fontWeight: '500',
  },
  serviceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 25,
  marginBottom: 20,  
},
  wrapText:{
    fontSize: 20,
    position: 'absolute',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    top: 15,
    color: 'black',
  },
  wrapContainer:{
    marginTop:-350,
  },
  headWrapper:{
    marginHorizontal:25,
    height: 120,
    // marginTop: -260, 
    marginBottom: 20,
    backgroundColor: '#F8D344',
    elevation: 5,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
})