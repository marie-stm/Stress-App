import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JournalScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const stored = await AsyncStorage.getItem('journal');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  };

  const saveMessages = async (newMessages: any[]) => {
    setMessages(newMessages);
    await AsyncStorage.setItem('journal', JSON.stringify(newMessages));
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', message: input.trim() };
    const botReply = { sender: 'bot', message: generateBotReply(input.trim()) };
    const newMessages = [...messages, userMsg, botReply];
    saveMessages(newMessages);
    setInput('');
  };

  const generateBotReply = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('fatigué')) return "Je comprends. Tu veux te reposer ?";
    if (lower.includes('stress')) return "On peut respirer ensemble ?";
    return "Merci de t’être confié·e 💬";
  };

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.message,
        item.sender === 'user' ? styles.user : styles.bot
      ]}
    >
      <Text style={styles.text}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chat}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Écris ici..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  chat: { padding: 10 },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  user: {
    backgroundColor: '#ff7a00',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#1e1e1e',
    alignSelf: 'flex-start',
    borderColor: '#ff7a00',
    borderWidth: 1,
  },
  text: { color: 'white' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#ff7a00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
