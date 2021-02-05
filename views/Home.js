import List from '../components/List';
import React, {} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';


import PropTypes from 'prop-types';
import {getMyMedia} from '../hooks/ApiHooks';


const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'}}>
      <List mediaArray={getMyMedia()} navigation={navigation} />
      <StatusBar style="auto"></StatusBar>
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
