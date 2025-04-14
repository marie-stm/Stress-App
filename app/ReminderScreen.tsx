import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
  Platform,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function ReminderScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // 📥 Recevoir les notifications même quand l’app est active
  const notificationListener = useRef<any>();

  useEffect(() => {
    const setup = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission refusée",
          "L'application ne pourra pas envoyer de rappels."
        );
      }

      // Écouter la réception
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log("🔔 Notification reçue :", notification);
      });
    };

    setup();

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
    };
  }, []);

  const onChange = (_event: any, selectedTime?: Date) => {
    setShowPicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🧘 Respire un peu !",
        body: "C'est le moment de faire un exercice de relaxation.",
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });

    Alert.alert(
      "Rappel activé",
      `Tu recevras une notification chaque jour à ${time.getHours()}h${time.getMinutes().toString().padStart(2, '0')}.`
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
        Choisis une heure pour ton rappel
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Sélectionner l’heure
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour
          onChange={onChange}
        />
      )}

      <Text style={{ marginTop: 20, fontSize: 16, color: colors.text }}>
        Heure choisie : {time.getHours()}h{time.getMinutes().toString().padStart(2, '0')}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent, marginTop: 30 }]}
        onPress={scheduleNotification}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Activer le rappel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
