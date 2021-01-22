import {TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const FormTextInput = ({style, ...otherProps}) => {
  return <TextInput style={[styles.textInput, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: 200,
  },
});

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
