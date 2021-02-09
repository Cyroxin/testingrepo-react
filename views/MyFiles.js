import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';


import PropTypes from 'prop-types';
import {getUserMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import ListItem from '../components/ListItem';
import {FlatList} from 'react-native-gesture-handler';


const Myfiles = ({navigation}) => {
  const {user} = useContext(MainContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        data={getUserMedia(user.user_id)}
        keyExtractor={(item, index) => index.toString()}
        style={{flex: 1, width: '100%'}}
        renderItem={({item}) => (
          <ListItem navigation={navigation} singleMedia={item} edit={true} />
        )}
      />

      <StatusBar style='auto'></StatusBar>
    </SafeAreaView>
  );
};

Myfiles.propTypes = {
  navigation: PropTypes.object,
};

export default Myfiles;
