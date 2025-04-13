import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { Colors } from '@/constants/Colors';

export default function ReminderScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "L'application ne pourra pas envoyer de rappels.");
      }
    };
    askPermission();
  }, []);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🧘 Respire un peu !",
        body: "C'est le moment de faire un exercice de relaxation.",
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
        type: 'calendar',
      } as Notifications.CalendarTriggerInput,
    });
    Alert.alert("Rappel activé", "Tu recevras une notification chaque jour à 20h.");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.accent }]}>
        Activer un rappel quotidien
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={scheduleNotification}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Activer le rappel à 20h
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
