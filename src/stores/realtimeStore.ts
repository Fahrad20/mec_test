import { makeAutoObservable, runInAction } from 'mobx';
import { Comment, WsEvent } from '../types/api';
import { postStore } from './postStore';

const WS_BASE_URL = process.env.EXPO_PUBLIC_WS_URL || 'wss://k8s.mectest.ru/test-app/ws';
const USER_TOKEN = process.env.EXPO_PUBLIC_USER_TOKEN || '550e8400-e29b-41d4-a716-446655440000';

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 1000;

type RealtimeCallbacks = {
  onNewComment?: (comment: Comment) => void;
};

class RealtimeStore {
  status: 'idle' | 'connecting' | 'connected' | 'disconnected' = 'idle';
  private ws: WebSocket | null = null;
  private callbacks: RealtimeCallbacks = {};
  private currentPostId: string | null = null;
  private retryCount = 0;
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /**
   * Open a WebSocket connection for a specific post.
   * Handles `like_updated` and `comment_added` events.
   */
  connect(postId: string, callbacks: RealtimeCallbacks = {}) {
    // Close any existing connection first
    this.disconnectInternal();

    this.currentPostId = postId;
    this.callbacks = callbacks;
    this.retryCount = 0;
    this.openConnection();
  }

  private openConnection() {
    if (!this.currentPostId) return;

    runInAction(() => {
      this.status = 'connecting';
    });

    const url = `${WS_BASE_URL}?token=${USER_TOKEN}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      runInAction(() => {
        this.status = 'connected';
        this.retryCount = 0;
      });
    };

    this.ws.onclose = () => {
      runInAction(() => {
        this.status = 'disconnected';
      });

      // Auto-reconnect with exponential backoff
      if (this.currentPostId && this.retryCount < MAX_RETRIES) {
        const delay = BASE_RETRY_DELAY * Math.pow(2, this.retryCount);
        this.retryCount++;
        this.retryTimeout = setTimeout(() => {
          this.openConnection();
        }, delay);
      }
    };

    this.ws.onerror = () => {
      // onclose will fire after onerror, handling reconnection
    };

    this.ws.onmessage = (event: WebSocketMessageEvent) => {
      try {
        const data = JSON.parse(event.data) as WsEvent;
        this.handleEvent(data);
      } catch {
        // Ignore malformed messages
      }
    };
  }

  private handleEvent(event: WsEvent) {
    switch (event.type) {
      case 'ping':
        // Heartbeat — no action needed
        break;

      case 'like_updated':
        if (event.postId === this.currentPostId) {
          postStore.setLikeCount(event.postId, event.likesCount);
        }
        break;

      case 'comment_added':
        if (event.postId === this.currentPostId) {
          this.callbacks.onNewComment?.(event.comment);
        }
        break;
    }
  }

  /**
   * Disconnect the WebSocket and stop auto-reconnect.
   */
  disconnect() {
    this.disconnectInternal();
    runInAction(() => {
      this.currentPostId = null;
      this.callbacks = {};
      this.retryCount = 0;
      this.status = 'idle';
    });
  }

  private disconnectInternal() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;
      this.ws.close();
      this.ws = null;
    }
  }
}

export const realtimeStore = new RealtimeStore();
