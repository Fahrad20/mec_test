import { Post } from '../../types/api';

export type PostCardProps = {
  post: Post;
  onPress?: (postId: string) => void;
};
