import { Image } from 'expo-image';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeTokens } from '../../../hooks/useThemeTokens';
import { formatSubscribers } from '../../../utils/formatters';
import { useHeaderStyles } from './styles';
import { HeaderProps } from './types';

export const PostDetailHeader = observer(({ author }: HeaderProps) => {
  const tokens = useThemeTokens();
  const insets = useSafeAreaInsets();
  const styles = useHeaderStyles(tokens, insets.top);

  const handleBack = () => {
    router.back();
  };

  const renderAvatar = () => {
    if (author.avatarUrl) {
      return (
        <Image source={{ uri: author.avatarUrl }} style={styles.avatar} recyclingKey={author.id} />
      );
    }
    const initials = author.displayName ? author.displayName.substring(0, 2).toUpperCase() : '??';
    return (
      <View style={[styles.avatar, styles.initialsContainer]}>
        <Text style={styles.initialsText}>{initials}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={12}>
        <Text style={styles.backIcon}>←</Text>
      </Pressable>
      {renderAvatar()}
      <View style={styles.authorInfo}>
        <Text style={styles.displayName} numberOfLines={1}>
          {author.displayName || author.username}
        </Text>
        {author.subscribersCount !== undefined && (
          <Text style={styles.subscribers}>{formatSubscribers(author.subscribersCount)}</Text>
        )}
      </View>
    </View>
  );
});
