import React from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import { useState } from 'react';
import { useHistory } from "react-router-native";

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

const validationSchema = yup.object().shape(
  {
    password: yup.string().min(5, "Password should contain at least 6 characters.").max(50, "Password should be shorter than 50 characters.").required("Password is required."),
    username: yup.string().min(1, 'Username should contain at least 1 character.').max(30, 'Username should be shorter than 30 characters').required("Username is required."),
    passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
  }
);

const SignUpForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username');
  const [passwordField, passwordMeta, passwordHelpers] = useField('password');
  const [confirmField, confirmMeta, confirmHelpers] = useField('passwordConfirmation');

  return (<View style={styles.container}>
    <TextInput placeholder="username" value={usernameField.value} onChangeText={text => usernameHelpers.setValue(text)} style={styles.inputField}  autoCapitalize="none" autoCompleteType="off" autoCorrect={false} />
    {usernameMeta.error?<Text style={styles.errorText}>{usernameMeta.error}</Text>:<Text></Text>}
    <TextInput placeholder="password" value={passwordField.value} onChangeText={text => passwordHelpers.setValue(text)} style={styles.inputField} secureTextEntry />
    {passwordMeta.error?<Text style={styles.errorText}>{passwordMeta.error}</Text>:<Text></Text>}
    <TextInput placeholder="repeat your password" value={confirmField.value} onChangeText={text => confirmHelpers.setValue(text)} style={styles.inputField} secureTextEntry />
    {confirmMeta.error?<Text style={styles.errorText}>{confirmMeta.error}</Text>:<Text></Text>}
    <Button onPress={onSubmit} title="Submit" style={styles.submitButton} />
  </View>);
};

const SignUpFormik = ({ onSubmit }) => {
  return (<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({handleSubmit})=><SignUpForm onSubmit={handleSubmit} />}</Formik>);
};

const SignUp = () => {
  const [signUpMutation] = useSignUp();
  const [error, setError] = useState(null);
  const history = useHistory();
  const onSubmit = async (values) => {
    try {
      await signUpMutation({ username: values.username, password: values.password});
      history.push('/signIn');
    } catch (err) {
      setError(err.message.toString());
    }
  };

  return (<><SignUpFormik onSubmit={onSubmit} /><Text style={styles.errorText}>{error}</Text></>);
};

export default SignUp;