import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import Home from './src/views/Home';
import Navigator from './src/navigators/Navigator';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
      <Text>Hello, React Native!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
  },
});

export default App;
