// TODO: add necessary imports

// Hidden file, which provides the api url as a string.
// Contains the following line: export default 'http://api.domain.name.here.com/api/';
import {useEffect, useState} from 'react';
import url from '../data/apiurl';

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

export {url, getUser, getUsers, getMedia, login, register};
