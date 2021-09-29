import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from './RepositoryList';
// import { Platform } from 'react-native';

describe('RepositoryList', () => {

    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
        hasNextPage: true,
        endCursor:
          'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
        {
          node: {
          id: 'jaredpalmer.formik',
          fullName: 'jaredpalmer/formik',
          description: 'Build forms in React, without the tears',
          language: 'TypeScript',
          forksCount: 1619,
          stargazersCount: 21856,
          ratingAverage: 88,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        {
          node: {
          id: 'async-library.react-async',
          fullName: 'async-library/react-async',
          description: 'Flexible promise-based React data loader',
          language: 'JavaScript',
          forksCount: 69,
          stargazersCount: 1760,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor:
          'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
        },
        ],
      };
    
    const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

    const itemimage = getAllByTestId('itemimage');
    const itemname = getAllByTestId('itemname');
    const itemdesc = getAllByTestId('itemdesc');
    const itemlang = getAllByTestId('itemlang');
    const itemmetric = getAllByTestId('itemmetric');
  
    expect(itemimage).toHaveLength(2);
    expect(itemname).toHaveLength(2);
    expect(itemname[0]).toHaveTextContent('jaredpalmer/formik');
    expect(itemname[1]).toHaveTextContent('async-library/react-async');
    expect(itemdesc).toHaveLength(2);
    expect(itemlang).toHaveLength(2);
    expect(itemlang[0]).toHaveTextContent('TypeScript');
    expect(itemlang[1]).toHaveTextContent('JavaScript');
    expect(itemmetric).toHaveLength(8);
  });
  });
});