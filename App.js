/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const mediaArray = [
  {
    key: '0',
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    thumbnails: {
      w160: 'http://placekitten.com/160/161',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Title 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/164',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Title 3',
    description:
      'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/167',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

const App = () => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === 'android' ? 25 : 0,
      }}
    >
      <StatusBar style="auto" />
      <FlatList
        data={mediaArray}
        style={{margin: 0, padding: 0}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'lightgray',
                marginBottom: 5,
              }}
            >
              <Image
                style={{width: 100, height: 150, margin: 10}}
                source={{uri: item.thumbnails.w160}}
              />
              <View style={{flex: 1, height: 150, margin: 10, overflow: 'hidden'}}>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
