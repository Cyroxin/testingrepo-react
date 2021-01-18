import {FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = ({mediaArray, navigation}) => {
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem
          // eslint-disable-next-line react/prop-types
          navigation={navigation}
          singleMedia={item} />
      )}
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
  navigation: PropTypes.object,
};

export default List;
