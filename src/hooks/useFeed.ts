import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeedPage } from '../api/posts';
import { TierFilter } from '../types/api';

export function useFeed(tier?: TierFilter) {
  return useInfiniteQuery({
    queryKey: ['feed', tier ?? 'all'],
    queryFn: ({ pageParam }) => fetchFeedPage(pageParam, 10, tier),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: undefined as string | undefined,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
