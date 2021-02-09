import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {deleteMedia, url} from '../hooks/ApiHooks';

import {Avatar, Button,
  ListItem as NEListItem} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';


const ListItem = ({singleMedia, navigation, edit}) => {
  const {user} = useContext(MainContext);

  return (
    <NEListItem
      bottomDivider
      onPress={
        edit ?
          () => {} :
          () => {
            navigation.navigate('Single', singleMedia);
          }
      }
    >
      <Avatar
        size='large'
        source={{uri: url + '/uploads/' + singleMedia.thumbnail}}
      />
      <NEListItem.Content>
        <NEListItem.Title>{singleMedia.title}</NEListItem.Title>
        <NEListItem.Subtitle>{singleMedia.description}</NEListItem.Subtitle>
      </NEListItem.Content>

      {edit && (
        <Button
          title='Modify'
          onPress={() => {
            navigation.navigate('Upload', {edit: singleMedia.file_id});
          }}
        />
      )}

      {edit && (
        <Button
          title='Delete'
          onPress={async () => {
            const resp = await deleteMedia(user.token, singleMedia.file_id);
            alert(resp.message);
            navigation.navigate('Home');
          }}
        />
      )}

      {/* View item => Chevron */}
      <NEListItem.Chevron
        onPress={
          !edit ?
            () => {} :
            () => {
              navigation.navigate('Single', singleMedia);
            }
        }
      />
    </NEListItem>
  );
};


ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  edit: PropTypes.bool,
};


export default ListItem;
