import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const OPENAI_API_KEY = 'sk-...'; // remplace par ta vraie clé

export default function JournalScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('journal');
      if (stored) setMessages(JSON.parse(stored));
    };
    load();
  }, []);

  const saveMessages = async (newMessages: any[]) => {
    setMessages(newMessages);
    await AsyncStorage.setItem('journal', JSON.stringify(newMessages));
  };

  const generateBotReply = async (msg: string) => {
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "Tu es un journal intime doux et empathique." },
            ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.message })),
            { role: 'user', content: msg }
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
      console.error(err);
      return "Désolé, je n'ai pas pu répondre pour le moment.";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: 'user', message: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    const aiText = await generateBotReply(userMsg.message);
    const aiMsg = { sender: 'bot', message: aiText };

    const finalMessages = [...updated, aiMsg];
    await saveMessages(finalMessages);
    setLoading(false);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 200);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}

    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* 🔙 Retour */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', top: 40, left: 10, zIndex: 1 }}
        >
          <Ionicons name="chevron-back" size={28} color={colors.accent} />
        </TouchableOpacity>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.chat}
          style={{ marginTop: 80 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* ⏳ Chargement */}
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.accent} size="small" />
            <Text style={{ color: colors.text, marginLeft: 10 }}>
              L'IA écrit...
            </Text>
          </View>
        )}

        {/* Entrée message */}
        <View style={[styles.inputContainer, { borderTopColor: colors.accent }]}>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                borderColor: colors.accent,
                backgroundColor: colors.card,
              },
            ]}
            value={input}
            onChangeText={setInput}
            placeholder="Écris ici..."
            placeholderTextColor={colors.placeholder}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={sendMessage}
          >
            <Text style={{ color: colors.buttonText, fontWeight: 'bold' }}>
              Envoyer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chat: {
    padding: 10,
    paddingBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
