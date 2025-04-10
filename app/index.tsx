import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Master Calculator</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/calculator')}>
        <Text style={styles.buttonText}>Basic Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/converter')}>
        <Text style={styles.buttonText}>Unit Converter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/graph')}>
        <Text style={styles.buttonText}>Graph Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/history')}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A6FA5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4A6FA5',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
