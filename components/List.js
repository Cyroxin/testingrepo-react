import {FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

// eslint-disable-next-line no-unused-vars
const List = (props) => {
  return (
    <FlatList
      data={props.mediaArray}
      keyExtractor={(item, index) => index.toString() }
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
