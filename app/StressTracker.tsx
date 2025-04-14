import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const moods = [
  { score: 14, label: "Heureux·se", emoji: "☀️" },
  { score: 13, label: "Enthousiasme", emoji: "✨" },
  { score: 12, label: "Gratitude", emoji: "🌈" },
  { score: 11, label: "Confiant·e", emoji: "🌞" },
  { score: 10, label: "Bien", emoji: "😊" },
  { score: 9, label: "Sensible", emoji: "🌬️" },
  { score: 8, label: "Indifférence", emoji: "😐" },
  { score: 7, label: "Sautes d’humeur", emoji: "🌦️" },
  { score: 6, label: "Triste", emoji: "🌧️" },
  { score: 5, label: "Pas en contrôle", emoji: "💫" },
  { score: 4, label: "Insécurité", emoji: "☁️" },
  { score: 3, label: "Anxiété", emoji: "🌪️" },
  { score: 2, label: "En colère", emoji: "🌩️" },
  { score: 1, label: "Irritabilité", emoji: "⚡" },
];

export default function StressTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  const saveMood = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      await AsyncStorage.setItem(`mood-${today}`, selectedMood ?? '');
      Alert.alert("Humeur enregistrée !", `Tu te sens : ${selectedMood}`);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const renderItem = ({ item }: any) => {
    const isSelected = selectedMood === item.label;
    return (
      <TouchableOpacity
        style={[
          styles.moodButton,
          {
            backgroundColor: isSelected ? colors.accent : colors.card,
            borderColor: colors.accent,
          },
        ]}
        onPress={() => setSelectedMood(item.label)}
      >
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text
          style={[
            styles.label,
            {
              color: isSelected ? colors.buttonText : colors.text,
              fontWeight: isSelected ? 'bold' : 'normal',
            },
          ]}
        >
          {item.score}. {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🔙 Bouton retour */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}
      >
        <Ionicons name="chevron-back" size={28} color={colors.accent} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.accent, marginTop: 80 }]}>
        Comment te sens-tu ?
      </Text>

      <FlatList
        data={moods}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: colors.accent, opacity: selectedMood ? 1 : 0.4 },
        ]}
        onPress={saveMood}
        disabled={!selectedMood}
      >
        <Text style={[styles.saveButtonText, { color: colors.buttonText }]}>
          Enregistrer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  grid: {
    alignItems: 'center',
  },
  moodButton: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 8,
    width: 90,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 30,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
