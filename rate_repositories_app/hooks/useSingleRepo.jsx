import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SINGLE_REPOSITORY } from '../meta/queries';

const useSingleRepo = (repoid) => {
  const [repo, setRepo] = useState(null);
  const { data, loading } = useQuery(SINGLE_REPOSITORY, {
    variables: { id: repoid}, fetchPolicy: 'cache-and-network'
  });

  useEffect(()=>{
    if (data && data.repository) {
      setRepo(data.repository);
    }
  }, [loading]
  );

  return [repo, loading];
};

export default useSingleRepo;
