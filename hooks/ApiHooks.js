// TODO: add necessary imports

// Hidden file, which provides the api url as a string.
// Contains the following line: export default 'http://api.domain.name.here.com/api/';
import {useEffect, useState} from 'react';
import url from '../utils/apiurl';
const appIdentifier = 'cyroxin';

import axios from 'axios';
import {Platform} from 'react-native';

// Gets a list of media
const getMedia = () => {
  const [getMediaArray, setMediaArray] = useState();

  const init = async () => {
    try {
      const response = await fetch(url + '/media');
      const json = await response.json();

      // Add thumbnail to each json array element
      json.forEach((value, index) => {
        // eslint-disable-next-line no-prototype-builtins
        if (value.hasOwnProperty('filename')) {
          const thumbnail =
            value.filename.substring(0, value.filename.lastIndexOf('.')) +
              '-tn160.png' || value.filename;

          json[index].thumbnail = thumbnail;
          console.log(json[index]);
        } else json[index].thumbnail = '';
      });

      setMediaArray(json);
    } catch (exp) {
      console.log(exp.message);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return getMediaArray;
};

// Gets a list of media
const getMyMedia = () => {
  const [getMediaArray, setMediaArray] = useState();

  const init = async () => {
    try {
      const response = await fetch(url + `/tags/${appIdentifier}`);
      const json = await response.json();

      // Add thumbnail to each json array element
      json.forEach((value, index) => {
        // eslint-disable-next-line no-prototype-builtins
        if (value.hasOwnProperty('filename')) {
          const thumbnail =
            value.filename.substring(0, value.filename.lastIndexOf('.')) +
              '-tn160.png' || value.filename;

          json[index].thumbnail = thumbnail;
          console.log(json[index]);
        } else json[index].thumbnail = '';
      });

      setMediaArray(json);
    } catch (exp) {
      console.log(exp.message);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return getMediaArray;
};

// Upload media with a title and optionally a description
const uploadMedia = async (token, file, title, description = undefined) => {
  const init = async () => {
    const data = new FormData();
    data.append('title', title);
    description != null && description.length != 0 &&
     data.append('description', description);
    data.append('file', {
      uri: Platform.OS === 'android' ? file : file.replace('file://', ''),
      type: 'image/jpeg',
      name: 'filename',
    });

    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      data: data,
      url: url + '/media',
    };

    try {
      const response = await axios(options);
      const data = response.data;
      console.log(data);
      if (data && data.file_id != undefined) {
        setTimeout(async () => {
          const idr = await uploadTag(token, response.file_id, appIdentifier);
          console.log(idr);
        }, 2000);
        return data;
      } else {
        return data;
      }
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

// Find tags by string. Returns empty array on not found.
const uploadTag = async (token, fileId, tag_) => {
  const init = async () => {
    try {
      const response = await axios.post(
          url + '/tags',
          {
            file_id: fileId,
            tag: tag_,
          },
          {headers: {'x-access-token': token,
            'content-type': 'application/json'}},
      ).catch(console.log);

      console.log(response);

      const json = await response.json();

      return json;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

// Find tags by string. Returns empty array on not found.
const searchTags = async (query) => {
  const init = async () => {
    console.log('Query: '+query);
    try {
      const response = await fetch(url + `/tags/${query}`);
      const json = await response.json();

      return json;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

// Gets url of profile picture from user id.
const getProfilePicture = (userid) => {
  const [getProfilePicture, setProfilePicture] = useState();

  const init = async () => {
    try {
      const tags = await searchTags(`avatar_${userid}`);
      console.log(tags);
      if (
        tags != undefined &&
        tags[0] != undefined &&
        tags[0].filename != undefined
      ) {
        setProfilePicture(url + '/uploads/' + tags[0].filename);
      }
    } catch (exp) {
      console.log(exp.message);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return getProfilePicture;
};

// Returns token if logged in.
const login = async (username, password) => {
  const init = async () => {
    const data = {'username': username, 'password': password};

    try {
      const response = await fetch(url + `/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      const json = await response.json();

      return json;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

// Returns token if registered.
const register = async (username, password, email, full_name = '') => {
  const init = async () => {
    const data = {
      username: username,
      password: password,
      email: email,
      full_name: full_name,
    };

    try {
      const response = await fetch(url + `/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      const json = await response.json();

      return json;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

// Returns true if exists, false otherwise.
const userExists = async (username) => {
  const init = async () => {
    try {
      const response = await fetch(url + `/users/username/${username}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });

      const json = await response.json();


      const available = json.available != undefined && json.available == true;

      return !available;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};


// Returns user data.
// Either of a specific ID or logged in user's data.
const getUser = async (token, id = null) => {
  const init = async () => {
    const headers = new Headers();
    headers.append('x-access-token', token);

    if (id == undefined) {
      try {
        const response = await fetch(url + `/users/user`, {
          method: 'GET',
          headers: headers,
        });

        const json = await response.json();

        return json;
      } catch (exp) {
        console.log(exp.message);
      }
    } else if (id != undefined) {
      try {
        const response = await fetch(url + `/users/${id}`, {
          method: 'GET',
          headers: headers,
        });

        const json = await response.json();

        return json;
      } catch (exp) {
        console.log(exp.message);
      }
    }
  };


  return await init();
};


// Returns data of all users.
const getUsers = async (token) => {
  const init = async () => {
    const headers = new Headers();
    headers.append('x-access-token', token);


    try {
      const response = await fetch(url + `/users`, {
        method: 'GET',
        headers: headers,
      });

      const json = await response.json();

      return json;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

export {url,
  getUser, getUsers, userExists,
  getMedia, getMyMedia, uploadMedia, searchTags, uploadTag,
  getProfilePicture, login, register};
