import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';



export default function ReminderScreen() {
  useEffect(() => {
    // Demande de permission
    const askPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "L'application ne pourra pas envoyer de rappels.");
      }
    };
    askPermission();
  }, []);

  // Fonction pour planifier une notification
  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🧘 Respire un peu !",
        body: "C'est le moment de faire un exercice de relaxation.",
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true, // tous les jours
      },
    });
    Alert.alert("Rappel activé", "Tu recevras une notification chaque jour à 20h.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activer un rappel quotidien</Text>
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>Activer le rappel à 20h</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, color: '#ff7a00', marginBottom: 30, textAlign: 'center' },
  button: {
    backgroundColor: '#ff7a00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
