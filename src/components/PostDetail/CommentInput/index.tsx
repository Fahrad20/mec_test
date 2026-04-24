import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeTokens } from '../../../hooks/useThemeTokens';
import { useCommentInputStyles } from './styles';

import { CommentInputProps } from './types';

export const CommentInput = observer(({ onSend, isSubmitting }: CommentInputProps) => {
  const { t } = useTranslation();
  const tokens = useThemeTokens();
  const insets = useSafeAreaInsets();
  const styles = useCommentInputStyles(tokens, insets);
  const [text, setText] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || isSubmitting) return;
    onSend(trimmed);
    setText('');
  }, [text, isSubmitting, onSend]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={t('postDetail.writeComment')}
        placeholderTextColor={tokens.colors.text.secondary}
        multiline
        maxLength={500}
        editable={!isSubmitting}
        returnKeyType="send"
        onSubmitEditing={handleSend}
        blurOnSubmit
      />
      <Pressable
        onPress={handleSend}
        style={[styles.sendButton, (!text.trim() || isSubmitting) && styles.sendButtonDisabled]}
        disabled={!text.trim() || isSubmitting}
        hitSlop={8}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={tokens.colors.text.inverse} />
        ) : (
          <Image
            source={require('../../../../assets/icons/send_icon.svg')}
            style={styles.sendIcon}
            contentFit="contain"
          />
        )}
      </Pressable>
    </View>
  );
});
