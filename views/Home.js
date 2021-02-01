import {StatusBar} from 'expo-status-bar';
import List from '../components/List';
import React, {} from 'react';
import {SafeAreaView} from 'react-native';


import PropTypes from 'prop-types';
import {getMyMedia} from '../hooks/ApiHooks';


const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'}}>
      <StatusBar> </StatusBar>
      <List mediaArray={getMyMedia()} navigation={navigation} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
