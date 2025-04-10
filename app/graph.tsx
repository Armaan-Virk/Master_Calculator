import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function GraphingScreen() {
  const [data, setData] = useState<number[]>([]);
  const [formula, setFormula] = useState('');

  const generateData = () => {
    const values: number[] = [];
    for (let x = 0; x <= 10; x++) {
      try {
        const y = eval(formula.replace(/x/g, `(${x})`));
        values.push(typeof y === 'number' ? y : 0);
      } catch {
        values.push(0);
      }
    }
    setData(values);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter expression like x*2"
        onChangeText={setFormula}
        style={styles.input}
      />
      <Button title="Plot Graph" onPress={generateData} />
      {data.length > 0 && (
        <LineChart
          data={{
            labels: Array.from({ length: 11 }, (_, i) => i.toString()),
            datasets: [{ data }]
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: () => '#007AFF',
          }}
          bezier
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
});