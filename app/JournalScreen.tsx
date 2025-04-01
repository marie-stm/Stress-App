import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OPENAI_API_KEY = 'sk-...'; // Remplace par ta clé OpenAI 🔐

export default function JournalScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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

  const clearMessages = async () => {
    await AsyncStorage.removeItem('journal');
    setMessages([]);
  };

  const generateBotReply = async (msg: string) => {
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                "Tu es un journal intime chaleureux, bienveillant, à l'écoute. Pose des questions et réponds avec douceur.",
            },
            { role: 'user', content: msg },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return res.data.choices[0].message.content.trim();
    } catch (err) {
      console.error('Erreur IA :', err);
      return "Désolé, je n’ai pas pu répondre cette fois 😔";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { sender: 'user', message: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const aiResponse = await generateBotReply(userMsg.message);
    const botMsg = { sender: 'bot', message: aiResponse };
    const finalMessages = [...newMessages, botMsg];
    await saveMessages(finalMessages);
    setLoading(false);
  };

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.message,
        item.sender === 'user' ? styles.user : styles.bot,
      ]}
    >
      <Text style={styles.text}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* BOUTONS ACTIONS */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => saveMessages(messages)}
        >
          <Text style={styles.toolText}>💾 Sauvegarder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolButton} onPress={loadMessages}>
          <Text style={styles.toolText}>🔁 Restaurer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolButton, { backgroundColor: '#cc0000' }]}
          onPress={clearMessages}
        >
          <Text style={styles.toolText}>🗑 Effacer</Text>
        </TouchableOpacity>
      </View>

      {/* MESSAGES */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chat}
      />

      {/* LOADER IA */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color="#ff7a00" size="small" />
          <Text style={{ color: 'white', marginLeft: 10 }}>
            L'IA est en train d’écrire...
          </Text>
        </View>
      )}

      {/* ENTRÉE MESSAGE */}
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
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1e1e1e',
  },
  toolButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ff7a00',
    borderRadius: 10,
  },
  toolText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
