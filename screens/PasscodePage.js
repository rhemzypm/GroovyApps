import { Ionicons } from '@expo/vector-icons';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MotiView } from 'moti';
import randomColor from 'randomcolor';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkPin();
  }, []);

  const checkPin = async () => {
    try {
      const storedPin = await AsyncStorage.getItem('pin');
      if (storedPin !== null) {
        // Pin telah tersimpan sebelumnya
        // Lakukan pengecekan saat ini
        if (storedPin === '1234' && code.join('') === storedPin) {
          // Jika pin yang dimasukkan benar, lakukan sesuatu
          console.log('Pin benar!');
        } else {
          // Jika pin yang dimasukkan salah, tampilkan pesan kesalahan
          setErrorMessage('Pin salah!');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      } else {
        // Pin belum tersimpan sebelumnya
        // Lakukan penanganan kasus ini sesuai kebutuhan aplikasi Anda
        console.log('Pin belum tersimpan');
      }
    } catch (error) {
      // Penanganan kesalahan saat mengambil pin dari AsyncStorage
      console.log('Terjadi kesalahan:', error);
    }
  };
  

  

  const handlePress = async (item) => {
    if (item === 'del') {
      setCode((prev) => prev.slice(0, prev.length - 1));
    } else if (typeof item === 'number') {
      if (code.length === pinLength) return;
      setCode((prev) => [...prev, item]);
      if (code.length + 1 === pinLength) {
        // Jika panjang pin yang dimasukkan mencapai panjang pin yang diharapkan
        await checkPin();
      }
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
                duration: 200,
              }}
            />
          );
        })}
      </View>
      {errorMessage ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}
      <DialPad onPress={handlePress} />
    </View>
  );
}
