import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
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
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculation History:</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
  },
});
