import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

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
  return <Text style={styles.repoItemStatsLabel}>{props.children}</Text>;
};

const RepoItemStatsMetric = (props) => {
  return <Text style={styles.repoItemStatsMetric}>{props.children}</Text>;
};

const RepoItemImageDesc = ({fullName, description, language, avatarUrl}) => {
    return <View style={styles.repoItemFlex}>
      <View>
        <Image style={styles.repoItemImage} source={{uri: avatarUrl}} />
      </View>
      <View>
        <Text style={styles.repoItemName}>{fullName}</Text>
        <Text style={styles.repoItemDesc}>{description}</Text>
        <Text style={styles.repoItemLang}>{language}</Text>
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

const RepoItem = ( {item}) => {
    const { description, forksCount, fullName, language, ratingAverage, reviewCount, stargazersCount, ownerAvatarUrl } = item;
    return <View style={styles.repoItem}>
    <RepoItemImageDesc fullName={fullName} description={description} language={language} avatarUrl={ownerAvatarUrl} />
    <RepoItemStats star={stargazersCount} fork={forksCount} rev={reviewCount} rating={ratingAverage} />
    </View>;
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const renderItem = ({ item }) => (<RepoItem item={item} />);

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={ item=> item.id }
    />
  );
};

export default RepositoryList;