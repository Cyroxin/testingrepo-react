/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import { StatusBar } from 'expo-status-bar';
import List from './components/List';
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { useLoadMedia } from './hooks/ApiHooks';

const App = () => {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <StatusBar style='auto' />
      <List mediaArray={useLoadMedia()} />
    </SafeAreaView>
  );
};

export default App;
