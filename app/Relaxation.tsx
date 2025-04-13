import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Colors } from '@/constants/Colors';

const exercises = [
  {
    image: require('../assets/breathing.png'),
  },
  {
    image: require('../assets/lotus.png'),
  },
  {
    image: require('../assets/stretch.png'),
  },
  {
    image: require('../assets/visualisation.png'),
  },
];

export default function Relaxation() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
    >
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
    alignItems: 'center',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
});
