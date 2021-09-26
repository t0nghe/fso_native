import React from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { useState } from 'react';
import { useHistory } from "react-router-native";

const validationSchema = yup.object().shape(
  {
    password: yup.string().min(6, "Password should contain at least 6 characters.").required("Password is required."),
    username: yup.string().min(3, 'Username should contain at least 3 characters.').required("Username is required.")
  }
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: 50,
    textAlign: "center"
  },
  inputField: {
    backgroundColor: "white",
    height: 30,
    width: 200,
    borderRadius: 3,
    margin: 3,
    padding: 5
  },
  submitButton: {
    backgroundColor: "blue",
    color: "white",
    height: 30,
    width: 200,
    borderRadius: 3
  },
  errorText: {
    color: "#d73a4a",
    fontSize: 11
  }
});

const initialValues = {
  username: '',
  password: ''
};

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username');
  const [passwordField, passwordMeta, passwordHelpers] = useField('password');

  return (<View style={styles.container}>
    <TextInput placeholder="username" value={usernameField.value} onChangeText={text => usernameHelpers.setValue(text)} style={styles.inputField} autoCapitalize="none" autoCompleteType="off" autoCorrect={false} />
    {usernameMeta.error?<Text>{usernameMeta.error}</Text>:<Text></Text>}
    <TextInput placeholder="password" value={passwordField.value} onChangeText={text => passwordHelpers.setValue(text)} secureTextEntry style={styles.inputField} />
    {passwordMeta.error?<Text>{passwordMeta.error}</Text>:<Text></Text>}
    <Button onPress={onSubmit} title="Submit" style={styles.submitButton} />
  </View>);
};

const SignIn = () => {
  const [signInMutation] = useSignIn();
  const [error, setError] = useState(null);
  const history = useHistory();

  const onSubmit = async (values) => {
    // We have to take care of errors here.
    // otherwise Formik will throw and error and break it.
    try {
      await signInMutation({ username: values.username, password: values.password});
      history.push('/');
    } catch (err) {
      setError(err.message.toString());
    }
    
  //   console.log('SignIn: status', status);
  //   if (status === 'success') {
  //     history.push('/');
  //   }
  };

  return (<><Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({handleSubmit})=><SignInForm onSubmit={handleSubmit} />}
  </Formik><Text>{error}</Text></>);
};

export default SignIn;