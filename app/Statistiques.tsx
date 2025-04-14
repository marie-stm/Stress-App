import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function Statistiques() {
  const [studyData, setStudyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [unit, setUnit] = useState<'h' | 'min'>('h');
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();

  const handleDayPress = (index: number) => {
    setSelectedDayIndex(index);
    setInput(studyData[index].toString());
    setModalVisible(true);
  };

  const saveInput = () => {
    if (selectedDayIndex !== null) {
      const value = parseFloat(input) || 0;
      const newData = [...studyData];
      newData[selectedDayIndex] = unit === 'min' ? value / 60 : value;
      setStudyData(newData);
    }
    setModalVisible(false);
  };

  const radius = 130;
  const center = 180;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🖙 Retour */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}
      >
        <Ionicons name="chevron-back" size={28} color={colors.accent} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.accent, marginTop: 80 }]}>Temps passé à étudier</Text>

      <View style={styles.circleWrapper}>
        <View style={[styles.bigCircle, { borderColor: colors.card }]}/>

        {studyData.map((value, index) => {
          const angle = ((index - 1.75) / 7) * 2 * Math.PI; // align center top
          const x = center + radius * Math.cos(angle) - 35;
          const y = center + radius * Math.sin(angle) - 35;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayBubble, { top: y, left: x, backgroundColor: colors.accent }]}
              onPress={() => handleDayPress(index)}
            >
              <Text style={[styles.bubbleText, { color: colors.buttonText }]}>{Math.round(value * 10) / 10}</Text>
              <Text style={[styles.dayLabel, { color: colors.buttonText }]}>{daysOfWeek[index]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text, marginBottom: 10 }}>Temps d'étude :</Text>
            <TextInput
              keyboardType="numeric"
              value={input}
              onChangeText={setInput}
              style={[styles.input, {
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.accent,
              }]}
            />
            <View style={styles.unitSelector}>
              <TouchableOpacity
                style={[styles.unitButton, unit === 'h' && { backgroundColor: colors.accent }]}
                onPress={() => setUnit('h')}
              >
                <Text style={{ color: unit === 'h' ? colors.buttonText : colors.text }}>heures</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitButton, unit === 'min' && { backgroundColor: colors.accent }]}
                onPress={() => setUnit('min')}
              >
                <Text style={{ color: unit === 'min' ? colors.buttonText : colors.text }}>minutes</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.accent }]}
              onPress={saveInput}
            >
              <Text style={{ color: colors.buttonText }}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  circleWrapper: {
    width: 360,
    height: 360,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 10,
    borderColor: '#f5e9db',
  },
  dayBubble: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#aaa',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  bubbleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayLabel: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  unitSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  unitButton: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
});