import { Link, Stack } from 'expo-router';
import { StyleSheet, useColorScheme, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedText type="title">Cette page n'existe pas.</ThemedText>
        <Link href="/" style={[styles.link, { backgroundColor: colors.accent }]}>
          <ThemedText type="link">Retour à l’accueil</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
