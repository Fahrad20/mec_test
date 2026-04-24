import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View } from 'react-native';
import { useThemeTokens } from '../../../hooks/useThemeTokens';
import { formatRelativeTime } from '../../../utils/formatters';
import { useCommentItemStyles } from './styles';
import { CommentItemProps } from './types';

export const CommentItem = observer(({ comment }: CommentItemProps) => {
  const tokens = useThemeTokens();
  const styles = useCommentItemStyles(tokens);

  const renderAvatar = () => {
    if (comment.author.avatarUrl) {
      return (
        <Image
          source={{ uri: comment.author.avatarUrl }}
          style={styles.avatar}
          recyclingKey={`comment-avatar-${comment.author.id}`}
        />
      );
    }
    const initials = comment.author.displayName
      ? comment.author.displayName.substring(0, 2).toUpperCase()
      : '??';
    return (
      <View style={[styles.avatar, styles.initialsContainer]}>
        <Text style={styles.initialsText}>{initials}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderAvatar()}
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.authorName} numberOfLines={1}>
            {comment.author.displayName || comment.author.username}
          </Text>
          <Text style={styles.timestamp}>{formatRelativeTime(comment.createdAt)}</Text>
        </View>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
    </View>
  );
});
