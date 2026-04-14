import { makeAutoObservable, runInAction } from 'mobx';
import { togglePostLike } from '../api/posts';
import { Post } from '../types/post';

type PostLikeState = {
  isLiked: boolean;
  likesCount: number;
};

export const feedStore = makeAutoObservable({
  /** Map of postId → like state, initialized from server data */
  postLikeStates: new Map<string, PostLikeState>(),

  /**
   * Initialize or update like states from server-fetched posts.
   * Called whenever new posts arrive from the API.
   */
  initFromPosts(posts: Post[]) {
    for (const post of posts) {
      // Only set if not already tracked (preserve optimistic state)
      if (!this.postLikeStates.has(post.id)) {
        this.postLikeStates.set(post.id, {
          isLiked: post.isLiked,
          likesCount: post.likesCount,
        });
      }
    }
  },

  /**
   * Get the current like state for a post.
   * Falls back to server defaults if not yet tracked.
   */
  getLikeState(postId: string, serverFallback: Post): PostLikeState {
    return (
      this.postLikeStates.get(postId) ?? {
        isLiked: serverFallback.isLiked,
        likesCount: serverFallback.likesCount,
      }
    );
  },

  /**
   * Optimistic like toggle: instantly updates UI, then syncs with server.
   * Rolls back on failure.
   */
  async toggleLike(postId: string) {
    const current = this.postLikeStates.get(postId);
    if (!current) return;

    // Snapshot for rollback
    const snapshot = { ...current };

    // Optimistic update
    runInAction(() => {
      current.isLiked = !current.isLiked;
      current.likesCount += current.isLiked ? 1 : -1;
    });

    try {
      const serverResult = await togglePostLike(postId);

      // Sync with authoritative server state
      runInAction(() => {
        current.isLiked = serverResult.isLiked;
        current.likesCount = serverResult.likesCount;
      });
    } catch {
      // Rollback on error
      runInAction(() => {
        current.isLiked = snapshot.isLiked;
        current.likesCount = snapshot.likesCount;
      });
    }
  },

  /** Reset all tracked state (e.g. on pull-to-refresh) */
  reset() {
    this.postLikeStates.clear();
  },
});
