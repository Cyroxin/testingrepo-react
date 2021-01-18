import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single');
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
        source={{uri: singleMedia.thumbnails.w160}}
      />
      <View style={{flex: 1, height: 150, margin: 10, overflow: 'hidden'}}>
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
