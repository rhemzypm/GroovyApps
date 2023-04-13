import React from 'react';
import { StyleSheet, View } from 'react-native';
import MagicBottomNavigation from './MagicBottomNav';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <MagicBottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
