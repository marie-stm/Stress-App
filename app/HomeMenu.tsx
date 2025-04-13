import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function HomeMenu() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ReminderScreen' as never)}>
          <Ionicons name="notifications-outline" size={28} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.accent }]}>Que veux-tu faire ?</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('StressTracker' as never)}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Comment te sens-tu ?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('JournalScreen' as never)}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Ton journal quotidien
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('Relaxation' as never)}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Exercices de relaxation
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('Statistiques' as never)}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Tes statistiques
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
