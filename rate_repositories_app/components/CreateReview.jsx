import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import { useParams } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';
import useSingleRepo from '../hooks/useSingleRepo';
import Text from './Text';
import { Formik, useField } from 'formik';
import { useHistory } from 'react-router-native';
// import * as yup from 'yup'; // Later

// validation
// const validationSchema = yup.object().shape(
//   {
//     password: yup.string().min(5, "Password should contain at least 6 characters.").max(50, "Password should be shorter than 50 characters.").required("Password is required."),
//     username: yup.string().min(1, 'Username should contain at least 1 character.').max(30, 'Username should be shorter than 30 characters').required("Username is required.")
//   }
// );

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

const ReviewForm = ({ onSubmit }) => {
  const [repoNameField, repoNameMeta, repoNameHelpers] = useField('repositoryName');
  const [ownerNameField, ownerNameMeta, ownerNameHelpers] = useField('ownerName');
  const [ratingField, ratingMeta, ratingHelpers] = useField('rating');
  const [textField, textMeta, textHelpers] = useField('text');

  return (<View style={styles.container}>
    <TextInput placeholder="name of repository" value={repoNameField.value} onChangeText={text => repoNameHelpers.setValue(text)} style={styles.inputField} autoCapitalize="none" autoCompleteType="off" autoCorrect={false} />
    {repoNameMeta.error?<Text style={styles.errorText}>{repoNameMeta.error}</Text>:<Text></Text>}
    <TextInput placeholder="name of owner" value={ownerNameField.value} onChangeText={text => ownerNameHelpers.setValue(text)} style={styles.inputField} autoCapitalize="none" autoCompleteType="off" autoCorrect={false} />
    {ownerNameMeta.error?<Text style={styles.errorText}>{ownerNameMeta.error}</Text>:<Text></Text>}
    <TextInput placeholder="rating" value={ratingField.value} onChangeText={text => ratingHelpers.setValue(text)} style={styles.inputField} autoCapitalize="none" autoCompleteType="off" autoCorrect={false} />
    {ratingMeta.error?<Text style={styles.errorText}>{ratingMeta.error}</Text>:<Text></Text>}
    <TextInput placeholder="text" value={textField.value} onChangeText={text => textHelpers.setValue(text)} style={styles.inputField} autoCapitalize="none" autoCompleteType="off" autoCorrect={true} />
    {textMeta.error?<Text style={styles.errorText}>{textMeta.error}</Text>:<Text></Text>}
    <Button onPress={onSubmit} title="Submit" style={styles.submitButton} testID="submitButton" />
  </View>);
};

const CreateReview = () => {
  const { repoid } = useParams();
  console.log('beginning repoid: ', repoid);
  const [repo] = useSingleRepo(repoid);
  const [createReview] = useCreateReview(repoid);
  const [message, setMessage] = useState('');
  const [repoName, setRepoName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const history = useHistory();

  useEffect( ()=> {
    if (repo) {
      setRepoName(repo.name);
      setOwnerName(repo.ownerName);
    }
  }, [repo]);

  const initialValues = {
    repositoryName: repoName, ownerName, rating: '50', text: '' 
  };

  const onSubmit = async (values) => {
    try {
      await createReview({repositoryName: values.repositoryName, ownerName: values.ownerName, rating: parseInt(values.rating), text: values.text
      });
      // console.log(result);
      console.log('onSubmit repoid', repoid);
      history.push(`/${repoid}`);
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  if (!repoName) {
    return <Text>...</Text>;
  }
  
  return (<><Formik initialValues={initialValues} onSubmit={onSubmit}>
  {({handleSubmit}) => <ReviewForm onSubmit={handleSubmit} />}
</Formik><Text>{message}</Text></>);
};

export default CreateReview;
