import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import AsyncStorage from '@react-native-community/async-storage';
import {getUser} from '../hooks/ApiHooks';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    AsyncStorage.getItem('userToken').then((token) => {
      if (token != undefined) {
        console.log('Found context token: ', token);
        getUser(token).then((user) => {
          setUser({...user, token: token});
          setIsLoggedIn(true);
        });
      } else {
        console.log('Could not find pre-existing token');
      }
    });
  }, []);


  return (
    <MainContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
