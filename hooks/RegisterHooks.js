import {useState} from 'react';
import {validator} from '../utils/validator';
import {userExists} from './ApiHooks';

const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const handleInputChange = (name, text) => {
    console.log(name, text);

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });

    if (name == 'confirmPassword') {
      console.log(inputs.password);
      if (text != inputs.password) {
        setErrors((errors) => {
          return {
            ...errors,
            ['password']: errors.password == undefined ?
             'Passwords do not match' : errors.password,
          };
        });
      } else {
        setErrors((errors) => {
          return {
            ...errors,
            ['password']: errors.password == 'Passwords do not match' ?
            undefined : errors.password,
          };
        });
      }
      return;
    }

    const result = validator(name, text, constraints);
    console.log('Validator: ' + name + ' - ' + text + ' - ' + result );

    if (name == 'username' && result == undefined) {
      userExists(text).then((result) => {
        if (result == true) {
          setErrors((errors) => {
            return {
              ...errors,
              [name]: 'Username already exists',
            };
          });
        } else {
          setErrors((errors) => {
            return {
              ...errors,
              [name]: undefined,
            };
          });
        }
      });
    } else if (
      name == 'password' &&
      errors.password == 'Passwords do not match'
    ) {
      return;
    } else {
      setErrors((errors) => {
        return {
          ...errors,
          [name]: result,
        };
      });
    }
  };

  const constraints = {
    username: {
      presence: true,
      length: {
        minimum: 3,
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 5,
      },
    },
    email: {
      email: true,
    },
    full_name: {
      format: {
        pattern: '^$|^[a-zA-Z\\s]+',
        flags: 'i',
        message: 'can only contain normal letters',
      },
    },
  };


  return {
    handleInputChange,
    inputs,
    errors,
  };
};

export default useSignUpForm;
