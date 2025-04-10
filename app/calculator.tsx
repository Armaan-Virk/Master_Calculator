import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';
import CalculatorButton from '../components/CalculatorButton';

export default function CalculatorScreen() {
  const { input, result, appendValue, clear, calculate } = useCalculator();
  const buttons = ['7','8','9','/', '4','5','6','*', '1','2','3','-', '0','.','=','+', 'C'];

  const handlePress = (value: string) => {
    if (value === '=') calculate();
    else if (value === 'C') clear();
    else appendValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.input}>{input}</Text>
      <Text style={styles.result}>{result}</Text>
      <FlatList
        data={buttons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CalculatorButton label={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  input: { fontSize: 24, minHeight: 50, color: '#333' },
  result: { fontSize: 32, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
});