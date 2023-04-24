import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const AccordionItem = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={tw`mb-4`}>
      <TouchableOpacity
        style={tw`flex-row justify-between items-center bg-gray-200 p-4 rounded-t-lg`}
        onPress={toggleAccordion}
      >
        <Text style={tw`font-bold text-lg`}>{title}</Text>
        <Text style={tw`font-bold text-lg`}>{isExpanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={tw`bg-white p-4 rounded-b-lg`}>
          <Text style={tw`text-base`}>{content}</Text>
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
