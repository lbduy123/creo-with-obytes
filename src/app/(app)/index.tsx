import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { useFragment } from 'react-relay';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { ProfileFragment, useGetProfileByUserId } from '@/api/profile';
import { Card } from '@/components/card';
import { USER_ID } from '@/core/auth/utils';
import { getItem } from '@/core/storage';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';

export default function Feed() {
  const userId = getItem<string>(USER_ID);
  const profileRes = useGetProfileByUserId(userId);

  const profile = useFragment(
    ProfileFragment,
    profileRes.profileCollection?.edges[0].node,
  );
  console.log({ profile });

  const { data, isPending, isError } = usePosts();
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    [],
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
      />
    </View>
  );
}
