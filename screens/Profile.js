import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(screenWidth * 0.9);

const Profile = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Image
          source={require('../assets/img/profile1.jpeg')}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>Rhemzy Putra Maulana</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.infoText}>rhemzy@andalworks.com</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Phone</Text>
          <Text style={styles.infoText}>+1234567890</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Address</Text>
          <Text style={styles.infoText}>Rahasia woi</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 100,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginTop: 20,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
  },
  boxContainer: {
    backgroundColor: 'white',
    paddingBottom: 16,
    marginBottom: 16,
    width: ITEM_WIDTH,
    borderRadius: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
