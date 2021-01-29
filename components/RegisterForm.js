import {View} from 'react-native';
import {Button} from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';

import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {register, userExists} from '../hooks/ApiHooks';

const Form = ({navigation}) => {
  // makes inputs and handleInput change visible from RegisterHooks.js
  const {inputs, handleInputChange, errors} = useSignUpForm();

  const doRegister = async () => {
    console.log(errors);

    // Check form
    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const e = errors[key];
        if (!(e == null || e == '')) {
          alert('Invalid input, please fix errors first.');
          console.log('Invalid input, please fix errors first.');
          return;
        }
      }
    }

    if (await userExists(inputs.username)) {
      alert('User already exists!');
      console.error('User already exists!');
      return;
    }

    const serverResponse = await register(
        inputs.username,
        inputs.password,
        inputs.email,
        inputs.full_name,
    );

    if (serverResponse.user_id == undefined) {
      if (serverResponse == undefined) {
        alert('Retrieving user details failed');
        console.error('Retrieving user details failed');
        return;
      }
      if (serverResponse.error != undefined) {
        alert(serverResponse.error);
        console.error(serverResponse.error);
      } else {
        alert(serverResponse.message);
        console.error(serverResponse.message);
      }
      return;
    }

    alert(serverResponse.message);
    console.log(serverResponse.message);
    navigation.goBack();
  };

  return (
    <View style={{width: '100%', maxWidth: 400}}>
      <FormTextInput
        autoCapitalize='none'
        placeholder='username'
        onChangeText={(txt) => handleInputChange('username', txt)}
        errorStyle={{color: 'red'}}
        errorMessage={errors.username}
      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='password'
        onChangeText={(txt) => handleInputChange('password', txt)}
        errorStyle={{color: 'red'}}
        errorMessage={errors.password}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='confirm password'
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='email'
        onChangeText={(txt) => handleInputChange('email', txt)}
        errorStyle={{color: 'red'}}
        errorMessage={errors.email}
      />
      <FormTextInput
        autoCapitalize='none'
        placeholder='full name'
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        errorStyle={{color: 'red'}}
        errorMessage={errors.full_name}
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
