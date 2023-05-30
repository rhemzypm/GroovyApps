import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

const FormCheckCoverage = () => {
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFormSubmit = () => {
    console.log('Data Form:');
    console.log('Lokasi:', location);
    console.log('Nama:', name);
    console.log('Alamat:', address);
    console.log('Nomor Telepon:', phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Lokasi"
        value={location}
        onChangeText={text => setLocation(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Nama"
        value={name}
        onChangeText={text => setName(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Alamat"
        value={address}
        onChangeText={text => setAddress(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Nomor Telepon"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        containerStyle={styles.inputContainer}
      />
      <Button
        title="Submit"
        onPress={handleFormSubmit}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default FormCheckCoverage;
