import React from 'react';
import { FlatList, View, StyleSheet, Image, Pressable, Button } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  repoItem: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 1
  },
  repoItemFlex: {
    display: "flex",
    flexDirection: "row"
  },
  repoItemImage: {
    borderRadius: 1,
    margin: 5,
    width: 50,
    height: 50
  },
  repoItemName: {
    fontSize: 18,
    fontWeight: "700",
    paddingBottom: 3,
    paddingTop: 3
  },
  repoItemDesc: {
    color: "#2e2e2e",
    fontSize: 16
  },
  repoItemLang: {
    backgroundColor: "#0366d6",
    padding: 2,
    color: "white",
    alignSelf: "flex-start"
  },
  repoItemStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5
  },
  repoItemStatsMetric: {
    fontWeight: "bold",
    fontSize: 16
  },
  repoItemStatsLabel: {
    color: "#333333"
  }
});

const RepoItemStatsLabel = (props) => {
  return <Text style={styles.repoItemStatsLabel} testID="1">{props.children}</Text>;
};

const RepoItemStatsMetric = (props) => {
  return <Text style={styles.repoItemStatsMetric}  testID="itemmetric">{props.children}</Text>;
};

const RepoItemImageDesc = ({fullName, description, language, avatarUrl}) => {
    return <View style={styles.repoItemFlex}>
      <View>
        <Image style={styles.repoItemImage} source={{uri: avatarUrl}} testID="itemimage" />
      </View>
      <View>
        <Text style={styles.repoItemName} testID="itemname">{fullName}</Text>
        <Text style={styles.repoItemDesc} testID="itemdesc">{description}</Text>
        <Text style={styles.repoItemLang} testID="itemlang">{language}</Text>
      </View>
  </View>;
};

const RepoItemStats = ({ star, fork, rev, rating }) => {
  return <View style={styles.repoItemStats}>
    <View>
      <RepoItemStatsMetric>{(star/1000).toFixed(1)}k</RepoItemStatsMetric>
      <RepoItemStatsLabel>Stars</RepoItemStatsLabel>
    </View>
    <View>
      <RepoItemStatsMetric>{(fork/1000).toFixed(1)}k</RepoItemStatsMetric>
      <RepoItemStatsLabel>Forks</RepoItemStatsLabel>
    </View>
    <View>
      <RepoItemStatsMetric>{rev}</RepoItemStatsMetric>
      <RepoItemStatsLabel>Reviews</RepoItemStatsLabel>
    </View>
    <View>
      <RepoItemStatsMetric>{rating}</RepoItemStatsMetric>
      <RepoItemStatsLabel>Rating</RepoItemStatsLabel>
    </View>
    </View>;
};

export const RepoItem = ( {item, standalone=false } ) => {
  const history = useHistory();
  const { description, forksCount, fullName, language, ratingAverage, reviewCount, stargazersCount,ownerAvatarUrl } = item;

  const GitHubLink = standalone ? <View style={styles.repoItemStats}><Button onPress={()=>{Linking.openURL(item.url);}} title="Open on GitHub" /><Button onPress={()=>history.push(`/review/${item.id}`)} title="Add a review" /></View> : null;

  return <View style={styles.repoItem}>
    <RepoItemImageDesc fullName={fullName} description={description} language={language} avatarUrl={ownerAvatarUrl} />
    <RepoItemStats star={stargazersCount} fork={forksCount} rev={reviewCount} rating={ratingAverage} />
    {GitHubLink}
  </View>;
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const redirSingleItem = (id) => {
    history.push(`/${id}`);
  };

  if (!repositories) {
    return <Text>Repositories not found.</Text>;
  }

  const edges = repositories.edges;
  let nodes = edges.map( item => { return item.node;});

  const renderItem = ({ item }) => (<Pressable onPress={()=> redirSingleItem(item.id)}><RepoItem item={item} /></Pressable>);

  return (
    <FlatList
      data={nodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={ item=> item.id }
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;