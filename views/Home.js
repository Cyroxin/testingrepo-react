import {StatusBar} from 'expo-status-bar';
import List from '../components/List';
import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView} from 'react-native';

import PropTypes from 'prop-types';

const url =
  'https://raw.githubusercontent.com/Cyroxin/testingrepo-react/week1-http-a/data/cats.json';


const Home = ({navigation}) => {
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
    <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0}}>
      <StatusBar style='auto' />
      <List mediaArray={mediaArray} navigation={navigation} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
