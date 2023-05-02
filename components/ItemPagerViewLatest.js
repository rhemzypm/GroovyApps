import {  Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

const ItemPagerViewLatest = ({ item }) => {
    return (
        <View style={[styles.shadowWrapper]}>
            <View style={styles.pagerLatestItem}>
                <Text style={styles.labelNormal}> item </Text>
            </View>
        </View>
      );
}

export default ItemPagerViewLatest;

 const styles = StyleSheet.create({
    
    shadowWrapper : {
      shadowColor: '#F0F1F3',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 10,
      shadowOpacity: 0.8, 
    },
    pagerLatestItem: {
      elevation: 3,
      borderRadius: 8,
      backgroundColor: '#4599E1',
      padding:8,
      height:120,
      marginRight:16
    },
    labelNormal :{
        fontSize:12,
        color:"#121212"
    },
    labelBoldLarge :{
      fontSize:14,
      color:"#121212",
      fontWeight:"bold"
  },
  labelthin :{
    fontSize:9,
    color:"#121212",    
  },
  btnHome : {
    width:'100%',
    flex:0.5
  },

  btnWhite :{ 
    backgroundColor:'white',
    borderWidth:0.5,
    borderColor:"black",
  },
  btnRed :{ 
    backgroundColor:'#E5131E',
  },
  dotStyle : {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5131E',
    paddingVertical: 0
  },
  inActiondotStyle :{
    backgroundColor: '#ACACAC'
  },
  dotContainerStyle : {
    height : 10,
    paddingVertical: 0,
    marginTop:24,
    marginBottom:16
  },
  pagerWrapper : {
    alignItems:'flex-start',
     justifyContent:'flex-start'
  }


  });