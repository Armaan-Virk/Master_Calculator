import React, { useState } from 'react';
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { lengthUnits } from '../constants/units'; // <-- Your units (Meters, Kilometers, Centimeters)

export default function Converter() {
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

    // Conversion logic
    if (unitFrom === unitTo) {
      setConverted(val.toString());
    } else if (unitFrom === 'meters' && unitTo === 'kilometers') {
      setConverted((val / 1000).toString());
    } else if (unitFrom === 'kilometers' && unitTo === 'meters') {
      setConverted((val * 1000).toString());
    } else if (unitFrom === 'meters' && unitTo === 'centimeters') {
      setConverted((val * 100).toString());
    } else if (unitFrom === 'centimeters' && unitTo === 'meters') {
      setConverted((val / 100).toString());
    } else if (unitFrom === 'kilometers' && unitTo === 'centimeters') {
      setConverted((val * 100000).toString());
    } else if (unitFrom === 'centimeters' && unitTo === 'kilometers') {
      setConverted((val / 100000).toString());
    } else {
      setConverted('Conversion not supported');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Enter Value:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={(text) => {
            setValue(text);
            convert();
          }}
        />

        <Text style={styles.label}>From:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={unitFrom}
            onValueChange={(itemValue) => {
              setUnitFrom(itemValue);
              convert();
            }}
          >
            {lengthUnits.map((unit) => (
              <Picker.Item key={unit.value} label={unit.label} value={unit.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>To:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={unitTo}
            onValueChange={(itemValue) => {
              setUnitTo(itemValue);
              convert();
            }}
          >
            {lengthUnits.map((unit) => (
              <Picker.Item key={unit.value} label={unit.label} value={unit.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.result}>Result: {converted}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
