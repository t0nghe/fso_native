import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../meta/queries'

const useRepositories = () => {
  // console.log('hook invoked');
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    setLoading(result.loading);
    if (result.data) {
      const edges = result.data.repositories.edges;
      const nodes = edges.map( item => { return item.node;} );
      setRepositories(nodes);
    }
  }, [result]);

  return { repositories, loading };
};

export default useRepositories;