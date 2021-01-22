import {Button, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {getUser, login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

import useSignInForm from '../hooks/LoginHooks';
import FormTextInput from '../components/FormTextInput';

const Form = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);

  const doLogin = async () => {
    const request = await login(inputs.username, inputs.password);

    if (request.token == undefined) {
      if (request == undefined) {
        alert('Authentication failed');
        console.error('Authentication failed');
        return;
      }
      alert(request.message);
      console.error(request.message);
      return;
    }

    const token = request.token;

    const userDetails = await getUser(token); // Check that the token works
    if (userDetails.user_id == undefined) {
      if (userDetails == undefined) {
        alert('Retrieving user details failed');
        console.error('Retrieving user details failed');
        return;
      }
      alert(userDetails.message);
      console.error(userDetails.message);
      return;
    }

    setUser(userDetails);

    AsyncStorage.setItem('userToken', token, (e) => {
      if (e != undefined) {
        console.error(e.message);
        return;
      }

      setIsLoggedIn(true); // Let listeners know data is ready to be read.

      alert(request.message);
      console.log(request.message);

      console.log('Entering Home screen');
      navigation.navigate('Home');
    });
  };

  // makes inputs and handleInput change visible from LoginHooks.js
  const {inputs, handleInputChange} = useSignInForm();

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
      <Button title='Login!' onPress={doLogin} />
    </View>
  );
};

Form.propTypes = {
  mediaArray: PropTypes.array,
  navigation: PropTypes.object,
};

export default Form;
