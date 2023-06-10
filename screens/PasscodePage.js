import { Ionicons } from '@expo/vector-icons';
import { Dimensions, FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MotiView } from 'moti';
import randomColor from 'randomcolor';

const { width } = Dimensions.get('window');
const pinLength = 4;
const pinContainerSize = width / 2;
const pinFullSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinFullSize - pinSpacing * 2;

const dialPadSize = width * 0.2;
const dialPadFontSize = dialPadSize * 0.4;
const gap = 14;

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];

const baseColor = randomColor();
const colors = {
  primary: '#F8D344',
  secondary: '#D45239',
};

function DialPad({ onPress }) {
  return (
    <FlatList
      data={dialPad}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      style={{ flexGrow: 0 }}
      columnWrapperStyle={{ gap: gap * 2 }}
      contentContainerStyle={{ gap: gap * 2 }}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const isNumber = typeof item === 'number';
        return (
          <TouchableOpacity
            disabled={item === ''}
            onPress={() => {
              onPress(item);
            }}
          >
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize,
                borderWidth: isNumber ? 1 : 0,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item === 'del' ? (
                <Ionicons
                  name="backspace-outline"
                  size={dialPadFontSize}
                  color={colors.secondary}
                />
              ) : (
                <Text
                  style={{
                    fontSize: dialPadFontSize,
                    color: colors.secondary,
                  }}
                >
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default function PasscodePage() {
  const [code, setCode] = useState([]);
  
  useEffect(() => {
    const validatePasscode = () => {
      const passcode = code.join('');
      const validPasscode = '5678';
      console.log(`passcode: ${passcode}`);
      console.log(`validPasscode: ${validPasscode}`);
      if (passcode === validPasscode) {
        Alert.alert('Passcode valid');
      } else {
        Alert.alert('Passcode salah', 'Silakan coba lagi.');
        setCode([]);
      }
    };
    
    if (code.length === pinLength) {
      validatePasscode();
    }
  }, [code]);
  
  const handlePress = (item) => {
    if (item === 'del') {
      setCode((prev) => prev.slice(0, prev.length - 1));
    } else if (typeof item === 'number') {
      setCode((prev) => [...prev, item]);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
      <View
        style={{
          flexDirection: 'row',
          gap: pinSpacing * 2,
          height: pinSize * 2,
          marginBottom: pinSize * 2,
          alignItems: 'flex-end',
          backgroundColor: colors.primary,
        }}
      >
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = !!code[i];
          return (
            <MotiView
              key={i}
              style={{
                width: pinSize,
                borderRadius: pinSize,
                backgroundColor: colors.secondary,
              }}
              animate={{
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0,
              }}
              transition={{
                type: 'timing',
                duration: 100,
              }}
            />
          );
        })}
      </View>
      <DialPad onPress={handlePress} />
    </View>
  );
}
