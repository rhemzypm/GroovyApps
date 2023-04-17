import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AccordionItem = ({title, bodyText}) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <MaterialIcons name={'keyboard-arrow-right'} size={30} />
                </View>
            </TouchableOpacity>
        </View>
    )
}