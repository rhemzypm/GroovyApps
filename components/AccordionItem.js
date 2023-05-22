import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const AccordionItem = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={tw`mb-4`}>
      <TouchableOpacity
        style={tw`flex-row justify-between items-center bg-yellow-300 p-4 rounded-t-lg shadow-lg`}
        onPress={toggleAccordion}
      >
        <Text style={tw`font-bold text-lg text-red-700`}>{title}</Text>
        <Text style={tw`font-bold text-lg`}>{isExpanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={tw`bg-white p-4 rounded-b-lg shadow-lg`}>
          <Text style={tw`text-base`}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button:{
    // borderWidth: 0,
    // borderColor: "#D45239",
    // borderRadius: 5,
    // elevation: 3,
  },
});

export default AccordionItem;
