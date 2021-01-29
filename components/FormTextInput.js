import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import React from 'react';

const FormTextInput = ({style, ...otherProps}) => {
  return <Input style={[styles.textInput, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
  },
});

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
