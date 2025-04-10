import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function GraphingScreen() {
  const [data, setData] = useState<number[]>([]);
  const [formula, setFormula] = useState('');

  const generateData = () => {
    const values: number[] = [];
    const cleanFormula = formula.toLowerCase();  // <--- convert to lowercase
    for (let x = 0; x <= 10; x++) {
      try {
        const y = eval(cleanFormula.replace(/x/g, `(${x})`)); 
        values.push(typeof y === 'number' && !isNaN(y) ? y : 0);
      } catch {
        values.push(0);
      }
    }
    setData(values);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeContainer}>
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
                backgroundGradientFrom: '#f9f9f9',
                backgroundGradientTo: '#f9f9f9',
                decimalPlaces: 2,
                color: () => '#007AFF',
              }}
              bezier
              style={{ marginTop: 20 }}
            />
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, width: 250, padding: 8, backgroundColor: 'white' },
});
