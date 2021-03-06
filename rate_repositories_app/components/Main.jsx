import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import RepositoryItem from './RepositoryItem';
import AppBar from './AppBar';
import { Route, Switch } from 'react-router-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
  header: {
    fontSize: 36,
    fontWeight: "700"
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/review/:repoid">
          <CreateReview />
        </Route>
        <Route path="/:repoid">
          <RepositoryItem />
        </Route>
      </Switch>
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;