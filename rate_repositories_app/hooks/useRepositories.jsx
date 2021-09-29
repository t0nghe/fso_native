import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../meta/queries'

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    setLoading(result.loading);
    if (result.data) {
      const repositories = result.data.repositories;
      // console.log(repositories);
      setRepositories(repositories);
    }
  }, [result]);

  return { repositories, loading };
};

export default useRepositories;