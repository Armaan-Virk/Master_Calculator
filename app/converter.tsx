import React, { useState } from 'react';
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { lengthUnits } from '../constants/units';

export default function ConverterScreen() {
  const [unitFrom, setUnitFrom] = useState('meters');
  const [unitTo, setUnitTo] = useState('kilometers');
  const [value, setValue] = useState('');
  const [converted, setConverted] = useState('');

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setConverted('Invalid input');
      return;
    }

    if (unitFrom === unitTo) {
      setConverted(val.toString());
    } else if (unitFrom === 'meters' && unitTo === 'kilometers') {
      setConverted((val / 1000).toString());
    } else if (unitFrom === 'kilometers' && unitTo === 'meters') {
      setConverted((val * 1000).toString());
    } else {
      setConverted('Conversion not supported');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Enter Value:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={text => {
            setValue(text);
            convert();
          }}
        />
        <Text>From:</Text>
        <Picker selectedValue={unitFrom} onValueChange={item => { setUnitFrom(item); convert(); }}>
          {lengthUnits.map(unit => (
            <Picker.Item key={unit.value} label={unit.label} value={unit.value} />
          ))}
        </Picker>
        <Text>To:</Text>
        <Picker selectedValue={unitTo} onValueChange={item => { setUnitTo(item); convert(); }}>
          {lengthUnits.map(unit => (
            <Picker.Item key={unit.value} label={unit.label} value={unit.value} />
          ))}
        </Picker>
        <Text style={{ marginTop: 10 }}>Result: {converted}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 },
});
