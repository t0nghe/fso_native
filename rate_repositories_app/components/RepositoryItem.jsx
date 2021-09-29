import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import useSingleRepo from '../hooks/useSingleRepo';
import { RepoItem } from './RepositoryList';
import { useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = () => {
  const { repoid } = useParams();
  const [repo, loading] = useSingleRepo(repoid);

  const renderReviewItem = (revItem) => {
    // console.log('renderReviewItem', revItem);
    // Because structure of this argument is:
    // { index, item: { node: {Actual NOde} }, separators: { highlight, unhighlight, updateProps} }
    // Also note how <FlatList> component works.
    return <ReviewItem revNode={revItem.item.node} />;
  };
  
  if (loading || !repo) {
    return <Text>Loading...</Text>;
  } else if (repo) {
    const reviewItems = repo.reviews.edges;
    console.log(reviewItems);
    return <>
    <RepoItem item={repo} standalone={true} />
    <FlatList data={reviewItems} renderItem={renderReviewItem} keyExtractor={ item=> item.node.id} ItemSeparatorComponent={ItemSeparator} />
    </>;
  }
};

export default RepositoryItem;