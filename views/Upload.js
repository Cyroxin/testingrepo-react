/* eslint-disable react/display-name */
import {Platform, View} from 'react-native';
import {Button, Image, Input} from 'react-native-elements';
import React, {useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

import useUploadForm from '../hooks/UploadHooks';

import * as ImagePicker from 'expo-image-picker';
import {updateMedia, uploadMedia} from '../hooks/ApiHooks';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';


const Upload = (props) => {
  const route = props.route;
  const navigation = props.navigation;

  const edit =
    route.params === undefined || route.params.edit === undefined ?
      0 :
      route.params.edit;

  // Save image when the user has uploaded
  const [editmode] = React.useState(
      (edit > 0 || edit < 0) && edit != null,
  );
  console.log('editId: ' + edit);
  const {user} = useContext(MainContext);

  const titleInput = useRef();
  const descriptionInput = useRef();

  // makes inputs and handleInput change visible from UploadHooks.js
  const {
    inputs,
    setInputs,
    errors,
    setErrors,
    handleInputChange,
  } = useUploadForm();

  // Save image when the user has uploaded
  const [image, setImage] = !editmode ?
    React.useState(null) :
    [undefined, undefined];


  console.log('editmode: ' + editmode);

  const doUpload = () => {
    console.log(image);
    // Validate form
    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const e = errors[key];
        if (!(e == null || e == '')) {
          alert('Invalid input, please fix errors first.');
          console.log('Invalid input, please fix errors first.');
          return;
        }
      }
    }

    if (!editmode) {
      uploadMedia(user.token, image, inputs.title, inputs.description)
          .then((ret) => {
            if (ret == undefined) {
              console.log('Uploading returned nothing');
              alert('Invalid upload, please check form.');
            } else if (ret.message == 'File uploaded') {
              resetForm;
              setTimeout(() => {
                navigation.goBack();
                console.log(ret.message != undefined ? ret.message : ret.error);
                alert(ret.message != undefined ? ret.message : ret.error);
              }, 2000);
            }
          })
          .catch(console.log);
    } else {
      updateMedia(user.token, edit, inputs.title, inputs.description)
          .then((ret) => {
            if (ret == undefined) {
              console.log('Modifying returned nothing');
              alert('Invalid modify, please check form.');
            } else if (ret.message == 'File info updated') {
              resetForm;
              setTimeout(() => {
                navigation.goBack();
                console.log(ret.message != undefined ? ret.message : ret.error);
                alert(ret.message != undefined ? ret.message : ret.error);
              }, 2000);
            }
          })
          .catch(console.log);
    }
  };

  if (!editmode) {
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  }

  const getImage = async () => {
    if (!editmode) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result.uri);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const resetForm = () => {
    titleInput.current.clear();
    descriptionInput.current.clear();
    const empty = {title: '', description: ''};
    setInputs(empty);
    setErrors(empty);
    !editmode && setImage(undefined);
  };

  return (
    <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
      <SafeAreaView style={{alignItems: 'center'}}>
        {!editmode && (
          <Image
            source={{uri: image}}
            style={{width: 200, height: 200}}
          ></Image>
        )}
        <Input
          autoCapitalize='none'
          placeholder='title'
          ref={titleInput}
          errorStyle={{color: 'red'}}
          errorMessage={errors.title}
          onChangeText={(txt) => handleInputChange('title', txt)}
          style={{textAlign: 'center'}}
        />
        <Input
          autoCapitalize='none'
          placeholder='description'
          ref={descriptionInput}
          errorStyle={{color: 'red'}}
          errorMessage={errors.description}
          onChangeText={(txt) => handleInputChange('description', txt)}
          style={{textAlign: 'center'}}
        />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {!editmode && (
            <Button
              title='Select'
              onPress={() => getImage()}
              style={{margin: 5}}
            />
          )}
          <Button
            title={!editmode ? 'Upload!' : 'Modify!'}
            onPress={doUpload}
            disabled={
              !editmode ? errors.title != null || image == null : false
            }
            style={{margin: 5}}
          />
          <Button title='Clear' onPress={resetForm} style={{margin: 5}} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Upload;
