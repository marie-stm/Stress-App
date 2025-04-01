import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧘‍♀️ Exercices de Relaxation</Text>

      {exercises.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Commencer</Text>
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
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 240,
    height: 320,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
