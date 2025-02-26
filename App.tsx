import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import Home from './src/views/Home';
import Navigator from './src/navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaProvider>
      <Navigator />
      <Text>Hello, React Native!</Text>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
