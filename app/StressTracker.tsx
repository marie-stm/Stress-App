import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const saveMood = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      await AsyncStorage.setItem(`mood-${today}`, selectedMood ?? '');
      alert("Humeur enregistrée !");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.moodButton,
        selectedMood === item.label && styles.selected,
      ]}
      onPress={() => setSelectedMood(item.label)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comment te sens-tu ?</Text>
      <FlatList
        data={moods}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
      <Button title="Enregistrer" onPress={saveMood} disabled={!selectedMood} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  grid: { alignItems: 'center' },
  moodButton: {
    borderWidth: 2,
    borderColor: '#ff7a00',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    width: 90,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#ff7a00',
  },
  emoji: { fontSize: 30 },
  label: { marginTop: 5, fontSize: 12, textAlign: 'center', color: 'white' },
});
