import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, SINGLE_REPOSITORY } from '../meta/queries';
import { useState, useEffect } from 'react';

const useCreateReview = (repoid) => {
  const [mutateCreateReview] = useMutation(CREATE_REVIEW, {refetchQueries: [
    {query: SINGLE_REPOSITORY, variables: {id: repoid}}
  ]});
  // const [status, setStatus] = useState(null);

  const createReview = async ({
    repositoryName, ownerName, rating, text
  }) => {
    let result;
    try {
      result = await mutateCreateReview({
        variables: {
          repositoryName, ownerName, rating, text
        },
      });
      return result;
    } catch (err) {
      throw new Error(err.message);
    }

  //   useEffect(
  //     ()=>{
  //       if (result.data) {
  //         setStatus('success');
  //       }
  //     }, [result]
  //   );

  };

  // return [createReview, status];
  return [createReview];
};

export default useCreateReview;