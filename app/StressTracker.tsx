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
import { Colors } from '@/constants/Colors';

const moods = [
  { label: "Sautes d’humeur", emoji: "🌦️" },
  { label: "Pas en contrôle", emoji: "💫" },
  { label: "Bien", emoji: "😊" },
  { label: "Heureux·se", emoji: "☀️" },
  { label: "Triste", emoji: "🌧️" },
  { label: "Sensible", emoji: "🌬️" },
  { label: "En colère", emoji: "🌩️" },
  { label: "Confiant·e", emoji: "🌞" },
  { label: "Enthousiasme", emoji: "✨" },
  { label: "Irritabilité", emoji: "⚡" },
  { label: "Anxiété", emoji: "🌪️" },
  { label: "Insécurité", emoji: "☁️" },
  { label: "Gratitude", emoji: "🌈" },
  { label: "Indifférence", emoji: "😐" },
];

export default function StressTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.accent }]}>Comment te sens-tu ?</Text>
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
