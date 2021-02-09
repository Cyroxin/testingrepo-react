import {FlatList, View} from 'react-native';
import React, {} from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = ({mediaArray, navigation, edit}) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <FlatList
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1, width: '100%'}}
        renderItem={({item}) => (
          <ListItem navigation={navigation}
            singleMedia={item}
            edit={edit}
          />
        )}
      />
    </View>
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
  navigation: PropTypes.object,
  edit: PropTypes.bool,
};

export default List;
