import React, { useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView ,ScrollView, ImageBackground,Text,View,Image,FlatList,TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemPagerViewLatest from '../components/ItemPagerViewLatest'
import { Button } from 'react-native-elements';
import { LogBox } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import head1 from '../assets/img/headvg1.json';
import head2 from '../assets/img/headvg2.json';

import Lottie from 'lottie-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

export const screenWidth = Dimensions.get("window").width ;
export const ITEM_WIDTH = Math.round(screenWidth * 0.9)

export default function Home() {

  const [point, setPoint] = useState("60 Points");
  const [imgDashboard, setImgDashboard] = useState(require('../assets/img/head.png'));
  const [imgLogo, setImgLogo] = useState(require('../assets/img/G-Point-3.png'));
  const [notification, setNotification] = useState(100);
  const [initialName, setInitialName] = useState("TP");
  const [userName, setUserName] = useState("Rhemzy");
  const [balance, setBalance] = useState("69.420");
  const [expDate, setExpDate] = useState("28/04/2022");
  const [currentPackage, setCurrentPackage] = useState([ { id:1, title: 'Internet', amount: '14,46 MB', date: '22/06/2021', }, { id:2, title: 'Multimedia', amount: '949,74 MB', date: '22/06/2021', }, { id:3, title: 'Voice ', amount: '300 Min', date: '22/06/2021', }, { id:4, title: 'SMS ', amount: '100 SMS', date: '22/06/2021', }, { id:5, title: 'Monetery', amount: 'Rp. 0', date: '', }]);
  const [recentTransaction, setRecentTransaction] = useState([ { id:1, title: 'Internet', date: '23 Apr 2021 03:24:06', }, { id:2, title: 'Combo', date: '06 Apr 2021 06:53:06', }]);
  const [latestPromo, setLatestPromo] = useState([{id:1,type:'Promo'}]);
  const [activeSlide, setActiveSlide] = useState(0);

const { top } = useSafeAreaInsets();
// componentDidMount(){
  //   LogBox.ignoreLogs([
    //     'VirtualizedLists should never be nested',
    //   ])
    // }
    
    return ( 
    <SafeAreaView style={[tw`flex-1`]}>
      <View style={styles.container}>
      <Lottie 
        source={require('../assets/img/headvg1.json')} 
        autoPlay 
        loop={false}
        style={{ 
          width: screenWidth,
          top: -15,
        }}
      />
      <Lottie 
        source={require('../assets/img/headvg2.json')} 
        autoPlay 
        loop={false}
        style={{ 
          position: 'absolute',
          width: screenWidth,
          top: -90,
          right: -90,
        }} 
      />
      </View>
      <View style={styles.homeHeaderContainer}>
        <Text style={styles.headerText}>Welcome, Rhemzy</Text>
        <Image resizeMode="cover"  style={styles.imgLogo} source={imgLogo} />
        <Text style={styles.point} >{point} Point</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.screenContainer, {alignItems: 'center', justifyContent: 'center'}}>
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
            <View style={[styles.HeaderBoxContainer]}>
              <View style={[styles.flexRow]}>
                <Ionicons name="megaphone" size={18} style={[styles.iconInnerCircle]}  />
                <Text style={[styles.textHeaderContainer]} >Latest From Us !</Text>
              </View>
            </View>
      
            <View style={styles.pagerWrapper}>
              <Carousel  inactiveSlideOpacity={1}
                inactiveSlideScale={1} sliderWidth={screenWidth}
                onSnapToItem={(index) => {
                  console.log("onSnapToItem index:", index);
                  setActiveSlide(index) ;}}
                itemWidth={ITEM_WIDTH}  data={recentTransaction} renderItem={({item}) => <ItemPagerViewLatest item={item} />}  />
      
              <Pagination
    paddingVertical={0}
    containerStyle={styles.dotContainerStyle}
    dotsLength={recentTransaction.length}
    activeDotIndex={activeSlide}
    dotStyle={styles.dotStyle}
    inactiveDotOpacity={0.4}
    inactiveDotScale={0.6}
/>       
            </View>                                   
          </View>    
        </View>
      </ScrollView>
    </SafeAreaView>
    );
    }
    
                  
                  
                  const styles = StyleSheet.create({
                    container: {
                      flex:1
                    },
                    dashboarHvc: {
                      width:'100%',
                      height:200,
                      top: 0,
                      right: -10,
                    },
                    scrollViewContainer: {
                      top: -140,
                    },
                    screenContainer: {
                      backgroundColor: '#EAEEF1',
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      justifyContent: 'center',
                    },
                    homeHeaderContainer :{
                      flexDirection: "row",
                      marginLeft:25,
                      marginRight:25,
                      alignItems: 'center',
                      top: -180,
                    }, 
                    headerText: {
                      position: 'absolute',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    },
                    point : {
                      top: 35,
                      marginLeft:16,
                      color:'black',
                      fontSize:16,      
                      fontWeight: 'bold',
                    },
                    imgLogo : {
                      top: 35,
                      width:45,
                      height:45,
                      borderRadius:45/2
                    },
                    imgProfile : {
                      width:60,
                      height:60,
                      borderRadius:60/2,
                      backgroundColor:'#ACACAC',
                      justifyContent:'center',
                      alignItems:'center',
                      marginRight:16
                    },
                    imgProfileText : {
                      color:'white'
                    },
                    profileText : {
                      color:'#121212',
                      fontWeight:'bold',
                      fontSize:12,
                      marginBottom:4
                    },
                    profileText2 : {
                      color:'#121212',
                      fontWeight:'bold',
                      marginBottom:2,
                      fontSize:14
                    },
                    profileText3 : {
                      color:'#B1B5B8',
                      fontSize:10
                    },
                    iconPlus : {
                      marginLeft:8,
                      color:'white'
                    },
                    circleView : {
                      width:45,
                      marginLeft:16,
                      height:45,
                      borderRadius:45/2,
                      backgroundColor:'white',
                      justifyContent:'center',
                      alignItems:'center'
                    },
                    circlePoint : {
                      width:100,
                    },
                    iconInnerCircle : {
                      color:'black',
                      position:'relative'
                    },
                    circleGray : {
                      backgroundColor:'#F0F1F3',
                      width:35,
                      height:35,
                      borderRadius:35/2,
                      marginLeft:8
                    },
                    pointContainer : {
                      justifyContent:'flex-end',
                      flex:2,
                    },
                    boxShadow : {
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 5,
                        height: 10,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3.84,
                      elevation: 5,
                    },
                    badge:{
                      color:'#fff',
                      position:'absolute',
                      zIndex:10,
                      top:6,
                      right:6,
                      padding:2,
                      backgroundColor:'red',
                      borderRadius:10,
                      fontSize:8,
                      textAlign:'center',
                    },
                    boxContainerTopRadius : {
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    },
                    boxContainerBottomRadius : {
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    },
                    boxMargin : {
                      padding: 16,
                    },
                    boxContainer : {
                      backgroundColor:'white',
                      paddingBottom:16,
                      marginBottom:16,
                      width: screenWidth* 0.9,
                      borderRadius: 20,
                    },
                      HeaderBoxContainer : {
                      margin:16,
                      flex:1
                    },
                    textHeaderContainer: {
                      marginLeft:8,
                      fontSize:12,
                      fontWeight:'bold',
                    },
                    textSeeAllWrapper: {
                      justifyContent:'flex-end',
                      flex:1,
                      alignItems:'flex-end'
                    },
                    textSeeAll: {
                      color:'#E5131E',
                      fontSize:12,
                    },
                    subTextHeaderContainer: {
                      fontSize:12,
                    },
                    flexRow : {
                      flexDirection:'row',
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