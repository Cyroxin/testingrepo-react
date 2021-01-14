// TODO: add necessary imports

// Hidden file, which provides the api url as a string.
// Contains the following line: export default 'http://api.domain.name.here.com/api/';
import {useEffect, useState} from 'react';
import url from '../data/apiurl';

const useLoadMedia = () => {
  const [mediaArray, setmediaArray] = useState([]);


  const loadMedia = async () => {
    try {
      const response = await fetch(url + 'media');
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

      setmediaArray(json);
    } catch (exp) {
      console.log(exp.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return mediaArray;
};

export {useLoadMedia};
