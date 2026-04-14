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
