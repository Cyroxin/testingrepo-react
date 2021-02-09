/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute,
  NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';

import MaterialCommunityIcons from
  'react-native-vector-icons/MaterialCommunityIcons';
import Upload from '../views/Upload';
import Myfiles from '../views/MyFiles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            case 'Upload':
              iconName = 'image';
              break;
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name='Home' component={Home} unmountOnBlur={true} />
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen
        name='Upload'
        component={Upload}
        initialParams={{edit: 0}}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name='Home'
            component={TabScreen}
            options={({route}) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
            })}
          />
          <Stack.Screen name='Single' component={Single} />
          <Stack.Screen name='MyFiles' component={Myfiles} />
          <Stack.Screen name='Upload' component={Upload} />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Login'
            component={Login}
            options={() => ({
              headerShown: false,
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

export default Navigator;
