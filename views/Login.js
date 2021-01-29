import React, {useContext, useEffect} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

import LoginForm from '../components/LoginForm';

import {Text, Button} from 'react-native-elements';
import {ScrollView} from 'react-native';

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
    <KeyboardAvoidingView
      style={{backgroundColor: '#fff', width: '100%', height: '100%'}}
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#fff',
          alignItems: 'center',
        }}
      >
        <Text h1 style={{padding: 10}}>
          Login
        </Text>
        <LoginForm navigation={navigation} />
        <Button
          title='No account yet?'
          type='clear'
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
