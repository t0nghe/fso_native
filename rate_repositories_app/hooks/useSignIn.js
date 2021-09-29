import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../meta/queries';
import { useState, useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../meta/authStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutateAuthorize] = useMutation(AUTHORIZE, 
    {fetchPolicy: 'cache-and-network'});
  const [status, setStatus] = useState(null);
  const client = useApolloClient();

  const signInMutation = async ({ username, password }) => {

    let result;
    try {
      result = await mutateAuthorize({variables: {
          username,
          password
      }});
    } catch (err) {
      throw new Error(err.message);
    }
      
    if (result.data) {
      setStatus('success');
      const tokenString = result.data.authorize.accessToken;
      authStorage.setAccessToken(tokenString);
      await client.resetStore();
    }
  };

  return [signInMutation, status];
};

export default useSignIn;

export const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  const signOutUser = async () => {
    authStorage.removeAccessToken();
    await client.resetStore();
  };

  return signOutUser;
};