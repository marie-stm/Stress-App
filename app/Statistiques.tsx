import React from 'react';
import {
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import type { ChartData } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;

const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const humeurData: ChartData = {
  labels,
  datasets: [{ data: [3, 4, 2, 5, 3, 4, 1] }],
};

const exerciceData: ChartData = {
  labels,
  datasets: [{ data: [1, 0, 1, 1, 0, 1, 0] }],
};

const journalData: ChartData = {
  labels,
  datasets: [{ data: [1, 1, 0, 1, 1, 0, 0] }],
};

export default function Statistiques() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(166, 123, 91, ${opacity})`,
    labelColor: () => colors.text,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.accent,
    },
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🔙 Retour */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}
      >
        <Ionicons name="chevron-back" size={28} color={colors.accent} />
      </TouchableOpacity>

      <View style={{ marginTop: 80 }}>
        <Text style={[styles.title, { color: colors.accent }]}>📊 Statistiques Hebdo</Text>

        <Text style={[styles.subtitle, { color: colors.text }]}>😄 Humeur moyenne</Text>
        <LineChart
          data={humeurData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        <Text style={[styles.subtitle, { color: colors.text }]}>🧘 Exercices réalisés</Text>
        <BarChart
          data={exerciceData}
          width={screenWidth - 32}
          height={200}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          style={styles.chart}
        />

        <Text style={[styles.subtitle, { color: colors.text }]}>📓 Journal rempli</Text>
        <BarChart
          data={journalData}
          width={screenWidth - 32}
          height={200}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
