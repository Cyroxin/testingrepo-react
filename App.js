/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import {
  StatusBar,
} from 'expo-status-bar';
import List from './components/List';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';

const url =
  'https://raw.githubusercontent.com/Cyroxin/testingrepo-react/week1-http-a/data/cats.json';

const App = () => {
  const [mediaArray, setmediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setmediaArray(json);
    } catch (exp) {
      console.log(exp.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <StatusBar style='auto' />
      <List mediaArray= {mediaArray} />
    </SafeAreaView>
  );
};

export default App;
