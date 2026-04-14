import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeTokens } from '../../hooks/useThemeTokens';
import { useLockedPostOverlayStyles } from './styles';

export const LockedPostOverlay = observer(() => {
  const { t } = useTranslation();
  const tokens = useThemeTokens();
  const styles = useLockedPostOverlayStyles(tokens);

  return (
    <View style={styles.overlay}>
      <Text style={styles.text}>{t('post.lockedAccess')}</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{t('post.sendDonate')}</Text>
      </TouchableOpacity>
    </View>
  );
});
