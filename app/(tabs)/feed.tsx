import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorBanner } from '../../src/components/ErrorBanner';
import { FeedFooterLoader } from '../../src/components/FeedFooterLoader';
import { PostCard } from '../../src/components/PostCard';
import { PostCardSkeleton } from '../../src/components/PostCardSkeleton';
import { TabFilter, TabItem } from '../../src/components/TabFilter';
import { useFeed } from '../../src/hooks/useFeed';
import { useThemeTokens } from '../../src/hooks/useThemeTokens';
import { postStore } from '../../src/stores/postStore';
import { Post, TierFilter } from '../../src/types/api';
import { useFeedStyles } from './feed.styles';

const TIER_TABS: TabItem[] = [
  { key: 'all', label: '' },
  { key: 'free', label: '' },
  { key: 'paid', label: '' },
];

export default observer(function FeedScreen() {
  const { t, i18n } = useTranslation();
  const tokens = useThemeTokens();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = useMemo(
    () =>
      TIER_TABS.map((tab) => ({
        ...tab,
        label:
          tab.key === 'all' ? t('feed.all') : tab.key === 'free' ? t('feed.free') : t('feed.paid'),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n.language],
  );

  const tier: TierFilter = activeTab === 'all' ? undefined : (activeTab as TierFilter);

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed(tier);

  useEffect(() => {
    if (data?.pages) {
      const allPosts = data.pages.flatMap((page) => page.posts);
      postStore.initFromPosts(allPosts);
    }
  }, [data]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    postStore.reset();
    refetch();
  }, [refetch]);

  const handlePostPress = useCallback((postId: string) => {
    router.push(`/post/${postId}`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostCard post={item} onPress={handlePostPress} />,
    [handlePostPress],
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return <FeedFooterLoader />;
    }
    return null;
  }, [isFetchingNextPage]);

  const handleTabPress = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const styles = useFeedStyles(tokens);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <TabFilter tabs={tabs} activeKey={activeTab} onTabPress={handleTabPress} />
        <View style={styles.listContent}>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return <ErrorBanner onRetry={refetch} />;
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <TabFilter tabs={tabs} activeKey={activeTab} onTabPress={handleTabPress} />

      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={handleRefresh}
            tintColor={tokens.colors.primary}
            colors={[tokens.colors.primary]}
          />
        }
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={7}
        initialNumToRender={5}
      />
    </SafeAreaView>
  );
});
