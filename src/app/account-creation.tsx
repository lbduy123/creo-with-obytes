import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

import { useCreateProfile } from '@/api/profile';
import {
  CreateAccountForm,
  type CreateAccountFormProps,
} from '@/components/create-account-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function AccountCreation() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { user_id, conn_id } = useLocalSearchParams();
  const [commitMutation, isMutationInFlight] = useCreateProfile();
  const onSubmit: CreateAccountFormProps['onSubmit'] = (data) => {
    commitMutation({
      variables: {
        input: {
          userId: user_id as string,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
        },
        connections: [conn_id as string],
      },
      onError(error) {
        console.log({ error });
      },
      onCompleted(response, errors) {
        console.log({ response, errors });
        signIn({
          token: { access: 'access-token', refresh: 'refresh-token' },
          userId: user_id as string,
        });
        router.navigate('/');
      },
    });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <CreateAccountForm onSubmit={onSubmit} isLoading={isMutationInFlight} />
    </>
  );
}
