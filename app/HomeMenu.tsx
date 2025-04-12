import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import colors from '@/constants/Colors'; 

export default function HomeMenu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ReminderScreen' as never)}>
          <Ionicons name="notifications-outline" size={28} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Que veux-tu faire ?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StressTracker' as never)}>
        <Text style={styles.buttonText}>Comment te sens-tu ?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JournalScreen' as never)}>
        <Text style={styles.buttonText}>Ton journal quotidien</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Relaxation' as never)}>
        <Text style={styles.buttonText}>Exercices de relaxation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statistiques' as never)}>
        <Text style={styles.buttonText}>Tes statistiques</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
