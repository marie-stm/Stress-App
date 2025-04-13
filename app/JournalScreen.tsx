import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const OPENAI_API_KEY = 'sk-...'; // 🔐 Remplace par ta clé

export default function JournalScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const stored = await AsyncStorage.getItem('journal');
    if (stored) setMessages(JSON.parse(stored));
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
        item.sender === 'user'
          ? { backgroundColor: colors.accent, alignSelf: 'flex-end' }
          : {
              backgroundColor: colors.card,
              borderColor: colors.accent,
              borderWidth: 1,
              alignSelf: 'flex-start',
            },
      ]}
    >
      <Text style={{ color: colors.text }}>{item.message}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 🔙 Bouton retour */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10, position: 'absolute', top: 40, left: 10, zIndex: 1 }}
      >
        <Ionicons name="chevron-back" size={28} color={colors.accent} />
      </TouchableOpacity>

      {/* 🛠 Barre d'actions */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.accent,
          marginTop: 80,
        }}
      >
        <TouchableOpacity
          style={{ ...styles.toolButton, backgroundColor: colors.accent }}
          onPress={() => saveMessages(messages)}
        >
          <Text style={{ ...styles.toolText, color: colors.buttonText }}>
            💾 Sauvegarder
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.toolButton, backgroundColor: colors.accent }}
          onPress={loadMessages}
        >
          <Text style={{ ...styles.toolText, color: colors.buttonText }}>
            🔁 Restaurer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.toolButton, backgroundColor: '#cc0000' }}
          onPress={clearMessages}
        >
          <Text style={{ ...styles.toolText, color: 'white' }}>
            🗑 Effacer
          </Text>
        </TouchableOpacity>
      </View>

      {/* 💬 Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chat}
      />

      {/* ⏳ Chargement IA */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.accent} size="small" />
          <Text style={{ color: colors.text, marginLeft: 10 }}>
            L'IA est en train d’écrire...
          </Text>
        </View>
      )}

      {/* ⌨️ Saisie */}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: colors.card,
          borderTopColor: colors.accent,
          borderTopWidth: 1,
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: colors.text,
            backgroundColor: '#FDF6EC',
            borderRadius: 10,
            padding: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: colors.accent,
          }}
          value={input}
          onChangeText={setInput}
          placeholder="Écris ici..."
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.accent,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10,
          }}
          onPress={sendMessage}
        >
          <Text style={{ color: colors.buttonText, fontWeight: 'bold' }}>
            Envoyer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  toolButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  toolText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
