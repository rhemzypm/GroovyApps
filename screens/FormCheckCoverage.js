import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FormCheckCoverage = () => {
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Product');
  };

  const handleFormSubmit = () => {
    console.log('Data Form:');
    console.log('Lokasi:', location);
    console.log('Nama:', name);
    console.log('Alamat:', address);
    console.log('Nomor Telepon:', phoneNumber);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <FontAwesome name="chevron-left" style={styles.backIcon} testID="backIcon" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>Enter Installation{"\n"}Address</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Lokasi"
          value={location}
          onChangeText={text => setLocation(text)}
          style={[styles.inputContainer, styles.shadow]}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Nama"
          value={name}
          onChangeText={text => setName(text)}
          style={[styles.inputContainer, styles.shadow]}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Alamat"
          value={address}
          onChangeText={text => setAddress(text)}
          style={[styles.inputContainer, styles.shadow]}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Nomor Telepon"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={[styles.inputContainer, styles.shadow]}
        />
      </View>
      <TouchableOpacity style={[styles.confirmButton, styles.shadow]} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginHorizontal: 10,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backIcon: {
    fontSize: 25,
    color: '#AFB1B6',
  },
  confirmButton: {
    backgroundColor: '#F2C94C',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default FormCheckCoverage;
