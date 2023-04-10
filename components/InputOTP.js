import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import InputField from './InputField';

const InputOTP = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require("../assets/img/logo.png")}
            resizeMode="contain"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          ></Image>
        </View>
        <Text style={{ marginTop: 20, fontSize: 16, textAlign: 'center' }}>
          We've already sent OTP in your email
        </Text>
        <InputField
          label={'OTP'}
          keyboardType="number-pad"
        />
        <CustomButton label={"Login"} onPress={() => {}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 100,
          }}>
          <Text>Didn't Receive The Code?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Resend OTP')}>
            <Text style={{ color: '#F79944', fontWeight: '700' }}> Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  rootScreen: {
    width: 158,
    height: 258,
  },
});


export default InputOTP;