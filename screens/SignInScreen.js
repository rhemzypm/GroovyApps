import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import Register from './Register'
import InputOTP from '../components/InputOTP'

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/img/login.png')} 
          style={{width: 300, height: 300}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-10 pt-10">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Phone Number</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
              placeholder="number"
              value="082296283315" 
            />
            <TouchableOpacity onPress={()=> navigation.navigate('InputOTP')}
              className="py-4 bg-yellow-400 rounded-xl"
              style={{ marginTop: 10 }}>
                <Text className="text-xl font-bold text-center text-gray-700">Login</Text>
             </TouchableOpacity>
            
          </View>
          <View className="flex-row justify-center mt-10">
              <Text className="text-gray-500 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    
  )
}