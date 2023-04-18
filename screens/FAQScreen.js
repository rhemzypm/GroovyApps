import React from 'react';
import { SafeAreaView, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import AccordionItem from '../components/AccordionItem';

const FAQScreen = () => {
  const faqData = [
    {
      title: 'What is React Native?',
      content:
        'React Native is a framework for building mobile applications using React and JavaScript. It allows you to build mobile apps for iOS and Android platforms using a single codebase.',
    },
    {
      title: 'Is React Native free to use?',
      content:
        'Yes, React Native is an open-source project and is free to use for building mobile applications.',
    },
    {
      title: 'What are the advantages of using React Native?',
      content:
        'Some advantages of using React Native include faster development time, easier code sharing across platforms, and improved performance compared to other hybrid app development frameworks.',
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`p-4`}>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} title={faq.title} content={faq.content} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default FAQScreen;
