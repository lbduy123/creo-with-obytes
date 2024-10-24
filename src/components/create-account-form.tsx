import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

export type FormType = z.infer<typeof schema>;

export type CreateAccountFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading?: boolean;
};

export const CreateAccountForm = ({
  onSubmit = () => {},
  isLoading = false,
}: CreateAccountFormProps) => {
  const { full_name, email } = useLocalSearchParams();
  const defaultFirstName = full_name
    ? (full_name as string).split(' ').slice(0, -1).join(' ')
    : '';
  const defaultLastName = full_name
    ? (full_name as string).split(' ').slice(-1).join('')
    : '';

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: defaultFirstName,
      last_name: defaultLastName,
      email: (email as string) || '',
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <Text
          testID="form-title"
          className="pb-6 text-center font-zed text-2xl"
        >
          Account Creation
        </Text>

        <ControlledInput
          testID="first_name"
          control={control}
          name="first_name"
          label="First Name"
        />
        <ControlledInput
          testID="last_name"
          control={control}
          name="last_name"
          label="Last Name"
        />
        <ControlledInput
          testID="email"
          control={control}
          name="email"
          label="Email"
        />
        <Button
          testID="create-account-button"
          label="Create"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
