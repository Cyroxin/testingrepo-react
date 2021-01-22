import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {isLoggedIn} = useContext(MainContext);


  useEffect(() => {
    // IsLoggedIn will look for an active auth from context or storage.
    if (isLoggedIn) {
      console.log('Entering Home screen');
      navigation.navigate('Home');
    }
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={{padding: 10}}>Login</Text>
      <LoginForm navigation={navigation} />
      <Text style={{padding: 10}}>Register</Text>
      <RegisterForm navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
