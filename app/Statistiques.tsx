import React from 'react';
import { ScrollView, Text, Dimensions, View } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const humeurData = [3, 4, 2, 5, 3, 4, 1];
const exerciceData = [1, 0, 1, 1, 0, 1, 0];
const journalData = [1, 1, 0, 1, 1, 0, 0];

const chartConfig = {
  backgroundGradientFrom: '#1c1c1c', // noir/gris foncé
  backgroundGradientTo: '#1c1c1c',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange
  labelColor: () => '#ffffff', // texte en blanc
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

export default function Statistiques() {
  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#1c1c1c' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>
        📊 Statistiques Hebdo
      </Text>

      {/* Humeur */}
      <Text style={{ fontSize: 18, marginBottom: 4, color: 'white' }}>😄 Humeur moyenne</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: humeurData }],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      {/* Exercices */}
      <Text style={{ fontSize: 18, marginTop: 16, color: 'white' }}>🧘 Exercices réalisés</Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [{ data: exerciceData }],
        }}
        width={screenWidth - 32}
        height={200}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      {/* Journal */}
      <Text style={{ fontSize: 18, marginTop: 16, color: 'white' }}>📓 Journal rempli</Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [{ data: journalData }],
        }}
        width={screenWidth - 32}
        height={200}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </ScrollView>
  );
}
