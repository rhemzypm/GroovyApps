import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

const Profile = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      message: 'Hi, how are you?',
      sender: 'other',
    },
    {
      id: '2',
      message: 'I am good, thanks. How about you?',
      sender: 'self',
    },
    {
      id: '3',
      message: 'I am doing great, thanks for asking.',
      sender: 'other',
    },
  ]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { id: String(Date.now()), message, sender: 'self' }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/200' }} />
        <Text style={styles.username}>John Doe</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === 'self' ? styles.selfMessage : styles.otherMessage}>
            {item.sender === 'other' && (
              <Image style={styles.avatarSmall} source={{ uri: 'https://picsum.photos/100' }} />
            )}
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C5',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  otherMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 50,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
  padding: 10,
  borderRadius: 30,
  marginBottom: 10,
  },
  textInput: {
  flex: 1,
  height: 40,
  backgroundColor: '#fff',
  borderRadius: 20,
  paddingLeft: 15,
  marginRight: 10,
  },
  sendButton: {
  backgroundColor: '#1E90FF',
  borderRadius: 20,
  paddingVertical: 10,
  paddingHorizontal: 20,
  },
  sendButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  },
});

export default Profile;
