import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Token from '../../screens/services/Token';
import Pulsa from '../../screens/services/Pulsa';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();

// Custom header component

function ServiceNavigator() {
    const navigation = useNavigation();
    const CustomHeader = ({ navigation }) => {
        const handleBackButton = () => {
            navigation.navigate('Point');
        };
        
        return (
            <View style={styles.headerContainer}>
            {/* Back button */}
            <TouchableOpacity onPress={handleBackButton}>
            <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            {/* Add any other components you want in the header */}
        </View>
        );
    };
  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader navigation={navigation} />
      {/* Top Tab Navigator */}
      <TopTab.Navigator
        screenOptions={{
          tabBarShowIcon: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: 'auto' },
          tabBarIndicatorStyle: { backgroundColor: '#f79944' },
        }}
        initialRouteName="Home"
      >
        <TopTab.Screen
          name="Token"
          component={Token}
        />
        <TopTab.Screen
          name="Pulsa"
          component={Pulsa}
        />
        {/* Add more Tab.Screen components for additional buttons */}
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50, // Adjust the value as per your requirement
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default ServiceNavigator;
