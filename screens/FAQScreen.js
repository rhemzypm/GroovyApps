import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import AccordionItem from '../components/AccordionItem';
import FloatingButton from '../components/FloatingButton';

const FAQScreen = () => {
  const { top } = useSafeAreaInsets();

  const faqData = [
    {
      title: 'Pembayaran Groovy Package Tidak Masuk',
      content:
        'React Native is a framework for building mobile applications using React and JavaScript. It allows you to build mobile apps for iOS and Android platforms using a single codebase.',
    },
    {
      title: 'Saya Lupa Nomer Telefon',
      content:
        'Lorem Ipsum Dolor Amet',
    },
    {
      title: 'OTP Tidak Masuk',
      content:
        'Some advantages of using React Native include faster development time, easier code sharing across platforms, and improved performance compared to other hybrid app development frameworks.',
    },
  ];

  return (
    <SafeAreaView style={[tw`flex-1`, { paddingTop: top }]}>
      <View style={tw`p-6 flex-1`}>
        <View style={tw`mb-2`}>
          <Text style={tw`text-4xl font-bold mb-10`}>Help Center</Text>
          <Text style={tw`text-xl font-bold`}>FAQs</Text>
        </View>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} title={faq.title} content={faq.content} />
        ))}
      </View>
      <View style={[tw`absolute`, { bottom: 90, right: -10 }]}>
        <FloatingButton />
      </View>
    </SafeAreaView>
  );
};

export default FAQScreen;
