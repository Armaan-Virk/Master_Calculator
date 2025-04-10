import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide default top bar to match Figma style
      }}
    />
  );
}
