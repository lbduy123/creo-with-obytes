import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import Sso from '@/components/sso';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = (_) => {
    signIn({
      token: { access: 'access-token', refresh: 'refresh-token' },
      userId: '',
    });
    router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
      <Sso />
    </>
  );
}
