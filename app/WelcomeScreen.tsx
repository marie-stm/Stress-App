import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [isLoading, setIsLoading] = useState(true);
  const [existingUser, setExistingUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        setExistingUser(JSON.parse(data));
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const goToHome = () => {
    navigation.navigate('HomeMenu' as never);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setExistingUser(null);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {existingUser ? (
        <>
          <Text style={[styles.title, { color: colors.accent }]}>
            Bonjour, {existingUser.firstName} 👋
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={goToHome}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Continuer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#cccccc' }]}
            onPress={logout}
          >
            <Text style={[styles.buttonText, { color: colors.text }]}>
              Changer d’utilisateur
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.title, { color: colors.accent }]}>
          Aucun utilisateur enregistré.
        </Text>
      )}
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
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
