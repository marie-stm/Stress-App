import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff7a00" />
      </View>
    );
  }

  if (existingUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bonjour, {existingUser.firstName} 👋</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>
      <TextInput
        placeholder="Prénom"
        placeholderTextColor="#ccc"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nom"
        placeholderTextColor="#ccc"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#ccc"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, color: '#ff7a00', marginBottom: 20 },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff7a00',
  },
  button: {
    backgroundColor: '#ff7a00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
