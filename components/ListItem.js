import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {url} from '../hooks/ApiHooks';

// eslint-disable-next-line no-unused-vars
const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', singleMedia);
      }}
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        marginBottom: 5,
      }}
    >
      <Image
        style={{width: 100, height: 150, margin: 10}}
        source={{uri: url + '/uploads/' + singleMedia.thumbnail}}
      />
      <View style={{flex: 1, height: 150, margin: 10}}>
        <Text style={{fontWeight: 'bold'}}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};


ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};


export default ListItem;
