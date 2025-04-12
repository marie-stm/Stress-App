import React from 'react';
import { ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit';
import colors from '@/constants/Colors'; // Assure-toi que ce fichier existe avec les bonnes clés

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

const chartConfig = {
  backgroundGradientFrom: colors.card,
  backgroundGradientTo: colors.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(166, 123, 91, ${opacity})`, // #A67B5B
  labelColor: () => colors.text,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: colors.accent,
  },
};

export default function Statistiques() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Statistiques Hebdo</Text>

      <Text style={styles.subtitle}>😄 Humeur moyenne</Text>
      <LineChart
        data={humeurData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <Text style={styles.subtitle}>🧘 Exercices réalisés</Text>
      <BarChart
        data={exerciceData}
        width={screenWidth - 32}
        height={200}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={styles.chart}
      />

      <Text style={styles.subtitle}>📓 Journal rempli</Text>
      <BarChart
        data={journalData}
        width={screenWidth - 32}
        height={200}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={styles.chart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.accent,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 4,
    color: colors.text,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
