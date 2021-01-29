/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import React from 'react';
import { MainProvider } from './contexts/MainContext';
import Navigator from './navigators/Navigator';


const App = () => {
  return (
    <MainProvider><Navigator></Navigator></MainProvider>
  );
};

export default App;
