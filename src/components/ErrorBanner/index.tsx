import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeTokens } from '../../hooks/useThemeTokens';
import { useErrorBannerStyles } from './styles';
import { ErrorBannerProps } from './types';

export const ErrorBanner = observer(({ onRetry }: ErrorBannerProps) => {
  const { t } = useTranslation();
  const tokens = useThemeTokens();
  const styles = useErrorBannerStyles(tokens);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/failed_post_placeholder.webp')}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={styles.title}>{t('error.title')}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{t('error.retry')}</Text>
      </TouchableOpacity>
    </View>
  );
});
