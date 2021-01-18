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
        backgroundColor: '#EEEEEE',
        margin: 10,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        borderRadius: 20,
        shadowColor: 'black',
      }}
    >
      <View style={{overflow: 'hidden'}}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            margin: 10,
          }}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={{flex: 1, height: 100, margin: 10, overflow: 'hidden'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'orange',
          }}
        >
          {props.singleMedia.title}
        </Text>
        <Text style={{color: 'black'}}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};


ListItem.propTypes = {
  singleMedia: PropTypes.object,
};


export default ListItem;
