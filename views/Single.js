/* eslint-disable camelcase */
import React, {useContext, useEffect} from 'react';
import {Card} from 'react-native-elements';

import PropTypes from 'prop-types';
import {getUser, url} from '../hooks/ApiHooks';
import {View} from 'react-native';

import MaterialCommunityIcons from
  'react-native-vector-icons/MaterialCommunityIcons';
import {Video} from 'expo-av';
import {MainContext} from '../contexts/MainContext';


const Single = ({route}) => {
  const {filename, title, description, media_type, user_id} = route.params;
  const {user} = useContext(MainContext);
  const [uploader, setUploader] = React.useState(null);

  useEffect(() => {
    getUser(user.token, user_id)
        .then((ret) => {
          setUploader(ret.username);
        })
        .catch(console.log);
  }, []);


  console.log('Showing: ' + url + '/uploads/' + filename);
  return (
    <Card>
      {
        media_type === 'image' ? (
          <Card.Image
            source={{uri: url + '/uploads/' + filename}}
            style={{
              aspectRatio: 1,
              resizeMode: 'contain',
              width: '100%',
              height: 400,
            }}
          />
        ) : (
          <Video
            source={{
              uri: url + '/uploads/' + filename,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode='cover'
            useNativeControls
            style={{width: '100%', height: 400, alignSelf: 'center'}}
          />
        )
      }
      <View style={{marginLeft: 50}}>
        <Card.Title style={{textAlign: 'left'}}>{title}</Card.Title>
        <Card.FeaturedSubtitle style={{color: '#000'}}>
          {description}
        </Card.FeaturedSubtitle>
        <Card.FeaturedSubtitle style={{color: '#000', fontStyle: 'italic'}}>
          {'uploaded by: ' + uploader}
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
