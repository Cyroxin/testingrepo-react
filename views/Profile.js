import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  console.log('profile', user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('userToken');
    props.navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      { user.full_name != undefined && <Text>Name: {user.full_name}</Text> }
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
