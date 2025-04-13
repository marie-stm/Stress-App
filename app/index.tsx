import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [existingUser, setExistingUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        setExistingUser(JSON.parse(data));
        setTimeout(() => navigation.navigate('HomeMenu' as never), 1000);
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const registerUser = async () => {
    if (!firstName || !lastName || !password) return;
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({ firstName, lastName, password })
    );
    navigation.navigate('HomeMenu' as never);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (existingUser) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.accent }]}>
          Bonjour, {existingUser.firstName} 👋
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.accent }]}>Bienvenue !</Text>

      <TextInput
        placeholder="Prénom"
        placeholderTextColor={colors.placeholder}
        value={firstName}
        onChangeText={setFirstName}
        style={[styles.input, {
          backgroundColor: colors.card,
          color: colors.text,
          borderColor: colors.accent,
        }]}
      />
      <TextInput
        placeholder="Nom"
        placeholderTextColor={colors.placeholder}
        value={lastName}
        onChangeText={setLastName}
        style={[styles.input, {
          backgroundColor: colors.card,
          color: colors.text,
          borderColor: colors.accent,
        }]}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor={colors.placeholder}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={[styles.input, {
          backgroundColor: colors.card,
          color: colors.text,
          borderColor: colors.accent,
        }]}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={registerUser}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>S'inscrire</Text>
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
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
