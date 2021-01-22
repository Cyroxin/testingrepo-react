import {Button, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {register} from '../hooks/ApiHooks';

const Form = ({mediaArray, navigation}) => {
  // makes inputs and handleInput change visible from RegisterHooks.js
  const {inputs, handleInputChange} = useSignUpForm();

  const doRegister = async () => {
    const serverResponse = await register(
        inputs.username,
        inputs.password,
        inputs.email,
        inputs.full_name);

    if (serverResponse.user_id == undefined) {
      if (serverResponse == undefined) {
        alert('Retrieving user details failed');
        console.error('Retrieving user details failed');
        return;
      }
    }

    alert(serverResponse.message);
    console.log(serverResponse.message);
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize='none'
        placeholder='username'
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='password'
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='email'
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='full name'
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title='Register!' onPress={doRegister} />
    </View>
  );
};

Form.propTypes = {
  mediaArray: PropTypes.array,
  navigation: PropTypes.object,
};


export default Form;
