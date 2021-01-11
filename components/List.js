import {FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

// eslint-disable-next-line no-unused-vars
const List = (props) => {
  return (
    <FlatList
      data={props.mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {
  singleMedia: PropTypes.object,
};

export default List;
