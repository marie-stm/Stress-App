import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { Colors } from '@/constants/Colors';

const exercises = [
  {
    label: 'Respiration 4-4-8',
    image: require('../assets/breathing.png'),
    video: require('../videos/Puissante Respiration anti-Stress _ La Technique 4-4-8.mp4'),
  },
  {
    label: 'Posture du lotus',
    image: require('../assets/lotus.png'),
    video: require('../videos/Posture du lotus (Padmasana).mp4'),
  },
];

export default function Relaxation() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    const exercise = exercises[selected];
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Retour vidéo */}
        <TouchableOpacity
          onPress={() => setSelected(null)}
          style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}
        >
          <Ionicons name="chevron-back" size={28} color={colors.accent} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.accent }]}>
          {exercise.label}
        </Text>

        <Video
          source={exercise.video}
          useNativeControls
          resizeMode="contain"
          style={styles.video}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Retour depuis la liste */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}
      >
        <Ionicons name="chevron-back" size={28} color={colors.accent} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.accent }]}>
        🧘‍♀️ Exercices de Relaxation
      </Text>

      {exercises.map((item, index) => (
        <View
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.accent,
            },
          ]}
        >
          <Image source={item.image} style={styles.image} />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={() => setSelected(index)}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Commencer
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
  },
  image: {
    width: 240,
    height: 320,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  video: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 20,
  },
});
