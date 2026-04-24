import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentCreatedResponse, CommentsResponse } from '../types/api';
import { apiClient } from './client';

/**
 * Fetch a paginated page of comments for a post.
 * GET /posts/{id}/comments?cursor=<cursor>&limit=<limit>
 */
export const fetchComments = async (
  postId: string,
  cursor?: string,
  limit = 20,
): Promise<CommentsResponse['data']> => {
  const { data } = await apiClient.get<CommentsResponse>(`/posts/${postId}/comments`, {
    params: { cursor, limit },
  });
  return data.data;
};

/**
 * Send a new comment on a post.
 * POST /posts/{id}/comments
 */
export const sendComment = async (
  postId: string,
  text: string,
): Promise<CommentCreatedResponse['data']> => {
  const { data } = await apiClient.post<CommentCreatedResponse>(`/posts/${postId}/comments`, {
    text,
  });
  return data.data;
};

/** React Query key for comments */
export const commentsQueryKey = (postId: string) => ['comments', postId] as const;

/**
 * Infinite query hook for paginated comments.
 */
export function useComments(postId: string) {
  return useInfiniteQuery({
    queryKey: commentsQueryKey(postId),
    queryFn: ({ pageParam }) => fetchComments(postId, pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: undefined as string | undefined,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !!postId,
  });
}

/**
 * Mutation hook for sending a comment with optimistic update.
 * Prepends the new comment to the cache immediately.
 */
export function useSendComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => sendComment(postId, text),

    onSuccess: (result) => {
      // Prepend the server-confirmed comment to the cache
      queryClient.setQueryData<InfiniteData<CommentsResponse['data']>>(
        commentsQueryKey(postId),
        (old) => {
          if (!old) return old;
          const newPages = [...old.pages];
          newPages[0] = {
            ...newPages[0],
            comments: [result.comment, ...newPages[0].comments],
          };
          return { ...old, pages: newPages };
        },
      );
    },
  });
}

/**
 * Append a comment received via WebSocket to the query cache.
 * Used by RealtimeStore when a `comment_added` event arrives.
 */
export function appendCommentToCache(
  queryClient: ReturnType<typeof useQueryClient>,
  postId: string,
  comment: Comment,
) {
  queryClient.setQueryData<InfiniteData<CommentsResponse['data']>>(
    commentsQueryKey(postId),
    (old) => {
      if (!old) return old;

      // Check if this comment already exists (avoid duplicates from our own sends)
      const allComments = old.pages.flatMap((p) => p.comments);
      if (allComments.some((c) => c.id === comment.id)) {
        return old;
      }

      const newPages = [...old.pages];
      newPages[0] = {
        ...newPages[0],
        comments: [comment, ...newPages[0].comments],
      };
      return { ...old, pages: newPages };
    },
  );
}
