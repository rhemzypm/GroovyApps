import { View, StyleSheet, Text, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import ServiceTab from './ServiceTab';
import pointIcon from '../../assets/img/G-Point-4.png';
import pointSelectIcon from '../../assets/img/G-Point-3.png';

const {width} = Dimensions.get('screen');

export default function ServiceTabBar ({state, navigation}) {
    const [selected, setSelected] = useState(state.routes[state.index].name);
    const [pointIconSource, setpointIconSource] = useState(pointIcon);
    const {routes} = state;
    const renderColor = currentTab => (currentTab === selected ? '#f79944' : 'black');
    const handlePress = (activeTab, index) => {
        if(state.index !== index){
            setSelected(activeTab);
            if (activeTab === 'Point') {
              setpointIconSource(pointSelectIcon);
            } else {
              setpointIconSource(pointIcon);
            }
            navigation.navigate(activeTab);
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
            {
                routes.map((route, index) => 
                    <ServiceTab 
                    tab={route} 
                    icon={route.name === 'Point' ? pointIconSource : route.params.icon} 
                    onPress={ () => handlePress(route.name, index)} 
                    color={renderColor(route.name)} 
                    key={route.key}/>)
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: 350,
        height: 70,
        borderRadius: 100,
    },
    wrapper: {
        position: 'absolute',
        bottom: 40,
        width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    image: {
        width: 24,
        height: 24,
        marginBottom: 5,
    },
});
