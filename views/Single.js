import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';

import PropTypes from 'prop-types';

const Single = ({route, navigation}) => {
  const {filename, title, description} = route.params;
  console.log('image2:' + filename);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: filename}}
        style={{
          width: '100%',
          height: '50%',
          aspectRatio: 1,
          resizeMode: 'contain'}}
      />
      <Text style={styles.item}>{title}</Text>
      <Text style={styles.item}>{description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  item: {
    padding: 5,
  },
});

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
