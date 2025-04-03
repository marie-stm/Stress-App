import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // 💡 Ajout de l'icône

export default function HomeMenu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 🔔 Icône cloche en haut à droite */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ReminderScreen' as never)}>
          <Ionicons name="notifications-outline" size={28} color="#ff7a00" />
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
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 10,
  },
  title: { fontSize: 24, color: '#ff7a00', textAlign: 'center', marginBottom: 30 },
  button: {
    backgroundColor: '#ff7a00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
