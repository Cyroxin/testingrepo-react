import {useState} from 'react';
import {validator} from '../utils/validator';

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (name, text) => {
    console.log(name, text);

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });

    const result = validator(name, text, constraints);
    console.log('Validator: ' + name + ' - ' + text + ' - ' + result);


    setErrors((errors) => {
      return {
        ...errors,
        [name]: result,
      };
    });
  };

  const constraints = {
    title: {
      presence: true,
      length: {
        minimum: 3,
      },
    },
    description: {
      length: {
        minimum: 0,
      },
    },
  };

  return {
    handleInputChange,
    inputs,
    setInputs,
    errors,
    setErrors,
  };
};

export default useUploadForm;
