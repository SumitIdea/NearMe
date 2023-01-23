import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
// import MainNavigator from './src/navigation/MainNavigator';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainNavigator from './screens/MainNavigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainNavigator />
    </SafeAreaView>
  );
};

export default App;