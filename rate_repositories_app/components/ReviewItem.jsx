import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 5,
    padding: 5
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column"
  },
  rating: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0366d6"
  },
  ratingCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#0366d6",
    margin: 5
  },
  username: {
    fontSize: 16,
    fontWeight: "bold"
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic'
  }
});

const transformDate = (dateString) => {
  const date = new Date(dateString);
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const ReviewRightColumn = ( {username, createdAt, text} ) => {
  return <View style={styles.rightColumn}>
    <Text style={styles.username}>{username}</Text>
    <Text style={styles.timestamp}>{transformDate(createdAt)}</Text>
    <Text>{text}</Text>
  </View>;
};

const ReviewItem = ({ revNode }) => {
  const { user, createdAt, rating, text  } = revNode;

  return <View style={styles.container}>
    <View style={styles.ratingCircle}><Text style={styles.rating}>{rating}</Text></View>
  <ReviewRightColumn username={user.username} createdAt={createdAt} text={text} />
  </View>;
};

export default ReviewItem;