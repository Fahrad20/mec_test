/** Author data from the Mecenate API */
export type Author = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  subscribersCount?: number;
  isVerified?: boolean;
};

/** Post entity matching GET /posts and GET /posts/{id} responses */
export type Post = {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl?: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: 'free' | 'paid';
  createdAt: string;
};

/** Comment entity matching GET /posts/{id}/comments */
export type Comment = {
  id: string;
  postId: string;
  author: Author;
  text: string;
  createdAt: string;
};

/** Tier filter values */
export type TierFilter = 'free' | 'paid' | undefined;

// ─── API Response Envelopes ────────────────────────────────────────────

/** Paginated posts response — GET /posts */
export type PostsResponse = {
  ok: boolean;
  data: {
    posts: Post[];
    nextCursor: string | null;
    hasMore: boolean;
  };
};

/** Single post detail response — GET /posts/{id} */
export type PostDetailResponse = {
  ok: boolean;
  data: {
    post: Post;
  };
};

/** Like toggle response — POST /posts/{id}/like */
export type LikeResponse = {
  ok: boolean;
  data: {
    isLiked: boolean;
    likesCount: number;
  };
};

/** Paginated comments response — GET /posts/{id}/comments */
export type CommentsResponse = {
  ok: boolean;
  data: {
    comments: Comment[];
    nextCursor: string | null;
    hasMore: boolean;
  };
};

/** Comment creation response — POST /posts/{id}/comments */
export type CommentCreatedResponse = {
  ok: boolean;
  data: {
    comment: Comment;
  };
};

/** Error envelope returned by the API */
export type ErrorResponse = {
  ok: false;
  error: {
    code: 'UNAUTHORIZED' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'INTERNAL_ERROR';
    message: string;
  };
};

// ─── WebSocket Event Types ─────────────────────────────────────────────

export type WsPingEvent = {
  type: 'ping';
};

export type WsLikeUpdatedEvent = {
  type: 'like_updated';
  postId: string;
  likesCount: number;
};

export type WsCommentAddedEvent = {
  type: 'comment_added';
  postId: string;
  comment: Comment;
};

export type WsEvent = WsPingEvent | WsLikeUpdatedEvent | WsCommentAddedEvent;
