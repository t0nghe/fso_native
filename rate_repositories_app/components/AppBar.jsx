import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import Text from './Text';
import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../meta/queries';
import { useSignOut } from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    marginLeft: -7,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  appBarText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    padding: 5
  }
});

const AppBarTab = (props) => {
    return <Link to={props.href}><Text style={styles.appBarText}>{props.text}</Text></Link>;
};

const LogOut = (props) => {
  return <Pressable onPress={props.handleClick}><Text style={styles.appBarText}>Log Out</Text></Pressable>;
};

const AppBar = () => {
  const [user, setUser] = useState([]);
  const signOutUser = useSignOut();

  const result = useQuery(AUTHORIZED_USER);

  useEffect(
    ()=> {
      if (!result.loading && result.data.authorizedUser) {
        const {id, username} = result.data.authorizedUser; 
        setUser([username, id]);
      }
    }, [result]
  );

  const logout = async () => {
    console.log("Logging out!");
    setUser([]);
    await signOutUser();
  };

  // console.log(user);

  return <View style={styles.container}>
      <ScrollView horizontal>
      <AppBarTab text={"Repositories"} href={"/"} />
      {
      (!user.length)?
        <AppBarTab text={"Sign In"} href={"/signIn"} />
        :<LogOut handleClick={logout} />
      }
      </ScrollView>
  </View>;
};

export default AppBar;