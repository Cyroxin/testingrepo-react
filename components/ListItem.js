import React from 'react';
import PropTypes from 'prop-types';
import {url} from '../hooks/ApiHooks';

import {Avatar, ListItem as NEListItem} from 'react-native-elements';


const ListItem = ({singleMedia, navigation}) => {
  return (
    <NEListItem bottomDivider onPress={() => {
      navigation.navigate('Single', singleMedia);
    }}>
      <Avatar size="large"
        source={{uri: url + '/uploads/' + singleMedia.thumbnail}} />
      <NEListItem.Content>
        <NEListItem.Title>{singleMedia.title}</NEListItem.Title>
        <NEListItem.Subtitle>{singleMedia.description}</NEListItem.Subtitle>
      </NEListItem.Content>
      <NEListItem.Chevron />
    </NEListItem>
    /*
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
    */
  );
};


ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};


export default ListItem;
