import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const appendValue = (value: string) => {
    setInput(prev => prev + value);
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  const calculate = () => {
    try {
      const evalResult = eval(input); // Use a safe parser like math.js in production
      const final = evalResult.toString();
      setResult(final);
      saveToHistory(`${input} = ${final}`);
    } catch (e) {
      setResult('Error');
    }
  };

  const saveToHistory = async (entry: string) => {
    try {
      const existing = await AsyncStorage.getItem('calc_history');
      const history = existing ? JSON.parse(existing) : [];
      history.unshift(entry);
      await AsyncStorage.setItem('calc_history', JSON.stringify(history.slice(0, 20)));
    } catch (e) {
      console.log('Error saving to history:', e);
    }
  };

  return {
    input,
    result,
    appendValue,
    clear,
    calculate,
  };
}
