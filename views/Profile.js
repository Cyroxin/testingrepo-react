import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text, Button, Card} from 'react-native-elements';

import MaterialCommunityIcons from
  'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getProfilePicture} from '../hooks/ApiHooks';

const Profile = (props) => {
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('userToken');
    props.navigation.navigate('Login');
  };

  const {setIsLoggedIn, user} = useContext(MainContext);


  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Text h1>Profile</Text>
      <Card>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='account' size={26} />
          <Text style={{paddingLeft: 5}}>Username: {user.username}</Text>
        </View>
        <Card.Divider style={{marginVertical: 5}}></Card.Divider>
        <Card.Image
          source={{uri: getProfilePicture(user.user_id)}}
          style={{
            aspectRatio: 1,
            resizeMode: 'contain',
            width: '100%',
            height: 300,
          }}
        />
        <Card.Divider style={{marginVertical: 5}}></Card.Divider>
        {user.full_name != undefined && <Text>Name: {user.full_name}</Text>}
        <Text>Email: {user.email}</Text>
        <Card.Divider style={{marginVertical: 5}}></Card.Divider>
        <Button title={'Logout'} onPress={logout} />
      </Card>
    </ScrollView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
