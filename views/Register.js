import React, {} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';

import RegisterForm from '../components/RegisterForm';

import {Text, Button} from 'react-native-elements';
import {ScrollView} from 'react-native';

const Register = ({navigation}) => {
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
          Register
        </Text>
        <RegisterForm navigation={navigation} />
        <Button
          title='Already have an account?'
          type='clear'
          onPress={() => {
            navigation.goBack();
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Register.propTypes = {
  navigation: PropTypes.object,
};

export default Register;
