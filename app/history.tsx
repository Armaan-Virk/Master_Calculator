import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem('calc_history');
      if (stored) setHistory(JSON.parse(stored));
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculation History:</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 5 },
});
