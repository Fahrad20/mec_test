import { useQuery } from '@tanstack/react-query';
import { LikeResponse, PostDetailResponse, PostsResponse, TierFilter } from '../types/api';
import { apiClient } from './client';

/**
 * Fetch a paginated feed page.
 * GET /posts?cursor=<cursor>&limit=<limit>&tier=<tier>
 */
export const fetchFeedPage = async (
  pageParam?: string,
  limit = 10,
  tier?: TierFilter,
): Promise<PostsResponse['data']> => {
  const { data } = await apiClient.get<PostsResponse>('/posts', {
    params: {
      cursor: pageParam,
      limit,
      tier,
    },
  });
  return data.data;
};

/**
 * Fetch a single post by ID.
 * GET /posts/{id}
 */
export const fetchPostById = async (postId: string): Promise<PostDetailResponse['data']> => {
  const { data } = await apiClient.get<PostDetailResponse>(`/posts/${postId}`);
  return data.data;
};

/**
 * Toggle like on a post. Returns the updated like state.
 * POST /posts/{id}/like
 */
export const togglePostLike = async (postId: string): Promise<LikeResponse['data']> => {
  const { data } = await apiClient.post<LikeResponse>(`/posts/${postId}/like`);
  return data.data;
};

/** React Query key for a single post */
export const postDetailQueryKey = (postId: string) => ['post', postId] as const;

/**
 * React Query hook for fetching a single post detail.
 */
export function usePostDetail(postId: string) {
  return useQuery({
    queryKey: postDetailQueryKey(postId),
    queryFn: () => fetchPostById(postId),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !!postId,
  });
}
