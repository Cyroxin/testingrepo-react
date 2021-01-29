import React from 'react';
import {Platform} from 'react-native';
import {Card} from 'react-native-elements';

import PropTypes from 'prop-types';
import {url} from '../hooks/ApiHooks';
import {View} from 'react-native';

import MaterialCommunityIcons from
  'react-native-vector-icons/MaterialCommunityIcons';


const Single = ({route}) => {
  console.log(Platform.OS);
  const {filename, title, description} = route.params;
  console.log('Showing: ' + url + '/uploads/' + filename);
  return (
    <Card>
      <Card.Image
        source={{uri: url + '/uploads/' + filename}}
        style={{
          aspectRatio: 1,
          resizeMode: 'contain',
          width: '100%',
          height: 400,
        }}
      />
      <View style={{marginLeft: 50}}>
        <Card.Title style={{textAlign: 'left'}}>{title}</Card.Title>
        <Card.FeaturedSubtitle style={{color: '#000'}}>
          {description}
        </Card.FeaturedSubtitle>
        <MaterialCommunityIcons
          style={{position: 'absolute', left: -50}}
          name='image-outline'
          size={26}
        />
      </View>
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
