import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Andalpost = () => {
  const navigation = useNavigation();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=apple&from=2023-05-24&to=2023-05-24&sortBy=popularity&apiKey=76a93ecf19984f2682e81ca559762d7c'
        );
        const data = await response.json();
        setArticle(data.articles[10]);
      } catch (error) {
        console.log('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, []);

  const handleGoBack = () => {
    navigation.navigate('Home'); 
  };

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <FontAwesome name="chevron-left" style={styles.backIcon} testID="backIcon" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>By {article.author}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.content}>{article.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    fontSize: 20,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
    color: '#888',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Andalpost;
