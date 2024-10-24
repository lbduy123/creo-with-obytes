import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';

import { type profileByUserIdQuery } from '@/__generated__/profileByUserIdQuery.graphql';
import { type profileCreateMutation } from '@/__generated__/profileCreateMutation.graphql';

import { type QueryOptions } from '../types';

export const useCreateProfile = () => {
  return useMutation<profileCreateMutation>(graphql`
    mutation profileCreateMutation($input: ProfileInsertInput!, $connections: [ID!]!) {
      insertIntoProfileCollection(objects: [$input]) {
        affectedCount
        records @appendNode(connections: $connections, , edgeTypeName: "ProfileEdge") {
          ...profileFragment
        }
      }
    }
  `);
};

export const useGetProfileByUserId = (userId: string, options?: QueryOptions) => {
  return useLazyLoadQuery<profileByUserIdQuery>(
    graphql`
      query profileByUserIdQuery($userId: UUID!, $skip: Boolean!) {
        profileCollection(filter: {userId: { eq: $userId }}, first: 1) @skip(if: $skip) @connection(key: "__profileCollection") {
          __id
          edges {
            node {
              ...profileFragment
            }
          }
        }
      }
    `,
    { userId, skip: !userId },
    options
  );
}
export const ProfileFragment = graphql`
  fragment profileFragment on Profile {
    nodeId
    userId
    firstName
    lastName
    email
  }
`
