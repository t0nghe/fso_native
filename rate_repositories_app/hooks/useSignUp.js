import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../meta/queries';
import { useState } from 'react';

const useSignUp = () => {
  const [mutateCreateUser] = useMutation(CREATE_USER, {fetchPolicy: 'cache-and-network'});
  const [status, setStatus] = useState(null);

  const signUpMutation = async ({ username, password }) => {

    let result;
    try {
      result = await mutateCreateUser({variables: {
          username,
          password
      }});
    } catch (err) {
      throw new Error(err.message);
    }
      
    if (result.data) {
      setStatus('success');
    }
  };

  return [signUpMutation, status];
};

export default useSignUp;