import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image
} from 'react-native';
import Lottie from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

export default function ProductScreen() {
  const { top } = useSafeAreaInsets();

  const [point, setPoint] = useState('60 Points');
  const [imgDashboard, setImgDashboard] = useState(
    require('../assets/img/head.png')
  );
  const [imgLogo, setImgLogo] = useState(
    require('../assets/img/G-Point-3.png')
  );
  const [notification, setNotification] = useState(100);
  const [initialName, setInitialName] = useState('TP');
  const [userName, setUserName] = useState('Rhemzy');
  const [balance, setBalance] = useState('69.420');
  const [expDate, setExpDate] = useState('28/04/2022');
  const [currentPackage, setCurrentPackage] = useState([
    { id: 1, title: 'Internet', amount: '14,46 MB', date: '22/06/2021' },
    { id: 2, title: 'Multimedia', amount: '949,74 MB', date: '22/06/2021' },
    { id: 3, title: 'Voice', amount: '300 Min', date: '22/06/2021' },
    { id: 4, title: 'SMS', amount: '100 SMS', date: '22/06/2021' },
    { id: 5, title: 'Monetery', amount: 'Rp. 0', date: '' }
  ]);
  const [recentTransaction, setRecentTransaction] = useState([
    { id: 1, title: 'Internet', date: '23 Apr 2021 03:24:06' },
    { id: 2, title: 'Combo', date: '06 Apr 2021 06:53:06' }
  ]);
  const [latestPromo, setLatestPromo] = useState([{ id: 1, type: 'Promo' }]);
  const [activeSlide, setActiveSlide] = useState(0);

  return ( 
  <SafeAreaView style={[tw`flex-1`]}>
    <View style={styles.container}>
      <Lottie 
        source={require('../assets/img/deco3_1.json')} 
        autoPlay 
        loop={false}
        style={{ 
          width: screenWidth,
          top: -120,
          right: -60,
        }}
      />
      <Lottie 
        source={require('../assets/img/deco3_2.json')} 
        autoPlay 
        loop={false}
        style={{ 
          position: 'absolute',
          width: screenWidth,
          top: -150,
          right: -80,
        }} 
      />
    </View>
    <Text style={styles.headerText}>Groovy Product</Text>
    <ScrollView style={styles.scrollViewContainer}>
      <View style={[styles.screenContainer]}>
        <View style={[styles.boxContainer]}>
          <View style={[styles.flexRow,styles.boxMargin]}>
            <View style={styles.imgProfile}>
              <Text style={styles.imgProfileText}>{initialName}</Text>
            </View>
            <View >
              <Text style={styles.profileText}>{userName}</Text>
              <Text style={styles.profileText2}>Rp {balance}</Text>
              <Text style={styles.profileText3}>Active Until {expDate}</Text>
            </View>
          </View>                              
        </View>        
                        
      </View>   
    </ScrollView>
    <Text style={styles.header2Text}>Groovy Product</Text>
    <ScrollView style={styles.scrollViewContainer2}>
      <View style={[styles.screenContainer]}>
        <View style={[styles.boxContainer]}>
          <View style={[styles.flexRow,styles.boxMargin]}>
            <View style={styles.imgProfile}>
              <Text style={styles.imgProfileText}>{initialName}</Text>
            </View>
            <View >
              <Text style={styles.profileText}>{userName}</Text>
              <Text style={styles.profileText2}>Rp {balance}</Text>
              <Text style={styles.profileText3}>Active Until {expDate}</Text>
            </View>
          </View>                              
        </View>      
         
        <View style={[styles.boxContainer]}>
          <View style={[styles.flexRow,styles.boxMargin]}>
            <View style={styles.imgProfile}>
              <Text style={styles.imgProfileText}>{initialName}</Text>
            </View>
            <View >
              <Text style={styles.profileText}>{userName}</Text>
              <Text style={styles.profileText2}>Rp {balance}</Text>
              <Text style={styles.profileText3}>Active Until {expDate}</Text>
            </View>
          </View>                              
        </View>      
        <View style={[styles.boxContainer]}>
  <View style={[styles.flexRow,styles.boxMargin]}>
    <View style={styles.imgProfile}>
      <Text style={styles.imgProfileText}>{initialName}</Text>
    </View>
    <View >
      <Text style={styles.profileText}>{userName}</Text>
      <Text style={styles.profileText2}>Rp {balance}</Text>
      <Text style={styles.profileText3}>Active Until {expDate}</Text>
    </View>
  </View>
  <View style={styles.bottomRightButton}>
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={styles.buttonText}>Button Text</Text>
    </TouchableOpacity>
  </View>
</View>
            
                        
      </View>   
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    top: 0,
  },
  scrollViewContainer2: {
    top: -50,
  },
  screenContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeHeaderContainer: {
    flexDirection: "row",
    marginLeft: 25,
    marginRight: 25,
    alignItems: 'center',
    top: 0,
  }, 
  headerText: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'light',
    color: 'black',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 60,
  },
  header2Text: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'light',
    color: 'black',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 260,
  },
  imgProfile: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    backgroundColor: '#ACACAC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  imgProfileText: {
    color: 'white'
  },
  profileText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4
  },
  profileText2: {
    color: '#121212',
    fontWeight: 'bold',
    marginBottom: 2,
    fontSize: 14
  },
  profileText3: {
    color: '#B1B5B8',
    fontSize: 10
  },
  boxMargin: {
    padding: 16,
  },
  boxContainer: {
    backgroundColor:'white',
    paddingBottom:16,
    marginBottom:16,
    width: screenWidth* 0.9,
    borderRadius: 20,
  },
  flexRow : {
    flexDirection:'row',
  },
});