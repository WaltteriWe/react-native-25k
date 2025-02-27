import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './src/contexts/UserContext';
import Navigator from './src/navigators/Navigator';

const App = () => {
  console.log('App loaded!');
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
