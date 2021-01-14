import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const ListItem = (props) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        marginBottom: 5,
      }}
    >
      <Image
        style={{width: 100, height: 150, margin: 10}}
        source={{uri: props.singleMedia.thumbnails.w160}}
      />
      <View style={{flex: 1, height: 150, margin: 10, overflow: 'hidden'}}>
        <Text style={{fontWeight: 'bold'}}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};


ListItem.propTypes = {
  singleMedia: PropTypes.object,
};


export default ListItem;
