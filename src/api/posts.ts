import { LikeResponse, PostDetailResponse, PostsResponse } from '../types/post';
import { apiClient } from './client';

/**
 * Fetch a paginated feed page.
 * GET /posts?cursor=<cursor>&limit=<limit>
 */
export const fetchFeedPage = async (
  pageParam?: string,
  limit = 10,
): Promise<PostsResponse['data']> => {
  const { data } = await apiClient.get<PostsResponse>('/posts', {
    params: {
      cursor: pageParam,
      limit,
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
