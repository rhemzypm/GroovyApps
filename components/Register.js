import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import InputField from './InputField';

const Register = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('InputOTP');
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/img/logo.png')}
            resizeMode="contain"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          />
        </View>
        <InputField label={'Phone Number'} keyboardType="email-address" />
        <CustomButton label={'Register'} onPress={handleLoginPress} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 100,
          }}>
          <Text>Have an Account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#F79944', fontWeight: '700' }}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rootScreen: {
    width: 158,
    height: 258,
  },
});

export default Register;
